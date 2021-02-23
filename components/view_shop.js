import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';

class ViewShop extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.route.params.id;
    this.navigation = this.props.navigation;
    this.state = {
      token: '',
      thisShop: [],
    };
  }

  componentDidMount() {
    const unsubscribe = this.navigation.addListener('focus', () => {
      this.getToken();
      this.getShop();
    });
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
        console.debug('Response = ' + JSON.stringify(json));
        console.debug('Retrieved: ' + this.state.thisShop);
      })
      .catch((error) => {
        console.error("Something's gone wrong (viewShop): " + error);
      });
  }

  onStarRatingPress() {
    console.debug('Star pressed!');
  }

  addReview(id) {}

  likeReview(reviewID) {
    console.debug('ID to be used: ' + reviewID);
    fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        this.id +
        '/review/' +
        reviewID +
        '/like',
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
          console.info('Liked review!');
          Alert.alert('Liked review!');
          this.navigation.navigate('ViewShop', {id: this.id});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const navigation = this.props.navigation;
    console.debug('ID: ' + this.id);
    return (
      <View>
        <ScrollView>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../img/blur_background.jpg')}>
            <Text style={styles.title}>
              {this.state.thisShop.location_name}
            </Text>
            <Text style={styles.location}>
              {this.state.thisShop.location_town}
            </Text>
            <View style={styles.ratingsBackground}>
              <Text style={styles.ratingTitle}>Average overall_rating: </Text>
              <StarRating
                disabled={false}
                fullStarColor={'gold'}
                maxStars={5}
                rating={this.state.thisShop.avg_overall_rating}
                starSize={20}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
              <Text style={styles.ratingTitle}>Average price rating: </Text>
              <StarRating
                disabled={false}
                fullStarColor={'gold'}
                maxStars={5}
                rating={this.state.thisShop.avg_price_rating}
                starSize={20}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
              <Text style={styles.ratingTitle}>Average quality rating: </Text>
              <StarRating
                disabled={false}
                fullStarColor={'gold'}
                maxStars={5}
                rating={this.state.thisShop.avg_quality_rating}
                starSize={20}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
              <Text style={styles.ratingTitle}>
                Average clenliness rating:{' '}
              </Text>
              <StarRating
                disabled={false}
                fullStarColor={'gold'}
                maxStars={5}
                rating={this.state.thisShop.avg_clenliness_rating}
                starSize={20}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </View>
            <View style={styles.myReviewBackgrounnd}>
              <Text
                onPress={() => navigation.navigate('AddReview', {id: this.id})}>
                What did you think of {this.state.thisShop.location_name}? Write
                your review here.
              </Text>
            </View>
            <View style={styles.reviewsBackground}>
              <Text style={styles.reviewsTitle}>
                Community reviews for {this.state.thisShop.location_name}:{' '}
              </Text>
              <FlatList
                data={this.state.thisShop.location_reviews}
                style={styles.container}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ViewReview', {
                        locationID: this.id,
                        reviewID: item.review_id,
                      })
                    }>
                    <View style={styles.reviewBackground}>
                      <StarRating
                        fullStarColor={'gold'}
                        maxStars={5}
                        rating={item.overall_rating}
                      />
                      {console.log('VIEW SHOP item.location_id: ' + this.id)}
                      {console.log(
                        'VIEW SHOP item.review_id: ' + item.review_id,
                      )}
                      <Text>{item.review_body}</Text>
                      <Text>Likes: {item.likes} </Text>
                      <TouchableHighlight
                        onPress={() => this.likeReview(item.review_id)}>
                        <View>
                          <Icon name="thumbs-up" size={30} color="#900" />
                        </View>
                      </TouchableHighlight>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: 'white',
  },
  ratingTitle: {
    color: 'black',
  },
  ratingsBackground: {
    borderWidth: 2,
    borderColor: '#777',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  myReviewBackgrounnd: {
    borderWidth: 2,
    borderColor: '#777',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  reviewsTitle: {
    color: 'black',
    fontSize: 25,
  },
  reviewBackground: {
    borderWidth: 2,
    borderColor: '#777',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  reviewsBackground: {
    borderWidth: 2,
    borderColor: '#777',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  location: {
    fontSize: 25,
    color: 'white',
  },
  ratings: {
    color: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});

export default ViewShop;
