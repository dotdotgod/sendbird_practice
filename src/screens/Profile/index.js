import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { initProfile, getCurrentUserInfo, updateProfile } from "../../actions";
import { Button, Avatar, Text, Input } from "../../components";

class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: "PROFILE",
      headerRight: (
        <Button
          containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          title="save"
          onPress={() => {
            params.handleSave();
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      profileUrl: "",
      nickname: ""
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this._onSaveButtonPress });
    this.props.initProfile();
    this.props.getCurrentUserInfo();
  }

  componentWillReceiveProps(props) {
    const { userInfo, isSaved } = props;
    if (userInfo) {
      const { profileUrl, nickname } = userInfo;
      this.setState({ profileUrl, nickname });
    }
    if (isSaved) {
      this.props.navigation.goBack();
    }
  }

  _onNicknameChanged = nickname => {
    this.setState({ nickname });
  };

  _onSaveButtonPress = () => {
    this.props.updateProfile(this.state.nickname);
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 50,
            marginBottom: 50
          }}
        >
          <Avatar large rounded source={{ uri: this.state.profileUrl }} />
        </View>

        <Text
          style={[
            styles.defaultMargin,
            { marginTop: 20, fontSize: 13, fontWeight: "400" }
          ]}
        >
          Nickname
        </Text>
        <Input
          containerStyle={styles.defaultMargin}
          selectionColor={"#000"}
          inputStyle={{ color: "#000" }}
          value={this.state.nickname}
          maxLength={12}
          onChangeText={this._onNicknameChanged}
        />
        <Text style={{ marginLeft: 14, color: "red" }}>{this.props.error}</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: "#fff",
    flex: 1
  },
  defaultMargin: {
    marginLeft: 14,
    marginRight: 14
  },
  menuViewStyle: {
    marginLeft: 0,
    marginRight: 0
  },
  buttonStyle: {
    justifyContent: "flex-start",
    paddingLeft: 14,
    backgroundColor: "transparent"
  },
  titleStyle: { color: "#6e5baa" }
};

function mapStateToProps({ profile }) {
  const { userInfo, error, isSaved } = profile;
  return { userInfo, error, isSaved };
}

export default connect(
  mapStateToProps,
  { initProfile, getCurrentUserInfo, updateProfile }
)(Profile);
