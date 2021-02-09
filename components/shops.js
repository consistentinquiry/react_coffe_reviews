import React, { Component, useState } from 'react';
import { ActivityIndicator, Text, View, FlatList, State, StyleSheet, Image, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import ShopCard from './shop_card'

class Shops extends Component{
  constructor(props){
    super(props);
    this.state={
      token: '67271d2724c85dfe00fd0584175b377a',
      locationData: [],
      loggedIn: false
    }
  }
  
    
  componentDidMount(){
    this.getToken()
    this.getShops()
    
    
  }

  async getToken(){
    try{
      let stored = await AsyncStorage.getItem("storage_Key")
      console.log("[DEBUG] (shops) Got this token from storage: " + JSON.stringify(stored))
      if(stored){
        this.setState({token: stored})
        this.setState({loggedIn: true})
      }
      else{
        this.setState({loggedIn: false})
        console.log("[INFO] No token found, setting as not logged in")
      }
    }
    catch(e){
      console.log("[ERROR] Somethings gone wrong retrieving token (shops): " + e)
    }
  }        

  getShops(){
    console.log("[INFO] Fetching shops...")
      fetch('http://10.0.2.2:3333/api/1.0.0/find/', {
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
    
    const navigation = this.props.navigation;
    console.log("[DEBUG] authenticated: " + this.state.loggedIn)
    if(this.state.token)  //<---- may need changing later
    {
      return(
        <View>
          <ImageBackground style={styles.backgroundImage} source={require('../img/cup.jpg')}>
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
          </ImageBackground>
      </View>
    );  
    }
    else{
      return(
      <View>
        <Text>Not logged in, nothing to view! </Text>
      </View>
      )
    }
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
    backgroundColor: '#FFFFFF'
  },
  cardTitle: {
    fontSize: 18
  },
  backgroundImage :{
    width: '100%',
    height: '100%'
  }
})

export default Shops;