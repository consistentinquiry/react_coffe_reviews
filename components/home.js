import React, {Component} from 'react';

import Shops from './shops';
import MyAccount from './my_account';
import Map from './map';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  render() {
    //the second nav for to navigate the app's core functionality, tabs are pretty so i went with that
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
              <Icon name="coffee" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({color, size}) => (
              <Icon name="map" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Me"
          component={MyAccount}
          options={{
            tabBarLabel: 'Me',
            tabBarIcon: ({color, size}) => (
              <Icon name="address-card" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
export default Home;
