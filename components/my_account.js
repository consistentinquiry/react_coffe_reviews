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
  TouchableHighlight,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      isLoading: true,
      userID: '',
      user_data: [],
      reviews: [],
      liked_reviews: [],
      token: '',
    };
  }

  componentDidMount() {
    const unsubscribe = this.navigation.addListener('focus', () => {
      this.loadData();
    });
  }

  async loadData() {
    await this.retrieveCredentials();
    console.log('THIS TOKEN WILL BE USED: ' + this.state.token);
    this.getUser();
  }

  async retrieveCredentials() {
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
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

  getUser() {
    console.log('Fetching user: ' + this.state.userID);
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
        this.setState({
          user_data: json,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateUser() {
    console.debug(
      'WILL UPDATE USER WITH: ' +
        this.state.user_data.first_name +
        ' ' +
        this.state.user_data.second_name +
        ' ' +
        this.state.user_data.email,
    );
    fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.userID, {
      method: 'PATCH',
      headers: {
        'X-Authorization': this.state.token.substring(
          1,
          this.state.token.length - 1,
        ),
      },
      body: JSON.stringify({
        first_name: this.state.user_data.first_name,
        second_name: this.state.user_data.last_name,
        email: this.state.user_data.email,
      }),
    })
      .then((response) => response.status)
      .then((status) => {
        console.debug('Response.status = ' + status);
        if (status === 200) {
          console.info('Profile updated successfully!');
          Alert.alert('User updated!');
          this.navigation.navigate('MyAccount');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onPressRemoveFavourite(shopID) {
    console.debug('ID to be unfavourited: ' + shopID);
    fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + shopID.id + '/favourite',
      {
        method: 'DELETE',
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
          console.info('Removed shop from your favourites!');
          Alert.alert('Removed shop from your favourites!');
          this.navigation.navigate('MyAccount');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onPressDeleteReview(IDs) {
    const sID = IDs.shopID;
    const rID = IDs.reviewID;
    const url =
      'http://10.0.2.2:3333/api/1.0.0/location/' + sID + '/review/' + rID;
    console.debug('DELETE URL: ' + url);
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.token.substring(
          1,
          this.state.token.length - 1,
        ), //this gross little fix was needed becuase for some reason double quotes were being added to the token
      },
    })
      .then((response) => response.status)
      .then((status) => {
        console.debug('Response.status = ' + status);
        if (status === 200) {
          console.info('Removed review!');
          Alert.alert('Removed review!');
          this.navigation.navigate('MyAccount');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  logout = () => {
    console.log('Loggin you out...');
    Alert.alert('You have logged out!');
    AsyncStorage.clear();
    console.info('Sending you home...');
    this.render();
    this.navigation.navigate('SignIn');
  };

  render() {
    if (this.state.isLoading) {
      <View>
        <ActivityIndicator size="large" />
      </View>;
    }
    return (
      <ScrollView>
        <View>
          <View style={styles.card}>
            <View style={styles.card}>
              <Text> First name: </Text>
              <TextInput defaultValue={this.state.user_data.first_name} />
            </View>
            <View style={styles.card}>
              <Text> Second name: </Text>
              <TextInput defaultValue={this.state.user_data.last_name} />
            </View>
            <View style={styles.card}>
              <Text> Email: </Text>
              <TextInput defaultValue={this.state.user_data.email} />
            </View>
            <Button
              title="Update"
              color={'orange'}
              onPress={() => this.updateUser()}
            />
          </View>
          <View style={styles.card}>
            <Text>Your favourite locations: </Text>
            <FlatList
              data={this.state.user_data.favourite_locations}
              style={styles.container}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.navigation.navigate('ViewShop', {id: item.location_id})
                  }>
                  <View style={styles.card}>
                    <Text style={styles.cardTitle}>{item.location_name}</Text>
                    <Text>{item.avg_overall_rating}</Text>
                    <Text>{item.location_town} </Text>
                    <TouchableHighlight
                      onPress={() =>
                        this.onPressRemoveFavourite({id: item.location_id})
                      }>
                      <View>
                        <Icon name={'trash'} size={15} />
                      </View>
                    </TouchableHighlight>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.card}>
            <Text>Your reviews: </Text>
            <FlatList
              data={this.state.user_data.reviews}
              style={styles.container}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => console.log('Review pressed')}>
                  {console.debug('ITEM:' + JSON.stringify(item))}
                  <View style={styles.reviewBackground}>
                    <StarRating
                      fullStarColor={'gold'}
                      maxStars={5}
                      rating={item.review.overall_rating}
                    />
                    <Text>{item.review.review_body}</Text>
                    <Text>Likes: {item.review.likes} </Text>
                    <TouchableHighlight
                      onPress={() =>
                        this.onPressDeleteReview({
                          shopID: item.location.location_id,
                          reviewID: item.review.review_id,
                        })
                      }>
                      <View>
                        <Icon name={'trash'} size={15} />
                      </View>
                    </TouchableHighlight>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <View>
            <Button
              title="Logout"
              color={'red'}
              onPress={() => this.logout()}
            />
          </View>
        </View>
      </ScrollView>
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
  reviewBackground: {
    borderWidth: 2,
    borderColor: '#777',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
});

export default MyAccount;
