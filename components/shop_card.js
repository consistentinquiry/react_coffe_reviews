import { NavigationContainer, StackActions } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Button, Text, View, FlatList, StyleSheet } from 'react-native';
import { LongPressGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';


// export default function ShopCard (item) {

//     [location_name, setLocation_name] = useState(item.location_name);
//     [avg_overall_rating, setavg_overall_rating] = useState(item.avg_overall_rating);
//     [location_town, setlocation_town] = useState(item.location_town);

//     return(
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>{shop.location_name}</Text>
//         <Text>{item.shop.avg_overall_rating}</Text>
//         <Text>{item.shop.location_town} </Text>
//    </View>
        
//     );
// }

// const styles = StyleSheet.create({

// })




//--------------Class------------

class ShopCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      item: props.item

    }

    // this.location_name = props.location_name
    // this.avg_overall_rating = props.avg_overall_rating
    // this.location_name = props.location_town
 }
  render(){
    return(
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.shop.location_name}</Text>
        <Text>{item.shop.avg_overall_rating}</Text>
        <Text>{item.shop.location_town} </Text>
      </View>
        
    );
  }
}

const styles = StyleSheet.create({

})

export default ShopCard;
