import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userID: '',
      user_data: [],
      favourite_locations: [],
      reviews: [],
      liked_reviews: [],
      token: '',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    await this.retrieveCredentials();
    this.getUser();
  }

  async retrieveCredentials() {
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      console.log(
        '[DEBUG] (my account) Got this token & id from storage: \n' +
          JSON.stringify(token) +
          '\n' +
          JSON.stringify(id),
      );
      if (token && id) {
        this.setState({token: token});
        this.setState({id: id});
      } else {
        console.error('No token & id found');
      }
    } catch (e) {
      console.error('Somethings gone wrong retrieving token: ' + e);
    }
  }

  getUser() {
    console.log('[INFO] Fetching shops...');
    fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.id, {
      method: 'GET',
      headers: {
        'X-Authorization': this.state.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('[INFO] Setting state.userData to reponse JSON...');
        this.setState({
          user_data: json,
        });
        console.info(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const navigation = this.props.navigation;
    if (this.state.isLoading) {
      <View>
        <ActivityIndicator size="large" />
      </View>;
    }
    return (
      <View>
        <View>
          <Text> First name: </Text>
          <TextInput defaultValue={this.state.user_data.first_name} />
          <Text> Second name: </Text>
          <TextInput defaultValue={this.state.user_data.second_name} />
          <Text> Email: </Text>
          <TextInput defaultValue={this.state.user_data.email} />
          <Button title="Update" />
        </View>
        <View>
          <Text>Your favourite locations: </Text>
          <FlatList
            data={this.state.user_data.favourite_locations}
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
        </View>
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
});

export default MyAccount;
