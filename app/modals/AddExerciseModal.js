import React, { Component } from "react";
import { Modal, View, Text, Button, TextInput } from "react-native";

import { connect } from "react-redux";

import IconButton from "../components/IconButton";
import componentCommonStyles from "../components/styles/common";
import modalCommonStyles from "./styles/common";

import { modalToggled, addedExercise } from "../actions";

import uniqid from "../helpers/uniqid";

class AddExerciseModal extends Component {
  state = {
    exercise_name: ""
  };

  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.props.ui.addExerciseModalIsOpen}
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
              this.props.closeModal();
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
    const name = this.state.exercise_name;
    const id = name.replace(" ", "_");
    this.props.addExercise(id, name);
    this.props.channel.trigger("client-added-exercise", {
      id,
      name
    });

    this.setState({
      exercise_name: ""
    });

    this.props.closeModal();
  };
}

const mapStateToProps = ({ ui }) => ({
  ...ui
});

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch(modalToggled("addExerciseModal", false));
    },
    addExercise: (id, name) => {
      dispatch(addedExercise(id, name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExerciseModal);
