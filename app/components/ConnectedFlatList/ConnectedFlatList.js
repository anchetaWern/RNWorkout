import React, { Component } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";

import { connect } from "react-redux";

import uniqid from "../../helpers/uniqid";

import IconButton from "../IconButton";
import List from "../List";
import SetContainer from "../SetContainer";
import AlertBox from "../AlertBox";

import {
  modalToggled,
  setExercise,
  incrementedSet,
  addedExercise,
  addedSet
} from "../../actions";

import styles from "./styles";

class ConnectedFlatList extends Component {
  render() {
    const exercises =
      this.props.user == "me"
        ? this.props.exercises
        : this.props.others_exercises;
    const sets =
      this.props.user == "me" ? this.props.sets : this.props.others_sets;

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
                this.props.openAddSetModal();
                this.props.setExercise(item.exercise_id);
              }
            }}
          />
        </View>
        {this.renderSets(item.exercise_id, item.key)}
      </View>
    );
  };

  renderSets = (exercise_id, key) => {
    const id = uniqid();
    const l_key = exercise_id + ":" + key + ":" + id;

    const sets_data =
      this.props.user == "me" ? this.props.sets : this.props.others_sets;
    const sets = sets_data.filter(item => {
      return item.exercise_id == exercise_id;
    });

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
                      this.props.incrementSet(item.key, item.reps);
                      this.props.channel.trigger("client-incremented-set", {
                        set_id: item.key,
                        reps: item.reps
                      });
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

const mapStateToProps = state => {
  return {
    exercises: state.exercises.exercises,
    sets: state.sets.sets,
    others_exercises: state.exercises.others_exercises,
    others_sets: state.sets.others_sets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openAddSetModal: () => {
      dispatch(modalToggled("addSetModal", true));
    },
    setExercise: exercise_id => {
      dispatch(setExercise(exercise_id));
    },
    incrementSet: (set_id, reps) => {
      dispatch(incrementedSet(set_id, reps));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedFlatList);
