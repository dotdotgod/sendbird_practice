import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { NavigationActions, StackActions } from "react-navigation";
import { sendbirdLogout, initMenu } from "../../actions";
import { Button } from "../../components";

class Menu extends Component {
  static navigationOptions = {
    title: "MENU"
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.initMenu();
  }

  componentWillReceiveProps(props) {
    const { isDisconnected } = props;
    if (isDisconnected) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Login" })]
      });
      this.setState({ isLoading: false }, () => {
        this.props.navigation.dispatch(resetAction);
      });
    }
  }

  _onProfileButtonPress = () => {
    // TODO: Profile screen
    this.props.navigation.push("Profile");
  };

  _onOpenChannelPress = () => {
    // TODO: OpenChannel screen
  };

  _onGroupChannelPress = () => {
    // TODO: GroupChannel screen
  };

  _onDisconnectButtonPress = () => {
    this.props.sendbirdLogout();
  };

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <Button
          containerViewStyle={styles.menuViewStyle}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          icon={{
            name: "user",
            type: "font-awesome",
            color: "#6e5baa",
            size: 16
          }}
          title="Profile"
          onPress={this._onProfileButtonPress}
        />
        <Button
          containerViewStyle={styles.menuViewStyle}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          icon={{
            name: "slack",
            type: "font-awesome",
            color: "#6e5baa",
            size: 16
          }}
          title="Open Channel"
          onPress={this._onOpenChannelPress}
        />
        <Button
          containerViewStyle={styles.menuViewStyle}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          icon={{
            name: "users",
            type: "font-awesome",
            color: "#6e5baa",
            size: 16
          }}
          title="Group Channel"
          onPress={this._onGroupChannelPress}
        />
        <Button
          containerViewStyle={styles.menuViewStyle}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          icon={{
            name: "sign-out",
            type: "font-awesome",
            color: "#6e5baa",
            size: 16
          }}
          title="Disconnect"
          onPress={this._onDisconnectButtonPress}
        />
      </View>
    );
  }
}

const styles = {
  containerViewStyle: {
    backgroundColor: "#fff",
    flex: 1
  },
  menuViewStyle: {
    marginLeft: 0,
    marginRight: 0
  },
  buttonStyle: {
    justifyContent: "flex-start",
    paddingLeft: 14,
    backgroundColor: "#fff"
  },
  titleStyle: { color: "#6e5baa" }
};

function mapStateToProps({ menu }) {
  const { isDisconnected } = menu;
  return { isDisconnected };
}

export default connect(
  mapStateToProps,
  { sendbirdLogout, initMenu }
)(Menu);
