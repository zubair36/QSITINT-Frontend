import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
import serviceReducer from "./service/serviceReducer";

const rootReducer = combineReducers({
  user: userReducer,
  service: serviceReducer,
  auth: authReducer,
});

export default rootReducer;
