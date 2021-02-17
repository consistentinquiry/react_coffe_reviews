import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
class Shops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      isLoading: true,
      locationData: [],
      dummyData: [
        {
          location_id: 73,
          location_name: "Aunt Mary's Great Coffee Shop",
          location_town: 'London',
          latitude: 74.567,
          longitude: 102.435,
          photo_path: 'http://cdn.coffida.com/images/78346822.jpg',
          avg_overall_rating: 4.5,
          avg_price_rating: 4.3,
          avg_quality_rating: 4,
          avg_clenliness_rating: 3.8,
          location_reviews: [
            {
              review_id: 643,
              overall_rating: 4,
              price_rating: 2,
              quality_rating: 3,
              clenliness_rating: 5,
              review_body: 'Great coffee, but the bathrooms stank!',
              likes: 4654,
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    this.login();
  }

  async login() {
    await this.getToken();
    await this.getShops();
  }

  async getToken() {
    try {
      const stored = await AsyncStorage.getItem('token');
      if (stored) {
        this.setState({token: stored});
      } else {
        console.error(
          '(shops) No token found, will not be able to make API calls',
        );
      }
    } catch (e) {
      console.error('Somethings gone wrong retrieving token (home): ' + e);
    }
  }

  async getShops() {
    console.log('[INFO] Fetching shops...');
    fetch('http://10.0.2.2:3333/api/1.0.0/find/', {
      method: 'GET',
      headers: {
        'X-Authorization': this.state.token.substring(
          1,
          this.state.token.length - 1,
        ),
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.info('Setting state to reponse JSON...');
        this.setState({
          locationData: json,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error("Oh no: " + error);
        console.debug("Here's the token: " + this.state.token);
      });
  }

  onPressLike(id) {
    console.debug('ID to be used: ' + id.id);
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + id.id + '/favourite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        Alert.alert('Added to favourites!');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("That didn't work :(");
      });
  }

  render() {
    const navigation = this.props.navigation;
    console.log('[DEBUG] (shops.render()) token: ' + this.state.token);
    if (this.state.isLoading !== true) {
      return (
        <View>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../img/coffee.jpg')}>
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
                    <TouchableHighlight
                      onPress={() => this.onPressLike({id: item.location_id})}>
                      <View>
                        <Icon name={'heart'} size={30} />
                      </View>
                    </TouchableHighlight>
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
          <ActivityIndicator size="large" />
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
  favIcon: {
    color: 'red',
  },
});

export default Shops;
