import { NavigationContainer, StackActions, CommonActions } from '@react-navigation/native';

import React, { Component } from 'react';
import { Button, Text, View, FlatList, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignUp from './create_user'

import createStackNavigator from '@react-navigation/stack'


class SignIn extends Component{
    constructor(props){
        super(props);
        this.state={
          isLoading: true,
          userData: [],
          email: '',
          password: ''
        }
      }

        postlogin(){
            // console.log("[INFO] Posting login: " + this.state.email + " Password: " + this.state.password)
            return fetch('http://10.0.2.2:3333/api/1.0.0/user/login',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
                })
                .then((response) => response.json())
                .then((json) => {
                    console.log("[DEBUG] - Storing token: " + json.token )
                    this.storeData(json)
                    this.getData()
                    
                return json;
            })
            .catch((error) => {
            console.error(error);
            });
            }

            storeData = async (value) => {
              try {
                await AsyncStorage.setItem('@storage_Key', value.token)
              } catch (e) {
                console.log("[ERROR] - Something's gone wrong saving your token: " + e)
              }
            }
        
        
        
        getData = async () => {
                try {
                  const value = await AsyncStorage.getItem('@storage_Key')
                  if(value !== null) {
                    
                    // this.state.userData = value;
                    console.log("[DEBUG] - value= " + value)
                    return value
                  }
                } catch(e) {
                  console.log("[ERROR] Couldn't retrieve your value, soz")
                }
              }



        

        


  render(){
    // console.log("[DEBUG] - this.getData: "+ String(this.getData()))
    // if (this.getData == "")
    const Stack = createStackNavigator();
      return(
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
                <Button title="Submit" onPress={() => {
                  <Stack.Navigator>
                    <Stack.Screen name="SignUp" Component={SignUp} />
                  </Stack.Navigator>
                }}/>
            </View>
        <View>
            <Text style={styles.link} onPress={() => this.signUp()}>No account? No problem!</Text>
        </View>
    </View>
    );
    }
    

    
      
}

const styles = StyleSheet.create({
    link: {
        color: 'blue'
    }
})

export default SignIn;