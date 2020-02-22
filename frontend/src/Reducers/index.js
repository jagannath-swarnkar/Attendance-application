import StudentDataReducer from "./StudentData";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  StudentData: StudentDataReducer
  // todos: TodoReducer
});

export default allReducers;
