import React, { Component } from 'react';
import { Text, Button, TextInput, View, ActivityIndicator, StyleSheet } from 'react-native';

class CreateUser extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      userData: []
    }
  }
  
  // getData(){
  //   console.log(this.constructor.name + " Fetching from server...")
  //   return fetch('http://10.0.2.2:3333/api/1.0.0/user',{
  //     params: {

  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //     this.setState({
  //       isLoading: false,
  //       userData: responseJson
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   });
  // }

  // componentDidMount(){
  //   this.getData();
  // }

  

    render(){
      return(

        <View>
        <View>
          <Text h1>First name:</Text>
          <TextInput placeholder="Forname pls..."/>
        </View>
        <View>
        <Text>Second name:</Text>
        <TextInput placeholder="Surname pls..."/>
      </View>
      <View>
        <Text>Email:</Text>
        <TextInput placeholder="Email pls..."/>
      </View>
      <View>
        <Text>Password:</Text>
        <TextInput placeholder="Password pls..."/>
      </View>
      <Button title="Submit" onPress={console.log("[INFO] - I've been pressed!")}/>
      </View>
        
      );
    }
    
}

const styles = StyleSheet.create({
     container: {
             flex: 1,
             backgroundColor: '#fff',
             alignItems: 'center',
             justifyContent: 'center'
     },
    })

export default CreateUser;