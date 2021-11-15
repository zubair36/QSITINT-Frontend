import * as BT from "./serviceTypes";

const initialState = {
  service: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BT.SAVE_USER_REQUEST:
    case BT.FETCH_USER_REQUEST:
    case BT.UPDATE_USER_REQUEST:
    case BT.DELETE_USER_REQUEST:
    case BT.FETCH_REQUEST_TYPES_REQUEST:
      return {
        ...state,
      };
    case BT.USER_REQUEST_SUCCESS:
      return {
        service: action.payload,
        error: "",
      };
    case BT.USER_REQUEST_FAILURE:
      return {
        service: "",
        error: action.payload,
      };
    case BT.REQUEST_TYPES_SUCCESS:
      return {
        languages: action.payload,
        error: "",
      };
    case BT.REQUEST_TYPES_FAILURE:
      return {
        languages: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
