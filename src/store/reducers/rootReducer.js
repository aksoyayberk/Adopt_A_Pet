import authReducer from "./authReducer";
import petReducer from "./petReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    authR: authReducer,
    petR: petReducer
});

export default rootReducer;