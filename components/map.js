import React, {Component} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  Alert,
  TouchableOpacity,
  View,
  Text,
  PermissionsAndroid,
  StyleSheet,
  Image,
  overlay,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class Map extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      locationPermission: false,
      locationData: [],
      shopData: [],
      token: '',
      isLoading: true,
      myLat: '',
      myLong: '',
      isPopup: false,
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
    await this.findCoordinates();
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
        console.info('MAP Got these shops: ' + JSON.stringify(json));
        this.setState({
          shopData: json,
        });
      })
      .catch((error) => {
        console.error('Oh no: ' + error);
        console.debug("Here's the token: " + this.state.token);
      });
  }

  findCoordinates = () => {
    if (!this.state.locationPermission) {
      this.state.locationPermission = this.requestLocationPermission();
    }
    Geolocation.getCurrentPosition(
      (position) => {
        const location = JSON.stringify(position);

        this.setState({locationData: location});
        this.setState({myLat: position.coords.latitude});
        this.setState({myLong: position.coords.longitude});

        console.log('MAP myLat:' + this.state.myLat);
        console.log('MAP myLong:' + this.state.myLong);
        console.log('MAP:' + this.state.locationData);

        this.setState({isLoading: false});
      },
      (error) => {
        Alert.alert(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Lab04 Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access location');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  }

  handleOnPress() {
    this.navigation.navigate('ListLocals', {
      lat: this.state.myLat,
      long: this.state.myLong,
    });
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size={'large'} />;
    } else {
      return (
        <View style={styles.container}>
          {console.log(
            'locationData.coords: ' + JSON.stringify(this.state.locationData),
          )}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 53.4808,
              longitude: -2.2426,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <MapView.Marker
              coordinate={{
                latitude: this.state.myLat,
                longitude: this.state.myLong,
              }}
              title={'You!'}
              image={require('../img//me.png')}
              description={'This is where you are'}
            />
            {this.state.shopData.map((marker, index) => (
              <MapView.Marker
                key={index}
                {...console.log('marker:' + JSON.stringify(marker))}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.location_name}
                image={require('../img//coffecup.png')}
                description={'description'}
              />
            ))}
          </MapView>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.closebyView}>
            <TouchableOpacity
              onPress={() => this.handleOnPress()}
              style={styles.roundButton1}>
              <Text style={styles.target}>🎯</Text>
              <Image
                style={styles.closebyImg}
                source={require('../img//coffecup.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  closebyView: {
    position: 'absolute', //use absolute position to show button on top of the map
    top: '50%', //for center align
    alignSelf: 'flex-end',
  },
  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
  },
  target: {
    fontSize: 20,
  },
  closebyImg: {
    width: 50,
    height: 50,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    opacity: 0.9,
  },
  text: {
    width: '20%',
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Map;
