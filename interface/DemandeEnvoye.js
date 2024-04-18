import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function DemandeEnvoye() {
  return (
    <View style={styles.container}>
        <Image source={require('./serverSucces.jpg')} style={styles.image}/>
      <Text style={styles.text}>la demande d'association a été envoyée</Text>
      <View style={styles.button}>
        <Button title='envoi une autre demande d`association' />
      </View>
      <Text style={styles.text2}>Apres la visualisation de votre demande nous vous informerons la réponse lorsque vous avez connecté </Text>
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
    height:120,
    width:120,
  },
  button:{
    marginTop:100,
    padding:6,
    width:400,
  },
  text2:{
    fontSize:15,
    marginTop:50,
    fontWeight:'300',
  },
});
