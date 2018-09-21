import React, { Component } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";

/*
todo:
- extract connect from react-redux
- import helper for generating unique IDs
*/

import IconButton from "../IconButton";
import List from "../List";
import SetContainer from "../SetContainer";
import AlertBox from "../AlertBox";

// todo: import actions

import styles from "./styles";

class ConnectedFlatList extends Component {
  render() {
    /*
    todo:
    - get the relevant exercises and sets data from props
    */
    const exercises = [];
    const sets = [];

    if (exercises.length) {
      return (
        <FlatList
          data={exercises}
          extraData={sets}
          renderItem={this.renderItem}
          contentContainerStyle={{ paddingBottom: 50, backgroundColor: "#FFF" }}
        />
      );
    }

    return <AlertBox type="info" text="No workout data yet." />;
  }

  renderItem = ({ item }) => {
    return (
      <View key={item.key} listKey={item.key}>
        <View style={styles.list_item_header}>
          <Text style={styles.list_item_header_text}>{item.exercise_name}</Text>
          <IconButton
            icon="add"
            size={20}
            color="#333"
            onPress={() => {
              if (this.props.user == "me") {
                /*
                todo:
                - execute function for updating the store to show the add set modal
                - execute function for setting the current exercise on the store
                */
              }
            }}
          />
        </View>
        {this.renderSets(item.exercise_id, item.key)}
      </View>
    );
  };

  renderSets = (exercise_id, key) => {
    /*
    todo:
    - generate unique value for the listKey prop for the List component
    - get the relevant state from the props
    - filter the specific sets for the current exercise
    */

    const sets = [];

    if (sets.length) {
      return (
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.content_container}
        >
          <List
            data={sets}
            listKey={l_key}
            renderItem={({ item }) => {
              return (
                <SetContainer
                  key={item.key}
                  weight={item.weight}
                  reps={item.reps}
                  onPress={() => {
                    if (this.props.user == "me") {
                      /*
                      todo:
                      - add code for dispatching action for incrementing a specific set
                      - add code triggering a client event for publishing the details for the incremented set
                      */
                    }
                  }}
                />
              );
            }}
          />
        </ScrollView>
      );
    }
  };
}

/*
todo:
- add code for mapping functions for dispatching actions for:
  - opening add set modal
  - setting the current exercise
  - incrementing a specific set

- add code for mapping relevant store data as props to this component

- convert this component to a connected component
*/

export default ConnectedFlatList;
