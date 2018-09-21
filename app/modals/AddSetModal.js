import React, { Component } from "react";
import { Modal, View, Text, Button, TextInput } from "react-native";

import { connect } from "react-redux";

import IconButton from "../components/IconButton";

import componentCommonStyles from "../components/styles/common";
import modalCommonStyles from "./styles/common";

import { modalToggled, addedSet } from "../actions";

import uniqid from "../helpers/uniqid";

class AddSetModal extends Component {
  state = {
    weight: ""
  };

  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.props.ui.addSetModalIsOpen}
        onRequestClose={() => {
          // nothing
        }}
      >
        <View style={modalCommonStyles.modal_header}>
          <Text style={modalCommonStyles.modal_header_text}>Add Set</Text>
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
            keyboardType="numeric"
            placeholder="Weight (e.g. 100)"
            onChangeText={weight => this.setState({ weight })}
            value={this.state.weight}
          />

          <View style={componentCommonStyles.button_container}>
            <Button title="Add" onPress={this.addSet} />
          </View>
        </View>
      </Modal>
    );
  }

  addSet = () => {
    const id = uniqid();
    const exercise_id = this.props.ui.current_exercise;
    const weight = this.state.weight;

    this.props.addSet(id, exercise_id, weight);
    this.props.channel.trigger("client-added-set", {
      id,
      exercise_id,
      weight
    });

    this.props.closeModal();

    this.setState({
      weight: ""
    });
  };
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch(modalToggled("addSetModal", false));
    },
    addSet: (setID, exerciseID, weight) => {
      dispatch(addedSet(setID, exerciseID, weight));
    }
  };
};

const mapStateToProps = ({ ui }) => ({
  ...ui
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSetModal);
