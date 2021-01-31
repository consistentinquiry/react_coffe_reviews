import React, { Component, useState } from 'react';
import { ActivityIndicator, Text, View, FlatList, State, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ShopCard from './shop_card'


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
  render(){
    return(
          <View>
            <FlatList 
            data={dummyLocation}
            style={styles.container}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => pressHandler(item.location_id)}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.shop.location_name}</Text>
                <Text>{item.shop.avg_overall_rating}</Text>
                <Text>{item.shop.location_town} </Text>
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