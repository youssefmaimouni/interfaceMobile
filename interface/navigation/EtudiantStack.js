// AppNavigator.js
import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Etudiants from './Etudiants';
import AddRapp from './rapport/AddRapport';

const Stack = createNativeStackNavigator();

function EtudiantStack() {
    return (
        
            <Stack.Navigator initialRouteName="Etudiant" screenOptions={{headerShown:false}}>
                <Stack.Screen name="Etudiant" component={Etudiants} options={{ title: 'Etudiants' }} />
                <Stack.Screen name="AddRap" component={AddRapp} options={{ title: 'AddRapp' }} />
            </Stack.Navigator>
       
    );
}

export default EtudiantStack;
