import React from 'react';
import { View,Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import surveillants from '../data/surveillant.json'; 
import { useNavigation } from '@react-navigation/native'; 

const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('../logofsac.jpeg')} style={styles.logo} />
      <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
  );

export default function Sign() {
  const navigation = useNavigation();
    return(
        <View style={styles.container}>
            
           <GestureHandlerRootView>
            <ScrollView style={styles.scrollView}>
            <Head/>
            <Text style={styles.title}>liste des surveillants</Text>
          
          {surveillants.map(( item ) =>(
                <View style={styles.card} key={item.id}>
                  <Text style={styles.cardText}>{item.numero_immatriculation}</Text>
                  <View style={styles.contenu}>
                  <Text style={styles.cardText}>{item.nom_complet}</Text>
                  <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('SignatureScreen')} >
                    <Text style={styles.buttonText}>signer</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              ))}
            
                 <TouchableOpacity style={styles.button1} >
                    <Text style={styles.buttonText}>liste des reservistes</Text>
                 </TouchableOpacity>
            </ScrollView>
            </GestureHandlerRootView>
            </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
      scrollView: {
        marginBottom: 60,
        marginTop:10,
      },
      headContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 5, 
      },
      logo: {
        height: 50,
        width: 120,
      },
      year: {
        fontSize:13,
        marginLeft:110,
        marginTop:20,
      },
      title: {
        fontSize: 20,
        color: 'black',
        paddingTop: 50,
        fontWeight:'bold',
        alignSelf:'center'
      },
      card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        margin:10,
      },
      contenu:{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
      },
      cardText: {
          flex: 1,
      marginRight: 16,
        fontSize: 13,
      },
      button: {
        flexDirection: 'row',
        backgroundColor: '#01579b', 
        padding: 5,
        borderRadius: 5,
        marginTop: 14,
        marginLeft:5,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
      },
      button1: {
        backgroundColor: '#01579b', 
        padding: 5,
        borderRadius: 5,
        margin: 14,
        marginRight:200,

      },
    })