import React, {Component} from 'react';
import {getDistance} from 'geolib';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import StarRating from 'react-native-star-rating';

class ListLocals extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.lat = this.props.route.params.lat;
    this.long = this.props.route.params.long;
    console.log('lat: ' + this.lat);
    console.log('long: ' + this.long);
    this.state = {
      token: '',
      isLoading: true,
      locationData: [],
    };
  }

  componentDidMount() {
    //call the async data grabbing functions
    this.loadData();
  }

  async loadData() {
    await this.retrieveCredentials();
    await this.getShops();
  }

  async retrieveCredentials() {
    //grab the token from storage
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        this.setState({token: token});
      } else {
        console.error('No token');
      }
    } catch (e) {
      Alert.alert(
        'Your token couldnt be retrieved from storage, you wont be able to contact the server.',
      );
      console.error('Somethings gone wrong retrieving token: ' + e);
    }
  }

  async getShops() {
    console.log('Fetching shops...');
    fetch('http://10.0.2.2:3333/api/1.0.0/find/', {
      method: 'GET',
      headers: {
        'X-Authorization': this.state.token.substring(
          1,
          this.state.token.length - 1, //this fix was sometimes needed, for some reason it decided it didnt like "" arond the token
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
        console.error('Oh no: ' + error);
        console.debug("Here's the token: " + this.state.token);
        Alert.alert('Failed to get shop data from server :(');
      });
  }

  render() {
    //conditional rendering for loading...
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" />;
    }
    //not loading...
    console.log(
      'LOCALS locationData: ' + JSON.stringify(this.state.locationData),
    );
    return (
      <View>
        <FlatList
          data={this.state.locationData}
          style={styles.container}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.navigation.navigate('ViewShop', {id: item.location_id})
              }>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.location_name}</Text>
                <StarRating
                  fullStarColor={'gold'}
                  maxStars={5}
                  starSize={15}
                  rating={item.avg_overall_rating}
                />
                <Text>{item.location_town} </Text>
                <Text>
                  🎯 Distance from you:{' '}
                  {getDistance(
                    {latitude: item.latitude, longitude: item.longitude},
                    {latitude: this.lat, longitude: this.long},
                  )}{' '}
                  Meters away.
                </Text>
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
});

export default ListLocals;
