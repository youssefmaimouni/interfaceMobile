import { StatusBar } from 'expo-status-bar';
import {  Image, StyleSheet, Text,    TouchableOpacity,    View } from 'react-native';

import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ConnectionErr({route}) {

    const navigation=useNavigation();
  const image = require('./image/erreur_serv.jpg');
  return (
    <View source={image} style={styles.container}>
        <StatusBar />
       <Image source={image} style={styles.image} />
       <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Initial")} >
       <Text style={styles.buttonText} >retourne a la page initial</Text>
       </TouchableOpacity>
      <Text style={styles.text2}>vérifier l'etat de votre connexion et réssayez </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B7D8FE',
    alignItems: 'center',
    justifyContent:'center'
  },
  text:{
    fontSize:40,
    marginTop:10,
    marginBottom:30,
    fontWeight:'bold',
    color:'#ce3231'
  },
  button: {
    marginTop: 50,
    padding: 10,
    width: 330,
    backgroundColor:'#194a7a',
    borderRadius: 25,
  },
  buttonText:{
    color:'#fff',
    alignSelf:'center',
    fontWeight:'bold',
    fontSize:20,
  },
  text2:{
    fontSize:15,
    marginTop:30,
    fontWeight:'500',
    color:'#006e4f'
  },image:{
    height:300,
    width:300,
    marginBottom: 50,
    marginRight:60
  }
  
});
