import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

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
        <Text style={styles.cardTitle}>
          {this.state.item.shop.location_name}
        </Text>
        <Text>{this.state.item.shop.avg_overall_rating}</Text>
        <Text>{this.state.item.shop.location_town} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default ShopCard;
