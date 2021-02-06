import 'react-native-gesture-handler' //must be on line 1

import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'

import { createStackNavigator } from '@react-navigation/stack';


import Home from './components/home'

import SignIn from './components/sign_in'
import CreateUser from './components/create_user'
import ViewShop from './components/view_shop'






const Stack = createStackNavigator();

class App extends Component{
   
  render(){
    return(
      <NavigationContainer >
      <Stack.Navigator
        screenOptions={{ headerShown: false}}  
      >
        
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="ViewShop" component={ViewShop}/>
        <Stack.Screen name="CreateUser" component={CreateUser} />
      </Stack.Navigator>
    </NavigationContainer>
    )
    }
  }

  
  
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'forestgreen'
      },
      text: {
          color: 'white',
          fontSize: 25
      }
  })
  
  

  export default App;