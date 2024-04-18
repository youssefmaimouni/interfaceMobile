import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function ErrorConnection() {
  return (
    <View style={styles.container}>
        <Image source={require('./serverError.jpg')} style={styles.image}/>
      <Text style={styles.text}>échec de connexion</Text>
      <View style={styles.button}>
        <Button title='renvoyez la demande d`association' />
      </View>
      <Text style={styles.text2}>vérifier l'etat de votre connexion et réssayez </Text>
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
