import React, {Component} from 'react';

import Shops from './shops';
import Search from './search';
import MyAccount from './my_account';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      token: '',
    };
  }

  // componentDidMount(){
  //   this.getToken()

  // }

  // componentDidUpdate(prevProps, prevState)
  // {
  //   if (prevState.authenticated == true)
  // }

  // async getToken(){
  //   try{
  //     let stored = await AsyncStorage.getItem("token")
  //     console.log("[DEBUG] (home) Got this token from storage: " + JSON.stringify(stored))
  //     if(stored){
  //       this.setState({token: stored})
  //       this.setState({authenticated: true})
  //     }
  //     else{
  //       this.setState({authenticated: false})
  //       console.log("[INFO] (home) No token found, setting as not logged in")
  //     }
  //   }
  //   catch(e){
  //     console.log("[ERROR] Somethings gone wrong retrieving token (home): " + e)
  //   }
  // }

  render() {
    return (
      <Tab.Navigator
        name="homeNav"
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        {/* <Tab.Screen
                name="Reviews"
                component={Reviews}
                options={{
                tabBarLabel: 'Reviews',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="coffee"
                      color={color}
                      size={size}
                       />
                  ),
              }} /> */}
        <Tab.Screen
          name="Shops"
          component={Shops}
          options={{
            tabBarLabel: 'Shops',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="store" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="magnify"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Me"
          component={MyAccount}
          options={{
            tabBarLabel: 'Me',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="account-box"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
export default Home;
