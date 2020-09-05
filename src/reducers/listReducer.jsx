const initialState = {
  listData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_SUCCESS':
      return {
        ...state,
        listData: action.payload
      };
    case 'LIST_FAILURE':
      return {
        ...state,
        listData: []
      };
    default:
      return state;
  }
};