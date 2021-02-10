import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData: [],
    };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return <View />;
  }
}

export default MyAccount;
