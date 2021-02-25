import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class ViewOwnReview extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.reviewID = this.props.route.params.id;
    this.state = {
      token: '',
      isLoading: true,
      thisReview: [],
      reviewID: '',
      serverImg: '',
      overallRating: 0,
      avgPriceRating: 0,
      avgQualityRating: 0,
      avgClenlinessRating: 0,
      userID: '',
      reviewBody: '',
      user_data: [],
      likes: '',
      locationName: '',
      locationID: '',
      imgUri: '',
    };
  }

  componentDidMount() {
    const unsubscribe = this.navigation.addListener('focus', () => {
      this.loadData();
      console.debug('IMAGE URI: ' + this.state.imgUri);
    });
  }

  async loadData() {
    console.log('-> Starting the review loading process...');
    await this.getToken();
    await this.getUser();
    await this.getReviewImgUri();
  }

  async getToken() {
    try {
      const stored = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      if (stored && id) {
        const token = stored.substring(1, stored.length - 1);
        this.setState({token: token});
        this.setState({userID: id});
      } else {
        console.error(
          '(shops) No token found, will not be able to make API calls',
        );
      }
    } catch (e) {
      console.error('Somethings gone wrong retrieving token (home): ' + e);
    }
  }

  async getReviewImgUri() {
    try {
      const uri = await AsyncStorage.getItem('review_img_uri');
      console.log('ADD REVIEW IMG URI: ' + uri);
      if (uri) {
        this.setState({imgUri: uri});
        console.log('ADD REVIEW URI SET TO:' + this.state.imgUri);
      } else {
        console.error('No uri found');
      }
    } catch (e) {
      console.error('Somethings gone wrong retrieving img uri: ' + e);
    }
  }

  async uploadImage() {
    let base_url =
      'http://10.0.2.2:3333/api/1.0.0/location/' +
      this.state.locationID +
      '/review/' +
      this.state.reviewID +
      '/photo';
    fetch(base_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': this.state.token,
      },
      body: this.state.imgUri,
    })
      .then((response) => response.status)
      .then((status) => {
        if (status === 200) {
          console.log('Image posted to review!');
        }
      })
      .catch((error) => {
        console.error('POST photo failed: ' + error);
      });
  }

  async getImage() {
    let base_url =
      'http://10.0.2.2:3333/api/1.0.0/location/' +
      this.state.locationID +
      '/review/' +
      this.reviewID +
      '/photo';
    fetch(base_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': this.state.token,
      },
    })
      .then((response) => response.text())
      .then((text) => {
        console.log('RESPONSE IMAGE: ' + JSON.stringify(text));
        this.setState({serverImg: JSON.stringify(text)});
      })
      .catch((error) => {
        console.error('GET photo failed: ' + error);
      });
    this.setState({isLoading: false});
  }

  async deleteImage() {
    let base_url =
      'http://10.0.2.2:3333/api/1.0.0/location/' +
      this.state.locationID +
      '/review/' +
      this.reviewID +
      '/photo';
    fetch(base_url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': this.state.token,
      },
    })
      .then((response) => response.status)
      .then((status) => {
        if (status === 200) {
          Alert.alert('Image deleted!');
        }
      })
      .catch((error) => {
        console.error('DELETE photo failed: ' + error);
        Alert.alert(
          'Couldnt delete photo, there was an error :( \n More info: ' + error,
        );
      });
  }

  async loadReview() {
    var reviews = this.state.user_data.reviews;
    var i;
    for (i = 0; i <= reviews.length; i++) {
      if (reviews[i].review.review_id === this.reviewID) {
        this.setOverallRating(reviews[i].review.overall_rating);
        this.setAvgPriceRating(reviews[i].review.price_rating);
        this.setAvgQualityRating(reviews[i].review.quality_rating);
        this.setAvgClenlinessRating(reviews[i].review.clenliness_rating);
        this.setState({
          reviewID: reviews[i].review.review_id,
          reviewBody: reviews[i].review.review_body,
          likes: reviews[i].review.likes,
          locationName: reviews[i].location.location_name,
        });
        this.setState({locationID: reviews[i].location.location_id});
        this.getImage();
      }
    }

    // thisReview = reviews.find((item) => item.name === this.reviewID);
    // console.log('VIEW REVIEW, THIS REVIEW: ' + thisReview);
  }

  async getUser() {
    console.log('Fetching user: ' + this.state.userID);
    fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.userID, {
      method: 'GET',
      headers: {
        'X-Authorization': this.state.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('JSON: ' + JSON.stringify(json));
        this.setState({
          user_data: json,
        });
        this.loadReview();
      })
      .catch((error) => {
        console.error('VIEW REVIEW getUser() error: ' + error);
      });
  }

  printToken() {
    console.debug('Token: ' + this.state.token);
  }

  setOverallRating(value) {
    this.setState({overallRating: value});
  }

  setAvgPriceRating(value) {
    this.setState({avgPriceRating: value});
  }

  setAvgQualityRating(value) {
    this.setState({avgQualityRating: value});
  }

  setAvgClenlinessRating(value) {
    this.setState({avgClenlinessRating: value});
  }

  updateReview() {
    console.log('Updating review...');
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        this.state.locationID +
        '/review/' +
        this.state.reviewID,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.token,
        },
        body: JSON.stringify({
          overall_rating: this.state.overallRating,
          price_rating: this.state.avgPriceRating,
          quality_rating: this.state.avgQualityRating,
          clenliness_rating: this.state.avgClenlinessRating,
          review_body: this.state.reviewBody,
        }),
      },
    )
      .then((response) => {
        if (response.ok) {
          const nav = this.props.navigation;
          Alert.alert('Review updated!');
          nav.navigate('MyAccount');
        }
      })
      .catch((error) => {
        Alert.alert(
          "Something went wrong updating your review. Here's some more specific info:\n " +
            error,
        );
      });
  }

  async postUpdates() {
    await this.updateReview();
    if (this.state.imgUri) {
      console.log('Uploading image...');
      await this.uploadImage();
    } else {
      console.log('No image selected/detected, skipping img upload');
    }
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size={'large'} />;
    }
    return (
      <View>
        <View>
          <Text style={styles.title}>
            Edit review for {this.state.locationName}
          </Text>
        </View>
        <View style={styles.ratingsBackground}>
          <Text style={styles.ratingTitle}>Average overall_rating: </Text>
          <StarRating
            disabled={false}
            fullStarColor={'gold'}
            maxStars={5}
            rating={this.state.overallRating}
            starSize={20}
            selectedStar={(rating) => this.setOverallRating(rating)}
          />
          <Text style={styles.ratingTitle}>Average price rating: </Text>
          <StarRating
            disabled={false}
            fullStarColor={'gold'}
            maxStars={5}
            rating={this.state.avgPriceRating}
            starSize={20}
            selectedStar={(rating) => this.setAvgPriceRating(rating)}
          />
          <Text style={styles.ratingTitle}>Average quality rating: </Text>
          <StarRating
            disabled={false}
            fullStarColor={'gold'}
            maxStars={5}
            rating={this.state.avgQualityRating}
            starSize={20}
            selectedStar={(rating) => this.setAvgQualityRating(rating)}
          />
          <Text style={styles.ratingTitle}>Average clenliness rating: </Text>
          <StarRating
            disabled={false}
            fullStarColor={'gold'}
            maxStars={5}
            rating={this.state.avgClenlinessRating}
            starSize={20}
            selectedStar={(rating) => this.setAvgClenlinessRating(rating)}
          />
        </View>
        <View style={styles.ratingsBackground}>
          {this.state.imgUri ? (
            <Text>Got file: {this.state.imgUri}</Text>
          ) : (
            <Text onPress={() => this.navigation.navigate('CoffeeCam')}>
              {' '}
              + Add a pic? It'll be quick...
            </Text>
          )}
        </View>
        <View style={styles.ratingsBackground}>
          <Image source={this.state.serverImg} />
          <TouchableHighlight onPress={() => this.deleteImage()}>
            <View>
              <Icon name={'trash'} size={15} />
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.myReviewBackgrounnd}>
          <Text style={styles.headingTxt}>
            {' '}
            Tell us what you thought about the place:{' '}
          </Text>
          <TextInput
            defaultValue={this.state.reviewBody}
            onChangeText={(text) => this.setState({reviewBody: text})}
          />
        </View>
        <Button title="Update" onPress={() => this.postUpdates()} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: 'black',
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
  ratings: {
    color: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  headingTxt: {
    fontSize: 18,
  },
});

export default ViewOwnReview;
