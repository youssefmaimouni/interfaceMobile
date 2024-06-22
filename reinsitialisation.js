import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EnvoiDeDonneer from './EnvoiDeDonneer';
import Initial from './interface/initial'
const Stack = createNativeStackNavigator();

function Reinitialiser() {
    return (
        
            <Stack.Navigator initialRouteName="EnvoiDeDonneer" screenOptions={{headerShown:false}}>
                <Stack.Screen name="EnvoiDeDonneer" component={EnvoiDeDonneer} options={{ title: 'EnvoiDeDonneers' }} />
                <Stack.Screen name="Initial" component={Initial} options={{ title: 'initialiser' }} />
            </Stack.Navigator>
       
    );
}

export default Reinitialiser;