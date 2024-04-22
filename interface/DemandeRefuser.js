import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function DemandeRefuser() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Votre demande a été refusée </Text>
        <Image source={require('./refus.png')} style={styles.image}/>
      <View style={styles.button}>
        <Button title='envoi une autre demande d`association' />
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
    marginTop:0,
    marginBottom:30,
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
