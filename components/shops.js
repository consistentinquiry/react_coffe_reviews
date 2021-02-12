import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Shops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      locationData: [],
    };
  }

  componentDidMount() {
    this.login();
  }

  async login() {
    await this.getToken();
    this.getShops();
  }

  async getToken() {
    try {
      const stored = await AsyncStorage.getItem('token');
      console.log(
        '(shops) Got this token from storage: ' + JSON.stringify(stored),
      );
      if (stored) {
        this.setState({token: stored});
        this.getShops();
      } else {
        console.error(
          '(shops) No token found, will not be able to make API calls',
        );
      }
    } catch (e) {
      console.error('Somethings gone wrong retrieving token (home): ' + e);
    }
  }

  getShops() {
    console.log('[INFO] Fetching shops...');
    fetch('http://10.0.2.2:3333/api/1.0.0/find/', {
      method: 'GET',
      headers: {
        'X-Authorization': this.state.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.info('Setting state to reponse JSON...');
        this.setState({
          locationData: json,
        });
      })
      .catch((error) => {
        console.error(error);
        console.debug("Here's the token: " + this.state.token);
      });
  }

  render() {
    const navigation = this.props.navigation;
    console.log('[DEBUG] (shops.render()) token: ' + this.state.token);
    if (this.state.token) {
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
