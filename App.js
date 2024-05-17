import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import Fetch from './Fetch';
import base64 from 'base-64';

const username = 'admin';
const password = 'admin';
const encodedCredentials = base64.encode(`${username}:${password}`);

// Remplacez par vos propres informations d'identification et l'URL de votre base de données CouchDB
const COUCHDB_URL = 'http://admin:admin@192.168.71.241:5984//pfe-mobile';

const App = () => {
  const [data,setData]=useState();
    const axiosTest = ()=>{
      axios.get(COUCHDB_URL).then((response)=>response.data).then((responseJson)=>{
        console.log('hello');
        console.log(responseJson);
        setData(responseJson);
        //alert(data.map((item)=>item.prenom));
      }).catch((error)=>{console.log(error);})
    }
  return (
    <View style={styles.container}>
       <Button title='press me' onPress={()=>{console.log('----------');axiosTest();}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  documentContainer: {
    marginTop: 20,
  },
});

export default App;
