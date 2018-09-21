import React from "react";
import {
  View,
  Text,
  Alert,
  Clipboard,
  TouchableOpacity,
  TextInput
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

/*
todo:

- extract Provider from react-redux
- extract creatStore from redux

- import Pusher

- import reducers
- import actions
- create store
*/

import List from "../components/List";
import IconButton from "../components/IconButton";
import AlertBox from "../components/AlertBox";

import AddExerciseModal from "../modals/AddExerciseModal";
import AddSetModal from "../modals/AddSetModal";

import ConnectedFlatList from "../components/ConnectedFlatList";

import uniqname from "../helpers/uniqname";

const username = uniqname();

export default class LogWorkout extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params, routeName } = navigation.state;

    return {
      headerTitle: `Log Workout`,
      headerRight: (
        <IconButton
          size={25}
          color="#FFF"
          onPress={() => {
            if (routeName == "Log") {
              // todo: call function that dispatches an action for showing the add exercise modal
            }
          }}
        />
      ),
      headerStyle: {
        backgroundColor: "#333"
      },
      headerTitleStyle: {
        color: "#FFF"
      }
    };
  };

  state = {
    subscribedToUsername: ""
  };

  constructor(props) {
    super(props);
    // add initial value for Pusher and channels
  }

  componentDidMount() {
    /*
    todo:
    - set navigation param for adding the function to be executed when the right header button is clicked
    - initialize Pusher
    - subscribe to user's own channel
    */
  }

  showAddExerciseModal = () => {
    // todo: dispatch action for updating the store to show the add exercise modal
  };

  subscribe = () => {
    /*
    todo:
    - subscribed to username entered in the text field for entering the buddies name
    - bind to events that gets triggered when a new exercise is added, a new set is added, and a set is incremented
    */
  };

  render() {
    /*
    todo:
    - wrap everything in a Provider and component so the store can be passed down and used
    */
    return (
      <View>
        {this.props.navigation.state.routeName == "Log" && (
          <View style={styles.log_content}>
            <View style={styles.top_content}>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(username);
                  Alert.alert("Copied!", "Username was copied to clipboard.");
                }}
              >
                <View style={styles.box}>
                  <Text style={styles.box_text}>{username}</Text>
                  <MaterialIcons name="content-copy" size={18} color="#333" />
                </View>
              </TouchableOpacity>
            </View>

            <AddExerciseModal />
            <AddSetModal />

            <ConnectedFlatList user={"me"} />
          </View>
        )}

        {this.props.navigation.state.routeName == "Track" && (
          <View>
            <View style={styles.top_content}>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={styles.box}
                  onChangeText={subscribedToUsername =>
                    this.setState({ subscribedToUsername })
                  }
                >
                  <Text style={styles.box_text}>
                    {this.state.subscribedToUsername}
                  </Text>
                </TextInput>
              </View>

              <TouchableOpacity onPress={this.subscribe}>
                <View style={styles.action_button}>
                  <MaterialIcons name="forward" size={35} color="#333" />
                </View>
              </TouchableOpacity>
            </View>

            <ConnectedFlatList user={"others"} />
          </View>
        )}
      </View>
    );
  }
}

const styles = {
  top_content: {
    alignSelf: "center",
    flexDirection: "row"
  },
  box: {
    flexDirection: "row",
    margin: 10,
    padding: 5,
    borderWidth: 2,
    borderColor: "#333",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    justifyContent: "space-between"
  },
  box_text: {
    marginRight: 10
  },
  action_button: {
    marginTop: 7
  },
  log_content: {
    paddingBottom: 50
  },
  main_content: {
    flex: 1
  }
};
