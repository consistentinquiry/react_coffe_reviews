import {NavigationContainer, CommonActions} from '@react-navigation/native';

import React, {Component} from 'react';
import {
  Button,
  Text,
  View,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CreateUser from './create_user';
import Home from './home';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData: [],
      authenticated: false,
      email: '',
      password: '',
    };
  }

  postlogin() {
    // console.log("[INFO] Posting login: " + this.state.email + " Password: " + this.state.password)
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('[DEBUG] (sign in) - Storing token: ' + json.token);
        this.state.authenticated = true;
        this.storeData(json);
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  storeData = async (value) => {
    try {
      await AsyncStorage.setItem('storage_Key', value.token);
    } catch (e) {
      console.log("[ERROR] - Something's gone wrong saving your token: " + e);
    }
  };

  login = () => {
    this.postlogin();
    this.props.navigation.navigate(Home);
  };

  render() {
    const nav = this.props.navigation;
    return (
      <View>
        <View>
          <Text>Email:</Text>
          <TextInput
            placeholder="Enter email..."
            onChangeText={(email) => this.setState({email})}
          />
          <Text>Password: </Text>
          <TextInput
            placeholder="password"
            onChangeText={(password) => this.setState({password})}
          />
          <Button title="Log in" onPress={() => this.login(nav)} />
        </View>
        <View>
          <Text style={styles.link} onPress={() => nav.navigate(CreateUser)}>
            No account? No problem!
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
});

export default SignIn;
