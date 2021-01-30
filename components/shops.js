import React, { Component } from 'react';
import { ActivityIndicator, Text, View, FlatList } from 'react-native';

class Shops extends Component{
  render(){
    return(
        <FlatList>
            <View>
                <Text>Shops!</Text>
            </View>
        </FlatList>
        
    );
  }
}

export default Shops;