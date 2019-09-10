import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import { NavigationActions, StackActions } from "react-navigation";

import { connect } from "react-redux";
import { sendbirdLogin } from "../../actions/loginActions";

import { Text, Input, Button } from "react-native-elements";
import SendBird from "sendbird";

const APP_ID = "9DA1B1F4-0BE6-4DA8-82C5-2E81DAB56F23";

class Login extends Component {
  static navigationOptions = {
    title: "LOGIN"
  };

  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      nickname: "",
      error: ""
    };
  }
  componentWillReceiveProps(props) {
    const { user, error } = props;
    if (user) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Menu" })]
      });
      this.setState({ userId: "", nickname: "" }, () => {
        this.props.navigation.dispatch(resetAction);
      });
    }
  }

  _userIdChanged = userId => {
    this.setState({
      userId
    });
  };

  _nicknameChanged = nickname => {
    this.setState({
      nickname
    });
  };

  _onButtonPress = () => {
    const { userId, nickname } = this.state;
    this.props.sendbirdLogin({ userId, nickname });
  };

  render() {
    return (
      <View style={[styles.mainContainer]}>
        <View style={styles.containerStyle}>
          <Text>User ID</Text>
          <Input value={this.state.userId} onChangeText={this._userIdChanged} />
        </View>
        <View style={styles.containerStyle}>
          <Text>Nickname</Text>
          <Input
            value={this.state.nickname}
            onChangeText={this._nicknameChanged}
          />
        </View>
        <View style={styles.containerStyle}>
          <Button
            buttonStyle={{ backgroundColor: "#2096f3" }}
            title="Connect"
            onPress={this._onButtonPress}
          />
        </View>
        <View style={styles.containerStyle}>
          <Text style={{ color: "red" }}>{this.props.error}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 10
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 30
  }
});

function mapStateToProps({ login }) {
  const { error, user } = login;
  return { error, user };
}

export default connect(
  mapStateToProps,
  { sendbirdLogin }
)(Login);
