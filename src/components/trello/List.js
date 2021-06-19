import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";
import { addCard } from "../../actions/card";
import { deleteList, changeListTitle } from "../../actions/list";
import shortid from "shortid";

class List extends Component {
  state = {
    editingTitle: false,
    title: this.props.list.title,
    addingCard: false,
  };

  toggleAddingCard = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({ addingCard: !this.state.addingCard });
  };

  addCard = async (cardText) => {
    const { listId, addCard } = this.props;

    this.toggleAddingCard();

    const cardId = shortid.generate();
    addCard({ cardText, cardId, listId });
  };

  toggleEditingTitle = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({ editingTitle: !this.state.editingTitle });
  };

  handleChangeTitle = (e) => this.setState({ title: e.target.value });

  editListTitle = async () => {
    const { listId, changeListTitle } = this.props;
    const { title } = this.state;

    this.toggleEditingTitle();
    changeListTitle({ listId, listTitle: title });
  };

  deleteList = async () => {
    const { listId, list, deleteList } = this.props;

    if (window.confirm("Are you sure to delete this list?")) {
      deleteList({ listId, cards: list.cards });
    }
  };

  render() {
    const { list, index } = this.props;
    const { editingTitle, addingCard, title } = this.state;

    return (
      <Draggable draggableId={list._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="list"
          >
            {editingTitle ? (
              <ListEditor
                list={list}
                title={title}
                handleChangeTitle={this.handleChangeTitle}
                saveList={this.editListTitle}
                onClickOutside={this.editListTitle}
                deleteList={this.deleteList}
              />
            ) : (
              <div className="list-title" onClick={this.toggleEditingTitle}>
                {list.title}
              </div>
            )}

            <Droppable droppableId={list._id}>
              {(provided, _snapshot) => (
                <div ref={provided.innerRef} className="lists-cards">
                  {list.cards &&
                    list.cards.map((cardId, index) => (
                      <Card
                        key={cardId}
                        cardId={cardId}
                        index={index}
                        listId={list._id}
                      />
                    ))}

                  {provided.placeholder}

                  {addingCard ? (
                    <CardEditor
                      onSave={this.addCard}
                      onCancel={this.toggleAddingCard}
                      adding
                    />
                  ) : (
                    <div
                      className="toggle-add-card"
                      onClick={this.toggleAddingCard}
                    >
                      <ion-icon name="add" /> Add a card
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addCard: (payload) => dispatch(addCard(payload)),
  deleteList: (payload) => dispatch(deleteList(payload)),
  changeListTitle: (payload) => dispatch(changeListTitle(payload)),
});

const mapStateToProps = (state, ownProps) => ({
  list: state.listsById[ownProps.listId],
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
