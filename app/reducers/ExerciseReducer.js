import { ADDED_EXERCISE } from "../actions/types";

import uniqid from "../helpers/uniqid";

const INITIAL_STATE = {
  exercises: [],
  others_exercises: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDED_EXERCISE:
      const key = uniqid();
      const id = action.id;
      const exercise = action.exercise;

      const exercises =
        action.user == "me" ? state.exercises : state.others_exercises;

      const updated_exercises = exercises.concat({
        key: key,
        exercise_id: id,
        exercise_name: exercise,
        exercise_sets: 0
      });

      if (action.user == "me") {
        return { ...state, exercises: updated_exercises };
      }

      return { ...state, others_exercises: updated_exercises };

    default:
      return state;
  }
};
