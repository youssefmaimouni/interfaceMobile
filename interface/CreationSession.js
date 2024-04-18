import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function CreationSession() {
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
