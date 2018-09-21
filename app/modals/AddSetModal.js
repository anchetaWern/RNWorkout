import React, { Component } from "react";
import { Modal, View, Text, Button, TextInput } from "react-native";

import IconButton from "../components/IconButton";

import componentCommonStyles from "../components/styles/common";
import modalCommonStyles from "./styles/common";

/*
todo:

- extract connect from react-redux
- import actions for toggling modal visibility, and adding a new set
- import uniqid
*/

class AddSetModal extends Component {
  state = {
    weight: ""
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
          <Text style={modalCommonStyles.modal_header_text}>Add Set</Text>
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
    /*
    todo:
    - generate a unique ID
    - get the set data from the state

    - dispatch action for adding a set

    - trigger a client event for publishing the set data using the Pusher channel

    - close modal by dispatching an action to update store
    */

    if (this.state.weight) {
      this.setState({
        weight: ""
      });
    }
  };
}

/*
todo:
- add code for mapping functions for dispatching actions for:
  - hiding the add set modal
  - adding a new set

- add code for mapping relevant store data as props to this component

- convert this component to a connected component
*/

export default AddSetModal;
