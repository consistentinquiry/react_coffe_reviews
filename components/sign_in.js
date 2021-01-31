import { NavigationContainer, StackActions, CommonActions } from '@react-navigation/native';
import React, { Component } from 'react';
import { Button, Text, View, FlatList, TextInput, StyleSheet } from 'react-native';




class SignIn extends Component{
  render(){
    return(
        <View>
            <View>
                <Text>Email:</Text>
                <TextInput placeholder="Enter email..."/>
                <Text>Password: </Text>
                <TextInput placeholder="password"/>
                <Button title="Submit"/>
            </View>
        <View>
            <Text style={styles.link} onPress={() => props.navigation.navigate('CreateUser',{ screen: 'CreateUser' })}>No account? No problem!</Text>
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