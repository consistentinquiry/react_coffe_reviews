import 'react-native-gesture-handler'; //must be on line 1

import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import Home from './components/home';

import SignIn from './components/sign_in';
import CreateUser from './components/create_user';
import ViewShop from './components/view_shop';
import MyAccount from './components/my_account';
import AddReview from './components/add_review';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

class App extends Component {
  importData = async () => {
    try {
      console.log('[DEBUG] Attempting to fetch storage contents...');
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      return result.map((req) => JSON.parse(req)).forEach(console.log);
    } catch (error) {
      console.error("[ERROR] Couldn't fetch all async contnents: " + error);
    }
  };

  clearAsyncStorage = async () => {
    console.log('[INFO] Clearning storage...');
    AsyncStorage.clear();
  };

  render() {
    // this.clearAsyncStorage()
    this.clearAsyncStorage();
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="ViewShop"
            component={ViewShop}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="CreateUser"
            component={CreateUser}
            options={{headerShown: true}}
          />
          <Stack.Screen name="MyAccount" component={MyAccount} />
          <Stack.Screen name="AddReview" component={AddReview} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
