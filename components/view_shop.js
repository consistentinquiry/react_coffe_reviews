import React, { Component } from 'react';
import { Text, View } from 'react-native';

class ViewShop extends Component{
  constructor(props){
    super(props);
    this.id  = this.props.route.params.id;
    this.state = {
      token: '1c033012bb5444c731e1d296bc0eb2db',
      thisShop: []

    }
  }

  componentDidMount(){
    console.log("[INFO] Fetching shops...")
    
      fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.token
      }
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("[INFO] Setting state to reponse JSON...")
      this.setState({
        thisShop: json
      })
      console.log("[DEBUG] Retrieved: " + this.state.thisShop)
    })
    .catch((error) => {
      console.log("[ERROR] Something's gone wrong: "+error)
    });
      
    }

  render(){
    console.log("[DEBUG] id: " + this.id)
    // console.log("[DEBUG] this.state.id: " + this.id)
    return(
        <View>
          <Text>{this.state.thisShop.location_name}</Text>
          <Text>{this.state.thisShop.location_town}</Text>

          <Text>{this.state.thisShop.avg_overall_rating}</Text>
          <Text>{this.state.thisShop.avg_price_rating}</Text>
          <Text>{this.state.thisShop.avg_quality_rating}</Text>
          <Text>{this.state.thisShop.avg_clenliness_rating}</Text>
        </View>
    );
  }
}

export default ViewShop;