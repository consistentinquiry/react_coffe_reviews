import React, { Component, useState } from 'react';
import { ActivityIndicator, Text, View, FlatList, State, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import ShopCard from './shop_card'
import ViewShop from './view_shop'


const dummyLocation = [{
  shop:
   { location_id: 73,
     location_name: "Aunt Mary's Great Coffee Shop",
     location_town: "London",
     avg_overall_rating: 4.5,
     location_reviews: 
      {
        review_id: 643,
        overall_rating: 4,
        price_rating: 2,
        quality_rating: 3,
        clenliness_rating: 5,
        review_body: "Great coffee, but the bathrooms stank!",
        likes: 4654
      }
   },
   key: 1
}]




class Shops extends Component{
  constructor(props){
    super(props);
    this.state={
      token: '1c033012bb5444c731e1d296bc0eb2db',
      locationData: []
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
  
  onPress = () => {
    const Stack = createStackNavigator();
      return(
        <Stack.Navigator>
          <Stack.Screen name="ViewShop" component={ViewShop} />
        </Stack.Navigator>
        );
  }
  
  render()
  {
    // this.getToken()
    return(
          <View>
            <FlatList
            data={this.state.locationData}
            style={styles.container}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={this.onPress}> 
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.location_name}</Text>
                  <Text>{item.avg_overall_rating}</Text>
                  <Text>{item.location_town} </Text>
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
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
  },
  cardTitle: {
    fontSize: 18
  }
})

export default Shops;