import { combineReducers } from "redux";
import ExerciseReducer from "./ExerciseReducer";
import SetReducer from "./SetReducer";
import UIReducer from "./UIReducer";

export default combineReducers({
  exercises: ExerciseReducer,
  sets: SetReducer,
  ui: UIReducer
});
