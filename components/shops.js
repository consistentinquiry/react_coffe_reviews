import React, { Component, useState } from 'react';
import { ActivityIndicator, Text, View, FlatList, State, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import ShopCard from './shop_card'

class Shops extends Component{
  constructor(props){
    super(props);
    this.state={
      token: '1c033012bb5444c731e1d296bc0eb2db',
      locationData: [],
      loggedIn: false
    }
  }
  
    
  //  async getToken()
  //   {
  //     try{
  //       let token = await AsyncStorage.getItem(token)
  //       if(token){
  //         this.setState(this.token = token)
  //       }
  //       else{
  //         console.log("[INFO] - There aint no token in storage")
  //       }
  //     }
  //     catch(e){
  //       console.log("[ERROR] - Something's gone wrong grabbing your token from storage: " + e)
  //     }
  //   }

    // async getToken(){                                                                                                                                                                                               
    //     try{                                                                                                                                                                                                               
    //       let token = await AsyncStorage.getItem(token)                                                                                                                                                             
    //       if(token){                                                                                                                                                                                                 
    //         this.setState({token: token})                                                                                                                                                                      
    //         this.setState({loggedIn: true});                                                                                                                                                                   
    //       }                                                                                                                                                                                                          
    //       else{                                                                                                                                                                                                      
    //         this.setState({loggedIn: false});                                                                                                                                                                                             }                                                                                                                                                                                                          
    //         this.getChits();                                                                                                                                                                                           
    //       }                                                                                                                                                                                                                  
    //     catch(error){                                                                                                                                                                                                      
    //         console.log(error.message)                                                                                                                                                                                 
    //       }                                                                                                                                                                                                                  
    //     }          

  componentDidMount(){
    console.log("[INFO] Fetching shops...")
      fetch('http://10.0.2.2:3333/api/1.0.0/find', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.token
        }
      })
      .then((response) => response.json())
      .then((json) => {
        console.log("[INFO] Setting state to reponse JSON...")
        this.setState({
          locationData: json
        })
      })
    }

  
  render()
  {
    // this.getToken()
    const navigation = this.props.navigation;
    console.log("[DEBUG] navigation: " + navigation)
      return(
        <View>
          <FlatList
          data={this.state.locationData}
          style={styles.container}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() =>  navigation.navigate('ViewShop', {id: item.location_id} )}> 
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.location_name}</Text>
                <Text>{item.avg_overall_rating}</Text>
                <Text>{item.location_town} </Text>
                {console.log("[DEBUG] item= " + item.location_name + " in " + item.location_town)}
            </View>
            </TouchableOpacity>
            )}
          />
      </View>
    );  
    
  }
}

const styles = StyleSheet.create({
  container: {
    padding: '3%'
  },
  card: {
    borderWidth: 2,
    borderColor: '#777',
    padding: 20,
  },
  cardTitle: {
    fontSize: 18
  }
})

export default Shops;