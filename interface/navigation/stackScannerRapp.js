// AppNavigator.js
import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scanner from './Scanner';
import AddRapp from './rapport/AddRapport';

const Stack = createNativeStackNavigator();

function ScannerStack() {
    return (
        
            <Stack.Navigator initialRouteName="Scanner" screenOptions={{headerShown:false}}>
                <Stack.Screen name="Scanner" component={Scanner} options={{ title: 'Scanners' }} />
                <Stack.Screen name="AddRapport" component={AddRapp} options={{ title: 'Ajouter Rapport' }} />
            </Stack.Navigator>
       
    );
}

export default ScannerStack;