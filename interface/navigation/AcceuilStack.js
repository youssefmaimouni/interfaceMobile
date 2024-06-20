// AppNavigator.js
import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Acceuil from './Acceuil';
import GeneratePDF from '../genererpdf';

const Stack = createNativeStackNavigator();

function AcceuilStack({route}) {
    const {seance}=route.params;
    return (
        
            <Stack.Navigator  screenOptions={{headerShown:false}}>
                <Stack.Screen name="Acceuil" component={Acceuil}    initialParams={{ seance }}/>
            </Stack.Navigator>
       
    );
}

export default AcceuilStack;
