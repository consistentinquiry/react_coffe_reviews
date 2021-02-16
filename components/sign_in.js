import React, {Component} from 'react';
import {Button, Text, View, TextInput, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CreateUser from './create_user';
import Home from './home';
import {ActivityIndicator} from 'react-native-paper';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
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
        response: [],
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.debug('Response.json = ' + json);
        console.log('[DEBUG] (sign in) - Storing token: ' + json.token);
        console.log('[DEBUG] (sign in) - Storing ID: ' + json.id);
        this.storeData(json);
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  storeData = async (value) => {
    try {
      await AsyncStorage.setItem('token', value.token);
      await AsyncStorage.setItem('id', JSON.stringify(value.id));
    } catch (e) {
      console.error("Something's gone wrong saving your token or ID: " + e);
    }
  };

  login = () => {
    console.debug('isLoading start of login(): ' + this.state.isLoading);
    this.setState({isLoading: true}, () => {
      console.debug('Forcing render...');
      this.render();
      this.postlogin();
      console.debug('isLoading end of login(): ' + this.state.isLoading);
    });
    this.props.navigation.navigate(Home);
    this.setState({isLoading: false});
  };

  render() {
    const nav = this.props.navigation;
    console.log('Auto rendering...');
    if (this.state.isLoading === false) {
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
    } else {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
});

export default SignIn;
