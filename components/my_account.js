import React, { Component } from 'react';
import { ActivityIndicator, Text, View, FlatList } from 'react-native';

class MyAccount extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      userData: []
    }
  }

  render(){
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator/>
        </View>
      )
    }  
    return(
        <View> 
  
        </View>
        
    );
  }
}

export default MyAccount;