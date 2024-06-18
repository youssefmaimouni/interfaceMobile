import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function TabletteBloquer() {
  return (
    <View style={styles.container}>
    <Image source={require('./tabBloquer.jpg')} style={styles.image}/>
      <Text style={styles.text}>cette tablette est bloquer</Text>
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
    fontSize:20,
    marginTop:50,
    fontWeight:'bold',
  },
  image:{
    marginTop:-100,
    height:100,
    width:100,
  },
});
