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
import StarRating from 'react-native-star-rating';

class Shops extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      token: '',
      userID: '',
      favLocations: [],
      isLoading: false,
      locationData: [],
      userData: [],
    };
  }

  componentDidMount() {
    //loading function wrapped in event listener that reloads when refocused
    const unsubscribe = this.navigation.addListener('focus', () => {
      this.loadData();
    });
  }

  async loadData() {
    //async loading function for required data
    await this.retrieveCredentials();
    await this.getShops();
    await this.getUser();
  }

  async retrieveCredentials() {
    //grab the token and the ID from Async storage
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      console.log(
        '(my account) Got this token & id from storage: \n' +
          JSON.stringify(token) +
          '\n' +
          JSON.stringify(id),
      );
      if (token && id) {
        this.setState({token: token});
        this.setState({userID: id});
      } else {
        console.error('No token & id found');
        Alert.alert('No token found! You wont be able to contact the server');
      }
    } catch (e) {
      console.error('Somethings gone wrong retrieving token: ' + e);
      Alert.alert('Somethings gone wrong retrieving token: ' + e);
    }
  }

  async getShops() {
    //Get all shops from API
    console.log('Fetching shops...');
    fetch('http://10.0.2.2:3333/api/1.0.0/find/', {
      method: 'GET',
      headers: {
        'X-Authorization': this.state.token.substring(
          1,
          this.state.token.length - 1,
        ), //this gross little fix was needed becuase for some reason double quotes were being added to the token
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
        Alert.alert('Failed to get shop data :(');
      });
  }

  async getUser() {
    console.log('Fetching user...');
    fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.userID, {
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
        // console.log('Got this user data:' + JSON.stringify(json));
        this.setState({
          userData: json,
        });
        this.getFavLocations();
        // console.info('Set userData state to: ' + this.state.userID);
      })
      .catch((error) => {
        console.error("Something's gone wrong in getUser");
        console.error(error);
      });
  }

  async getFavLocations() {
    var i;
    var len = Object.keys(this.state.userData.favourite_locations).length;
    console.debug('SHOPS number of keys: ' + len);
    for (i = 0; i < len; i++) {
      this.state.favLocations[i] = this.state.userData.favourite_locations[
        i
      ].location_id;
    }
    for (i = 0; i < this.state.favLocations.length; i++) {
      console.debug('FAV LOCATION ' + [i] + ' = ' + this.state.favLocations[i]);
    }
    this.setState({isLoading: false});
  }

  onPressLike(reviewID) {
    console.debug('ID to be used: ' + reviewID);
    fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + reviewID.id + '/favourite',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.token.substring(
            1,
            this.state.token.length - 1,
          ), //this gross little fix was needed becuase for some reason double quotes were being added to the token
        },
      },
    )
      .then((response) => response.status)
      .then((status) => {
        console.debug('Response.status = ' + status);
        if (status === 200) {
          console.info('Added shop to your favourites!');
          Alert.alert('Added shop to your favourites!');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Like failed :(');
      });
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <View>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../img/coffee.jpg')}>
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
                  <TouchableHighlight
                    onPress={() =>
                      this.onPressLike({
                        id: item.location_id,
                        usrID: this.state.userID,
                      })
                    }>
                    <View>
                      {this.state.favLocations.includes(item.location_id) ? (
                        <Icon name={'heart'} size={30} color={'#900'} />
                      ) : (
                        <Icon name={'heart'} size={30} color={'black'} />
                      )}
                    </View>
                  </TouchableHighlight>
                </View>
              </TouchableOpacity>
            )}
          />
        </ImageBackground>
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
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  favIcon: {
    color: 'red',
  },
});

export default Shops;
