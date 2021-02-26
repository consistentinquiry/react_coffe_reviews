import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Filter from 'bad-words';

class ViewShop extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.id = this.props.route.params.id;
    this.filter = new Filter();

    //add words to the naughty list
    this.filter.addWords(
      'Tea',
      'tea',
      'Teas',
      'teas',
      'Cake',
      'cake',
      'Cakes',
      'cakes',
      'Pastry',
      'pastry',
      'Pastries',
      'pastries',
    );
    this.state = {
      token: '',
      thisReview: [],
      overallRating: 0,
      avgPriceRating: 0,
      avgQualityRating: 0,
      avgClenlinessRating: 0,
      reviewBody: '',
      reviewID: '',
    };
  }

  componentDidMount() {
    const unsubscribe = this.navigation.addListener('focus', () => {
      this.getToken();
    });
  }

  async getToken() {
    //get token from Async storage
    try {
      const stored = await AsyncStorage.getItem('token');
      if (stored) {
        const token = stored.substring(1, stored.length - 1);
        this.setState({token: token});
      } else {
        console.error(
          '(shops) No token found, will not be able to make API calls',
        );
      }
    } catch (e) {
      console.error('Somethings gone wrong retrieving token (home): ' + e);
    }
  }

  async postReview() {
    //POST to API with the id passed in to the component via props subsequently (see constructor), if fail then alert the user
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + this.id + '/review/',
      {
        method: 'POST',
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
      .then((response) => response.status)
      .then((status) => {
        console.debug('Response.status = ' + status);
        if (status === 201) {
          console.info('Review posted successfully!');
          Alert.alert('Review posted!');
          this.navigation.navigate('ViewShop', {id: this.id});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  printToken() {
    console.debug('Token: ' + this.state.token);
  }

  //Star value control functions 
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
    return (
      <View>
        <View>
          <Text style={styles.title}>New review</Text>
        </View>
        <View style={styles.ratingsBackground}>
          <Text style={styles.headingTxt}>Average overall_rating: </Text>
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
        <View style={styles.myReviewBackgrounnd}>
          <Text> Tell us what you thought about the place: </Text>
          <TextInput
            placeholder="Any thoughts? Don't hold back..."
            onChangeText={(text) =>
              //Pass the text to the filter to first remove profanity before setting state
              this.setState({reviewBody: this.filter.clean(text)})
            }
          />
        </View>
        <Button
          title="Submit"
          onPress={() => this.postReview()}
          color={'orange'}
        />
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

export default ViewShop;
