export const addCard = (payload) => ({
  type: "ADD_CARD",
  payload,
});

export const moveCard = (payload) => ({
  type: "MOVE_CARD",
  payload,
});

export const deleteCard = (payload) => ({
  type: "DELETE_CARD",
  payload,
});

export const changeCardText = (payload) => ({
  type: "CHANGE_CARD_TEXT",
  payload,
});
