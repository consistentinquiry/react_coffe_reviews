import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating';

class ViewReview extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.reviewID = this.props.route.params.reviewID;
    this.locationID = this.props.route.params.locationID;
    this.state = {
      token: '',
      thisReview: [],
      overallRating: 0,
      avgPriceRating: 0,
      avgQualityRating: 0,
      avgClenlinessRating: 0,
      userID: '',
      reviewBody: '',
      user_data: [],
      likes: '',
      locationName: '',
      locationData: [],
      serverImg: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    console.log('VIEW REVIEW reviewID:' + this.reviewID);
    console.log('VIEW REVIEW locationID:' + this.locationID);
    await this.getToken();
    await this.getLocation();
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

  async loadReview() {
    var reviews = this.state.locationData.location_reviews;
    console.log('reviews: ' + JSON.stringify(reviews));
    console.log('reviews len: ' + reviews.length);
    var i;
    for (i = 0; i <= reviews.length; i++) {
      if (reviews[i].review_id === this.reviewID) {
        console.log(
          'VIEW REVIEW matching review: ' + JSON.stringify(reviews[i]),
        );
        this.setOverallRating(reviews[i].overall_rating);
        this.setAvgPriceRating(reviews[i].price_rating);
        this.setAvgQualityRating(reviews[i].quality_rating);
        this.setAvgClenlinessRating(reviews[i].clenliness_rating);
        this.setState({
          reviewID: reviews[i].review_id,
          reviewBody: reviews[i].review_body,
          likes: reviews[i].likes,
        });
      }
    }
  }

  async getImage() {
    let base_url =
      'http://10.0.2.2:3333/api/1.0.0/location/' +
      this.locationID +
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

  async getLocation() {
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.locationID, {
      method: 'GET',
      headers: {
        'X-Authorization': this.state.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log('LOCATION JSON: ' + JSON.stringify(json));
        this.setState({
          locationData: json,
        });
        this.loadReview();
        this.getImage();
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

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size={'large'} />;
    }
    return (
      <View>
        <View>
          <Text style={styles.title}>Review for {this.state.locationName}</Text>
        </View>
        <View style={styles.ratingsBackground}>
          <Text style={styles.headingTxt}>Average overall rating: </Text>
          <StarRating
            disabled={false}
            fullStarColor={'gold'}
            maxStars={5}
            rating={this.state.overallRating}
            starSize={20}
            selectedStar={(rating) => this.setOverallRating(rating)}
          />
          <Text style={styles.headingTxt}>Average price rating: </Text>
          <StarRating
            disabled={false}
            fullStarColor={'gold'}
            maxStars={5}
            rating={this.state.avgPriceRating}
            starSize={20}
            selectedStar={(rating) => this.setAvgPriceRating(rating)}
          />
          <Text style={styles.headingTxt}>Average quality rating: </Text>
          <StarRating
            disabled={false}
            fullStarColor={'gold'}
            maxStars={5}
            rating={this.state.avgQualityRating}
            starSize={20}
            selectedStar={(rating) => this.setAvgQualityRating(rating)}
          />
          <Text style={styles.headingTxt}>Average clenliness rating: </Text>
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
          <Text>Images will go here</Text>
        </View>
        <View style={styles.myReviewBackgrounnd}>
          <Text> User thoughts on : </Text>
          <TextInput
            defaultValue={this.state.reviewBody}
            onChangeText={(text) => this.setState({reviewBody: text})}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
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

export default ViewReview;
