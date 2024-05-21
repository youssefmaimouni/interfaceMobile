import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import base64 from 'base-64';

export default function CreationSession() {
  const associer =async ()=>{
    const data ={
      
    }
    const response = await axios.post('http://127.0.0.1:8000/tablette/create', data, {
      headers: {
          'Content-Type': 'application/json'
        }
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>cette table n'est pas associée au serveur</Text>
      <View style={styles.button}>
        <Button title='associer au serveur' />
      </View>
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
    marginBottom:20,
  },
  button:{
    marginTop:30,
    padding:6,
    width:300,
  },
});
