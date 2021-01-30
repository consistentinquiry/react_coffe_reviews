import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

class Login extends Component{
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


export default Login;