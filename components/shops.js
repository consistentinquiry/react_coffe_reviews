import React, {Component, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  State,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ShopCard from './shop_card';

class Shops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      locationData: [],
      authenticated: true,
    };
  }

  componentDidMount() {
    this.getToken();
  }
  componentDidUpdate() {}

  async getToken() {
    try {
      let stored = await AsyncStorage.getItem('storage_Key');
      console.log(
        '[DEBUG] (home) Got this token from storage: ' + JSON.stringify(stored),
      );
      if (stored) {
        this.setState({token: stored});
        this.setState({authenticated: true});
        this.getShops();
      } else {
        this.setState({authenticated: false});
        console.log('[INFO] (home) No token found, setting as not logged in');
      }
    } catch (e) {
      console.log(
        '[ERROR] Somethings gone wrong retrieving token (home): ' + e,
      );
    }
  }

  async getShops() {
    await this.state.token;
    console.log('[INFO] Fetching shops...');
    fetch('http://10.0.2.2:3333/api/1.0.0/find/', {
      method: 'GET',
      headers: {
        'X-Authorization': this.state.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('[INFO] Setting state to reponse JSON...');
        this.setState({
          locationData: json,
        });
      })
      .catch((error) => {
        console.error(error);
        console.log("[DEBUG] Here's the token: " + this.state.token);
      });
  }

  render() {
    const navigation = this.props.navigation;
    console.log('[DEBUG] (shops) authenticated: ' + this.state.authenticated);
    console.log('[DEBUG] (shops.render()) token: ' + this.state.token);
    if (this.state.token) {
      //<---- may need changing later
      return (
        <View>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../img/cup.jpg')}>
            <FlatList
              data={this.state.locationData}
              style={styles.container}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ViewShop', {id: item.location_id})
                  }>
                  <View style={styles.card}>
                    <Text style={styles.cardTitle}>{item.location_name}</Text>
                    <Text>{item.avg_overall_rating}</Text>
                    <Text>{item.location_town} </Text>
                    {console.log(
                      '[DEBUG] item= ' +
                        item.location_name +
                        ' in ' +
                        item.location_town,
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Not logged in, nothing to view! </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: '3%',
  },
  card: {
    borderWidth: 2,
    borderColor: '#777',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 18,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});

export default Shops;
