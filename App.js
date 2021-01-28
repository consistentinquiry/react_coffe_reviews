import 'react-native-gesture-handler' //must be on line 1

import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/home';
import Login from './components/login';
import Search from './components/login';


const Stack = createStackNavigator();

class App extends Component{
    render(){
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Search" component={Search}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default App;