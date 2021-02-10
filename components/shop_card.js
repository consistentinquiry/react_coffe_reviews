import {NavigationContainer, StackActions} from '@react-navigation/native';
import React, {Component, useState} from 'react';
import {propTypes} from 'react-bootstrap/esm/Image';
import {Button, Text, View, FlatList, StyleSheet} from 'react-native';
import {
  LongPressGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler';

class ShopCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
    };
  }
  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.shop.location_name}</Text>
        <Text>{item.shop.avg_overall_rating}</Text>
        <Text>{item.shop.location_town} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default ShopCard;
