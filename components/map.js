import React, {Component} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {Alert, Button, View, Text} from 'react-native';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const location = JSON.stringify(position);

        this.setState({location});
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

  render() {
    return (
      <View>
        {this.state.location ? (
          <Text>{this.state.location}</Text>
        ) : (
          <Text>Where art thou?</Text>
        )}
        <Button title="Get location" onPress={() => this.findCoordinates()} />
      </View>
    );
  }
}

export default Map;
