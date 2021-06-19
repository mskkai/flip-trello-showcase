export const addList = (payload) => ({
  type: "ADD_LIST",
  payload,
});

export const moveList = (payload) => ({
  type: "MOVE_LIST",
  payload,
});

export const deleteList = (payload) => ({
  type: "DELETE_LIST",
  payload,
});

export const changeListTitle = (payload) => ({
  type: "CHANGE_LIST_TITLE",
  payload,
});
