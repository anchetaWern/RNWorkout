import { ADDED_SET, INCREMENTED_SET } from "../actions/types";

const INITIAL_STATE = {
  sets: [],
  others_sets: []
};

export default (state = INITIAL_STATE, action) => {
  let sets = [];
  let index = 0;
  let reps = 0;

  let set_name = "sets";
  let current_sets = [];

  switch (action.type) {
    case ADDED_SET:
      current_sets = action.user == "me" ? state.sets : state.others_sets;
      sets = current_sets.concat({
        key: action.id,
        exercise_id: action.exercise_id,
        weight: action.weight,
        reps: action.reps
      });

      const updated_state =
        action.user == "me"
          ? { ...state, sets }
          : { ...state, others_sets: sets };
      return updated_state;

    case INCREMENTED_SET:
      current_sets = action.user == "me" ? state.sets : state.others_sets;
      sets = [...current_sets];
      index = sets.findIndex(itm => {
        return itm.key == action.id;
      });

      reps = action.reps;
      sets[index] = { ...sets[index], reps: reps + 1 };

      if (action.user == "others") {
        return { ...state, others_sets: sets };
      }

      return { ...state, sets };

    default:
      return state;
  }
};
