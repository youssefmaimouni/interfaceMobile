import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function DemandeAccepter() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>vous êtes connecté </Text>
        <Image source={require('./succes.png')} style={styles.image}/>
      <Text style={styles.text2}>votre code d'association est: xxxxx </Text>
      <View style={styles.button}>
        <Button title='ouvrir le pv' />
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
    fontSize:30,
    marginTop:50,
    fontWeight:'bold',
  },
  image:{
    marginTop:10,
    height:120,
    width:120,
  },
  button:{
    marginTop:50,
    padding:6,
    width:400,
  },
  text2:{
    fontSize:15,
    marginTop:50,
    fontWeight:'500',
  },
});
