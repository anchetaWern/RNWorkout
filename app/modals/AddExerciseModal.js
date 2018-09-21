import React, { Component } from "react";
import { Modal, View, Text, Button, TextInput } from "react-native";

import IconButton from "../components/IconButton";
import componentCommonStyles from "../components/styles/common";
import modalCommonStyles from "./styles/common";

/*
todo:

- extract connect from react-redux
- import actions for toggling modal visibility, and adding a new exercise
*/

class AddExerciseModal extends Component {
  state = {
    exercise_name: ""
  };

  render() {
    return (
      <Modal
        animationType="slide"
        visible={false}
        onRequestClose={() => {
          // nothing
        }}
      >
        <View style={modalCommonStyles.modal_header}>
          <Text style={modalCommonStyles.modal_header_text}>Add Exercise</Text>
          <IconButton
            icon="close"
            color="#FFF"
            size={18}
            onPress={() => {
              // todo: call function for dispatching action for closing this modal
            }}
          />
        </View>
        <View style={modalCommonStyles.modal_body}>
          <TextInput
            style={componentCommonStyles.text_input}
            returnKeyType="done"
            placeholder="Exercise name (eg. Front squat)"
            onChangeText={exercise_name => this.setState({ exercise_name })}
            value={this.state.exercise_name}
          />

          <View style={componentCommonStyles.button_container}>
            <Button title="Add" onPress={this.addExercise} />
          </View>
        </View>
      </Modal>
    );
  }

  addExercise = () => {
    if (this.state.exercise_name) {
      this.setState({
        exercise_name: ""
      });
    }

    /*
    todo:

    - get the exercise data from the state

    - dispatch action for adding an exercise

    - trigger a client event for publishing the exercise data using the Pusher channel

    - close modal by dispatching an action to update store
    */
  };
}

/*
todo:
- add code for mapping functions for dispatching actions for:
  - hiding the add exercise modal
  - adding a new exercise

- add code for mapping relevant store data as props to this component

- convert this component to a connected component
*/

export default AddExerciseModal;
