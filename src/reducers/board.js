const boardReducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case "ADD_LIST": {
      const { listId } = action.payload;
      return { lists: [...state.lists, listId] };
    }
    case "MOVE_LIST": {
      const { oldListIndex, newListIndex } = action.payload;
      const newLists = Array.from(state.lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      return { lists: newLists };
    }
    case "DELETE_LIST": {
      const { listId } = action.payload;
      const filterDeleted = (tmpListId) => tmpListId !== listId;
      const newLists = state.lists.filter(filterDeleted);
      return { lists: newLists };
    }
    case "ADD_DATA": {
      state = {};
      state.listsById = action.dashboard.listsById;
      state.board = action.dashboard.board;
      state.cardsById = action.dashboard.cardsById;
      state.user = action.dashboard.user;
      return state;
    }

    default:
      return state;
  }
};

export default boardReducer;
