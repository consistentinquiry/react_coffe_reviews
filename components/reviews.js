import {NavigationContainer, StackActions} from '@react-navigation/native';
import React, {Component} from 'react';
import {Button, Text, View, FlatList} from 'react-native';

class Reviews extends Component {
  render() {
    return (
      <FlatList>
        <View>
          <Text>Reviews!</Text>
        </View>
      </FlatList>
    );
  }
}

export default Reviews;
