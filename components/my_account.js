import React, { Component } from 'react';
import { ActivityIndicator, Text, View, FlatList } from 'react-native';

class MyAccount extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      userData: []
    }
  }

  // getData(){
  //   console.log("[INFO] Fetching from server...")
  //   return fetch('http://10.0.2.2:3333/api/1.0.0/user/',{
  //     params: {
  //       id: 8,
  //       token: '72e6bea6718859e65308719c5b791070'
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //     this.setState({
  //       isLoading: false,
  //       userData: responseJson
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   });
  // }

  // componentDidMount(){
  //   this.getData();
  // }

  render(){
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator/>
        </View>
      )
    }  
    return(
        <View> 
          {/* <FlatList
            data={this.state.userData}
            renderItem={({item}) => <Text>{item.userData}</Text>}
            keyExtractor={({id}, index) => id}
          /> */}
        </View>
        
    );
  }
}

export default MyAccount;