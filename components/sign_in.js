import React, {Component} from 'react';
import {Button, Text, View, TextInput, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CreateUser from './create_user';
import Home from './home';
import {ActivityIndicator} from 'react-native-paper';
import {style} from 'dom-helpers';

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

  async postlogin() {
    // POST login details to server, return the json which contains token and ID
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
        return json;
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          'Failed to post your login. Double check your sign in details...',
        );
      });
  }

  storeData = async (value) => {
    //store aformatentioned token and ID
    try {
      console.debug('data: ' + JSON.stringify(value));
      await AsyncStorage.setItem('token', JSON.stringify(value.token));
      await AsyncStorage.setItem('id', JSON.stringify(value.id));
      this.props.navigation.navigate(Home);
    } catch (e) {
      console.error("Something's gone wrong saving your token or ID: " + e);
    }
  };

  async login() {
    //Function to control the whole sequence of events
    let data = await this.postlogin();
    await this.storeData(data);
  }

  render() {
    // conditional rendering if loading
    const nav = this.props.navigation;
    if (this.state.isLoading === false) {
      // if not loading
      return (
        <View>
          <View style={styles.card}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Email:</Text>
              <TextInput
                placeholder="Enter email..."
                onChangeText={(email) => this.setState({email})}
              />
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Password: </Text>
              <TextInput
                placeholder="password"
                onChangeText={(password) => this.setState({password})}
                secureTextEntry={true}
              />
            </View>
            <Button
              title="Log in"
              onPress={() => this.login(nav)}
              color={'orange'}
            />
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
  card: {
    borderWidth: 2,
    borderColor: '#777',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 18,
  },
});

export default SignIn;
