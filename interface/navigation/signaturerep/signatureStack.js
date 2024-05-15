// AppNavigator.js
import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignatureScreen from './SignatureScreen';
import Sign from './Signature';

const Stack = createNativeStackNavigator();

function SignatureStack() {
    return (
        
            <Stack.Navigator initialRouteName="Signature" screenOptions={{headerShown:false}}>
                <Stack.Screen name="Signature" component={Sign} options={{ title: 'Signature' }} />
                <Stack.Screen name="SignatureScreen" component={SignatureScreen} options={{ title: 'SignatureScreen' }} />
            </Stack.Navigator>
       
    );
}

export default SignatureStack;
