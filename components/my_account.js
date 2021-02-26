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
      first_name: '',
      last_name: '',
      email: '',
      reviews: [],
      liked_reviews: [],
      token: '',
    };
  }

  componentDidMount() {
    //loading function wrapped in focusing event listener
    const unsubscribe = this.navigation.addListener('focus', () => {
      this.loadData();
      AsyncStorage.removeItem('review_img_uri');
    });
  }

  async loadData() {
    //async loading function for required data
    await this.retrieveCredentials();
    console.log('THIS TOKEN WILL BE USED: ' + this.state.token);
    this.getUser();
  }

  async retrieveCredentials() {
    //grab the token and the ID from Async storage
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      if (token && id) {
        this.setState({token: token});
        this.setState({userID: id});
      } else {
        console.error('No token & id found');
        Alert.alert('No token found, you wont be able to contact the server');
      }
    } catch (e) {
      console.error('Somethings gone wrong retrieving token: ' + e);
      Alert.alert(
        'There was an error getting your token, you wont be able to contact the server :(',
      );
    }
  }

  getUser() {
    //GET the user details from the server
    console.log('Fetching user: ' + this.state.userID);
    fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.userID, {
      method: 'GET',
      headers: {
        'X-Authorization': this.state.token.substring(
          1,
          this.state.token.length - 1, //again it kept complaining about the token
        ),
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('JSON: ' + JSON.stringify(json));
        this.setState({
          user_data: json,
          first_name: json.first_name,
          last_name: json.last_name,
          email: json.email,
        });
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Couldnt grab user details from server :( \n' + error);
      });
  }

  printUserDataState() {
    //debug function
    console.log(
      'user data state: ' +
        this.state.first_name +
        ' ' +
        this.state.last_name +
        ' ' +
        this.state.email,
    );
  }

  updateUser() {
    //PATCH the user details
    console.log('Updating user...');
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.userID, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.token.substring(
          1,
          this.state.token.length - 1, //fix was needed again...
        ),
      },
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
      }),
    })
      .then((response) => {
        if (response.ok) {
          const nav = this.props.navigation;
          Alert.alert('User updated!');
          nav.navigate('Home');
        }
      })
      .catch((error) => {
        Alert.alert(
          "Something went wrong updating your account. Here's some more specific info:\n " +
            error,
        );
      });
  }

  onPressRemoveFavourite(shopID) {
    //DELETE that's called when the user wants to remove a favourite shop, using the provided shopID
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
          this.navigation.navigate('Home');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          'Something went wrong and we couldnt delete that from your favourites:\n' +
            error,
        );
      });
  }

  onPressDeleteReview(IDs) {
    //DELETE review from the users reviews, using the IDs passed in to the function
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
          this.navigation.navigate('Home');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Failed to get delete review:\n' + error);
      });
  }

  logout = () => {
    console.log('Logging you out...');
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
              <Text style={styles.headingTxt}> First name: </Text>
              <TextInput
                defaultValue={this.state.user_data.first_name}
                onChangeText={(first_name) => this.setState({first_name})}
              />
            </View>
            <View style={styles.card}>
              <Text style={styles.headingTxt}> Second name: </Text>
              <TextInput
                defaultValue={this.state.user_data.last_name}
                onChangeText={(last_name) => this.setState({last_name})}
              />
            </View>
            <View style={styles.card}>
              <Text style={styles.headingTxt}> Email: </Text>
              <TextInput
                defaultValue={this.state.user_data.email}
                onChangeText={(email) => this.setState({email})}
              />
            </View>
            <Button
              title="Update"
              color={'orange'}
              onPress={() => this.updateUser()}
            />
          </View>
          <View style={styles.card}>
            <Text style={styles.headingTxt}>Your favourite locations: </Text>
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
                    <StarRating
                      fullStarColor={'gold'}
                      maxStars={5}
                      starSize={10}
                      rating={item.avg_overall_rating}
                    />
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
            <Text style={styles.headingTxt}>Your reviews: </Text>
            <FlatList
              data={this.state.user_data.reviews}
              style={styles.container}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.navigation.navigate('ViewOwnReview', {
                      id: item.review.review_id,
                    })
                  }>
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
  headingTxt: {
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
