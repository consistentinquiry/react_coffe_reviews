import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ViewShop extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.route.params.id;
    this.state = {
      token: '',
      thisShop: [],
    };
  }

  componentDidMount() {
    this.getToken();
    this.getShop();
  }

  async getToken() {
    try {
      let stored = await AsyncStorage.getItem('token');
      console.info('Got this token from storage: ' + stored);
      if (stored) {
        this.setState({token: stored});
      } else {
        console.warn("No token found, you won't be able to get the shop");
      }
    } catch (e) {
      console.error('Somethings gone wrong retrieving token (home): ' + e);
    }
  }

  getShop() {
    console.info('Fetching a single shop...');
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.info('Setting state to reponse JSON...');
        this.setState({
          thisShop: json,
        });
        console.debug('Retrieved: ' + this.state.thisShop);
      })
      .catch((error) => {
        console.error("Something's gone wrong (viewShop): " + error);
      });
  }

  render() {
    console.debug('ID: ' + this.id);
    return (
      <View>
        <Text style={styles.title}>{this.state.thisShop.location_name}</Text>
        <Text>{this.state.thisShop.location_town}</Text>

        <Text>{this.state.thisShop.avg_overall_rating}</Text>
        <Text>{this.state.thisShop.avg_price_rating}</Text>
        <Text>{this.state.thisShop.avg_quality_rating}</Text>
        <Text>{this.state.thisShop.avg_clenliness_rating}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
  location: {
    fontSize: 25,
  },
  ratings: {},
});

export default ViewShop;
