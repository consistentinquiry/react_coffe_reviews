import React, {Component} from 'react';

import Shops from './shops';
import Search from './search';
import MyAccount from './my_account';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

  componentDidMount() {
    console.info('Loading...');
  }

  render() {
    return (
      <Tab.Navigator
        name="homeNav"
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen
          name="Shops"
          component={Shops}
          options={{
            tabBarLabel: 'Shops',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="store" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="magnify" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Me"
          component={MyAccount}
          options={{
            tabBarLabel: 'Me',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="account-box" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
export default Home;
