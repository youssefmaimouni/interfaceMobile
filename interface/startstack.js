// AppNavigator.js
import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Initial from './initial';
import Home from '../Home';

const Stack = createNativeStackNavigator();

function Startstack() {
   
    return (
        
            <Stack.Navigator initialRouteName="Initial" screenOptions={{headerShown:false}}>
                <Stack.Screen name="Initial" component={Initial} options={{ title: 'Initial' }}  />
                <Stack.Screen name="Home" component={Home}  />
            </Stack.Navigator>
       
    );
}

export default Startstack;
