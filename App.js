import 'react-native-gesture-handler' //must be on line 1

import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Button from 'react-native'

import Home from './components/home';
import Login from './components/login';
import Search from './components/login';
import CreateUser from './components/create_user'
import MyAccount from './components/my_account'
import ViewShop from './components/view_shop';
import ViewReview from './components/view_review'


const Stack = createStackNavigator();

class App extends Component{


    render(){
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen 
                        name="Home" 
                        component={Home}
                                                  
                    />
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Search" component={Search}/>
                    <Stack.Screen name="CreateUser" component={CreateUser}/>
                    <Stack.Screen name="MyAccount" component={MyAccount}/>
                    <Stack.Screen name="ViewShop" component={ViewShop}/>
                    <Stack.Screen name="ViewReview" component={ViewReview}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}



export default App;