import React from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Provider } from "react-redux";
import store from "./src/store";

import { Login, Menu, Profile } from "./src/screens";

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Menu: {
    screen: Menu
  },
  Profile: {
    screen: Profile
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
