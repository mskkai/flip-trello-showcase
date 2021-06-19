import React, { Component } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { moveList } from "../../actions/list";
import { moveCard } from "../../actions/card";
import List from "./List";
import AddList from "./AddList";

class Board extends Component {
  state = {
    addingList: false,
  };

  toggleAddingList = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({ addingList: !this.state.addingList });
  };

  handleDragEnd = ({ source, destination, type }) => {
    if (!destination) return;

    if (type === "COLUMN") {
      if (source.index !== destination.index) {
        this.props.moveList({
          oldListIndex: source.index,
          newListIndex: destination.index,
        });
      }
      return;
    }

    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      this.props.moveCard({
        sourceListId: source.droppableId,
        destListId: destination.droppableId,
        oldCardIndex: source.index,
        newCardIndex: destination.index,
      });
    }
  };

  render() {
    const { board } = this.props;
    const { addingList } = this.state;

    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided, _snapshot) => (
            <div className="board" ref={provided.innerRef}>
              {board.lists.map((listId, index) => {
                return <List listId={listId} key={listId} index={index} />;
              })}

              {provided.placeholder}

              <div className="board__add-list">
                {addingList ? (
                  <AddList toggleAddingList={this.toggleAddingList} />
                ) : (
                  <div
                    onClick={this.toggleAddingList}
                    className="board__add-list-button"
                  >
                    <ion-icon name="add" /> Add a list
                  </div>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  moveList: (payload) => dispatch(moveList(payload)),
  moveCard: (payload) => dispatch(moveCard(payload)),
});

const mapStateToProps = (state) => ({ board: state.board });

export default connect(mapStateToProps, mapDispatchToProps)(Board);
