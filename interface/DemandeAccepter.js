import {  Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function DemandeAccepter() {

const image = require('./demandeAccepte.jpeg');
const navigation=useNavigation();


  return (
    <View style={styles.container}>
<Image source={image} style={styles.image}/>

      <Text style={styles.text}>vous êtes connecté </Text>
       
      <TouchableOpacity 

        style={styles.button}
        onPress={()=>{navigation.navigate('PV')}}
       >
        <Text style={styles.buttonText} >ouvre le PV</Text>
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:30,
    marginTop:50,
    fontWeight:'bold',
  },
  image:{
    height:200,
    width:300,
    marginBottom: 50
  },
  button: {
    marginTop: 50,
    padding: 10,
    width: 300,
    backgroundColor:'#194a7a',
    borderRadius: 20,
  },
  buttonText:{
    color:'#fff',
    alignSelf:'center',
    fontWeight:'bold',
    fontSize:18,
  },
  text2:{
    fontSize:25,
    marginTop:30,
    fontWeight:'500',
    color:'#006e4f'
  }
});
