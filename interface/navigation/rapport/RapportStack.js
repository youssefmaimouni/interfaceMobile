// AppNavigator.js
import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Rapp from './Rapp';
import AddRapp from './AddRapport';

const Stack = createNativeStackNavigator();

function RapportStack() {
    return (
        
            <Stack.Navigator initialRouteName="Rapport" screenOptions={{headerShown:false}}>
                <Stack.Screen name="Rapport" component={Rapp} options={{ title: 'Rapports' }} />
                <Stack.Screen name="AddRapport" component={AddRapp} options={{ title: 'Ajouter Rapport' }} />
            </Stack.Navigator>
       
    );
}

export default RapportStack;
