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

import { Provider } from "react-redux";
import { createStore } from "redux";

import Pusher from "pusher-js/react-native";

import reducers from "../reducers";

import {
  modalToggled,
  incrementedSet,
  addedExercise,
  addedSet
} from "../actions";

const store = createStore(reducers);

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
              params.showAddExerciseModal();
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
    this.pusher = null;
    this.my_channel = null;
    this.followed_channel = null;
  }

  componentDidMount() {
    this.props.navigation.setParams({
      showAddExerciseModal: this.showAddExerciseModal
    });

    this.pusher = new Pusher("YOUR PUSHER APP KEY", {
      authEndpoint: "YOUR_NGROK_URL/pusher/auth",
      cluster: "YOUR_PUSHER_APP_CLUSTER",
      encrypted: true
    });

    this.my_channel = this.pusher.subscribe(`private-user-${username}`);
    this.my_channel.bind("pusher:subscription_error", status => {
      Alert.alert(
        "Error occured",
        "Cannot connect to Pusher. Please restart the app."
      );
    });

    this.my_channel.bind("pusher:subscription_succeeded", () => {
      console.log("subscription to my channel ok!");
    });
  }

  showAddExerciseModal = () => {
    store.dispatch(modalToggled("addExerciseModal", true));
  };

  subscribe = () => {
    this.followed_channel = this.pusher.subscribe(
      `private-user-${this.state.subscribedToUsername}`
    );

    this.followed_channel.bind("pusher:subscription_error", status => {
      Alert.alert(
        "Error occured",
        "Cannot connect to Pusher. Please restart the app."
      );
    });

    this.followed_channel.bind("pusher:subscription_succeeded", () => {
      Alert.alert("Success", "You are now subscribed!");

      this.followed_channel.bind("client-added-exercise", data => {
        store.dispatch(addedExercise(data.id, data.name, "others"));
      });

      this.followed_channel.bind("client-added-set", data => {
        store.dispatch(
          addedSet(data.id, data.exercise_id, data.weight, "others")
        );
      });

      this.followed_channel.bind("client-incremented-set", data => {
        store.dispatch(incrementedSet(data.set_id, data.reps, "others"));
      });
    });
  };

  render() {
    return (
      <Provider store={store}>
        <View>
          {this.props.navigation.state.routeName == "Log" &&
            this.my_channel && (
              <View style={styles.log_content}>
                <View style={styles.top_content}>
                  <TouchableOpacity
                    onPress={() => {
                      Clipboard.setString(username);
                      Alert.alert(
                        "Copied!",
                        "Username was copied to clipboard."
                      );
                    }}
                  >
                    <View style={styles.box}>
                      <Text style={styles.box_text}>{username}</Text>
                      <MaterialIcons
                        name="content-copy"
                        size={18}
                        color="#333"
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <AddExerciseModal channel={this.my_channel} />
                <AddSetModal channel={this.my_channel} />

                <ConnectedFlatList user={"me"} channel={this.my_channel} />
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
      </Provider>
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
