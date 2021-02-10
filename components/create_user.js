import React, {Component} from 'react';
import {Text, Button, TextInput, View, StyleSheet, Alert} from 'react-native';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData: [],
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    };
  }

  postUser() {
    console.log('Posting new user...');
    return (
      fetch('http://10.0.2.2:3333/api/1.0.0/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password,
        }),
      })
        // .then((response) => response.json())
        .then((response) => {
          if (response.ok) {
            const nav = this.props.navigation;
            Alert.alert(
              "User '" + this.state.email + "' created!\nNow log in...",
            );
            nav.popToTop();
          }
        })
        .catch((error) => {
          Alert.alert(
            "Something went wrong, double check you've entered a unique email and the password is at least 5 chars long. Here's some more specific info:\n " +
              error,
          );
          console.error(error);
        })
    );
  }

  render() {
    return (
      <View>
        <View>
          <Text style={styles.txtHeaders}>First name:</Text>
          <TextInput
            placeholder="Forname pls..."
            onChangeText={(first_name) => this.setState({first_name})}
          />
        </View>
        <View>
          <Text>Second name:</Text>
          <TextInput
            placeholder="last_name pls..."
            onChangeText={(last_name) => this.setState({last_name})}
          />
        </View>
        <View>
          <Text>Email:</Text>
          <TextInput
            placeholder="Email pls..."
            onChangeText={(email) => this.setState({email})}
          />
        </View>
        <View>
          <Text>Password:</Text>
          <TextInput
            placeholder="Password pls..."
            onChangeText={(password) => this.setState({password})}
          />
        </View>
        <Button title="Submit" onPress={() => this.postUser()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtHeaders: {
    shadowColor: 'purple',
    borderLeftColor: 'green',
  },
});

export default CreateUser;
