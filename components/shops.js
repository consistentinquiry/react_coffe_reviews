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
      isLoading: true,
      locationData: [],
      userData: [],
    };
  }

  componentDidMount() {
    const unsubscribe = this.navigation.addListener('focus', () => {
      this.loadData();
    });
  }

  async loadData() {
    await this.retrieveCredentials();
    await this.getShops();
    await this.getUser();
    // console.log('USERDATA:' + JSON.stringify(this.state.userData));
    // console.log('USERDATA + FAVLOCATION' + JSON.stringify(this.state.userData.favourite_locations));
    // await this.getFavLocations();
  }

  async retrieveCredentials() {
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
      }
    } catch (e) {
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
      });
  }

  render() {
    console.log('(shops.render()) token: ' + this.state.token);
    if (this.state.isLoading !== true) {
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
                      onPress={() => this.onPressLike({id: item.location_id})}>
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
