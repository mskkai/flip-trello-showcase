import React, { Component } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { deleteCard, changeCardText } from "../../actions/card";
import CardEditor from "./CardEditor";

class Card extends Component {
  state = {
    hover: false,
    editing: false,
  };

  startHover = () => this.setState({ hover: true });
  endHover = () => this.setState({ hover: false });

  startEditing = () =>
    this.setState({
      hover: false,
      editing: true,
      text: this.props.card.text,
    });

  endEditing = () => this.setState({ hover: false, editing: false });

  editCard = async (text) => {
    const { card, changeCardText } = this.props;
    this.endEditing();
    changeCardText({ cardId: card._id, cardText: text });
  };

  deleteCard = async () => {
    const { listId, card, deleteCard } = this.props;

    if (window.confirm("Are you sure to delete this card?")) {
      deleteCard({ cardId: card._id, listId });
    }
  };

  render() {
    const { card, index } = this.props;
    const { hover, editing } = this.state;

    if (!editing) {
      return (
        <Draggable draggableId={card._id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="card"
              onMouseEnter={this.startHover}
              onMouseLeave={this.endHover}
            >
              {hover && (
                <div className="card-icons">
                  <div className="card-icon" onClick={this.startEditing}>
                    <ion-icon name="create" />
                  </div>
                </div>
              )}

              {card.text}
            </div>
          )}
        </Draggable>
      );
    } else {
      return (
        <CardEditor
          text={card.text}
          onSave={this.editCard}
          onDelete={this.deleteCard}
          onCancel={this.endEditing}
        />
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteCard: (payload) => dispatch(deleteCard(payload)),
  changeCardText: (payload) => dispatch(changeCardText(payload)),
});

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId],
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
