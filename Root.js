import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";

import LogWorkoutScreen from "./app/screens/LogWorkout";

const icons = {
  Log: "event-note",
  Track: "track-changes"
};

const LogStack = createStackNavigator(
  {
    Log: LogWorkoutScreen
  },
  { initialRouteName: "Log" }
);

const TrackStack = createStackNavigator(
  {
    Track: LogWorkoutScreen
  },
  { initialRouteName: "Track" }
);

console.ignoredYellowBox = ["Setting a timer"];

export default createBottomTabNavigator(
  {
    Log: LogStack,
    Track: TrackStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = icons[routeName];
        let color = focused ? "#fff" : "#929292";

        return <MaterialIcons name={iconName} size={35} color={color} />;
      }
    }),
    tabBarPosition: "bottom",
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: "#333"
      }
    }
  },
  {
    initialRouteName: "Log"
  }
);
