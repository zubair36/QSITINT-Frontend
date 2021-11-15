import * as BT from "./serviceTypes";
import axios from "axios";

export const saveUserRequest = (userRequest) => {
  return (dispatch) => {
    dispatch({
      type: BT.SAVE_USER_REQUEST,
    });
    axios
      .post("http://localhost:8081/rest/userrequests", userRequest)
      .then((response) => {
        dispatch(userRequestSuccess(response.data));
      })
      .catch((error) => {
        dispatch(userRequestFailure(error));
      });
  };
};

export const fetchUserRequest = (userRequestId) => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_USER_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/userrequests/" + userRequestId)
      .then((response) => {
        dispatch(userRequestSuccess(response.data));
      })
      .catch((error) => {
        dispatch(userRequestFailure(error));
      });
  };
};

export const updateUserRequest = (userRequest) => {
  return (dispatch) => {
    dispatch({
      type: BT.UPDATE_USER_REQUEST,
    });
    axios
      .put("http://localhost:8081/rest/userrequests", userRequest)
      .then((response) => {
        dispatch(userRequestSuccess(response.data));
      })
      .catch((error) => {
        dispatch(userRequestFailure(error));
      });
  };
};

export const deleteUserRequest = (userRequestId) => {
  return (dispatch) => {
    dispatch({
      type: BT.DELETE_USER_REQUEST,
    });
    axios
      .delete("http://localhost:8081/rest/userrequests/" + userRequestId)
      .then((response) => {
        dispatch(userRequestSuccess(response.data));
      })
      .catch((error) => {
        dispatch(userRequestFailure(error));
      });
  };
};

const userRequestSuccess = (userRequest) => {
  return {
    type: BT.USER_REQUEST_SUCCESS,
    payload: userRequest,
  };
};


const userRequestFailure = (error) => {
  return {
    type: BT.USER_REQUEST_FAILURE,
    payload: error,
  };
};

export const fetchRequestTypes = () => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_REQUEST_TYPES_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/userrequests/requestTypes")
      .then((response) => {
        dispatch({
          type: BT.REQUEST_TYPES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: BT.REQUEST_TYPES_FAILURE,
          payload: error,
        });
      });
  };
};

