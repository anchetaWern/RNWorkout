import {
  ADDED_EXERCISE,
  ADDED_SET,
  INCREMENTED_SET,
  MODAL_TOGGLED,
  SET_EXERCISE
} from "./types";

export const addedExercise = (exerciseID, exerciseName, user = "me") => {
  return {
    type: ADDED_EXERCISE,
    id: exerciseID,
    exercise: exerciseName,
    user: user
  };
};

export const addedSet = (setID, exerciseID, weight, user = "me") => {
  return {
    type: ADDED_SET,
    id: setID,
    exercise_id: exerciseID,
    weight: weight,
    reps: 1,
    user: user
  };
};

export const incrementedSet = (setID, reps, user = "me") => {
  return {
    type: INCREMENTED_SET,
    id: setID,
    reps: reps,
    user: user
  };
};

export const modalToggled = (modalName, visibility) => {
  console.log("got called");
  return {
    type: MODAL_TOGGLED,
    modal: modalName,
    visibility: visibility
  };
};

export const setExercise = id => {
  return {
    type: SET_EXERCISE,
    exercise_id: id
  };
};
