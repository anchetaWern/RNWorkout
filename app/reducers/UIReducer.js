import { MODAL_TOGGLED, SET_EXERCISE } from "../actions/types";

const INITIAL_STATE = {
  ui: {
    current_exercise: "bb",
    addExerciseModalIsOpen: false,
    addSetModalIsOpen: false
  }
};

export default (state = INITIAL_STATE, action) => {
  let ui = { ...state.ui };
  switch (action.type) {
    case SET_EXERCISE:
      ui = { ...state.ui };
      ui["current_exercise"] = action.exercise_id;

      return {
        ...state,
        ui
      };

    case MODAL_TOGGLED:
      ui = { ...state.ui };
      ui[`${action.modal}IsOpen`] = action.visibility;

      const new_state = {
        ...state,
        ui
      };

      return new_state;

    default:
      return state;
  }
};
