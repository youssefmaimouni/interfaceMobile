import React from 'react';
import { View,Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import surveillants from './surveillant.json';  

const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('./logofsac.jpeg')} style={styles.logo} />
      <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
  );

export default function Signature() {
    return(
        <View style={styles.container}>
            
           <GestureHandlerRootView>
            <ScrollView style={styles.scrollView}>
            <Head/>
            <Text style={styles.title}>liste des surveillants</Text>
            <FlatList
            data={surveillants}
            renderItem={({ item }) => {
              return (
                <View style={styles.card} key={item.id}>
                  <Text style={styles.cardText}>{item.numero_immatriculation}</Text>
                  <View style={styles.contenu}>
                  <Text style={styles.cardText}>{item.nom_complet}</Text>
                  <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>signer</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => item.id.toString()}
          />
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
        paddingTop: 5,
      },
      scrollView: {
        marginBottom: 60,
       
        paddingHorizontal: 10, // Ajout pour éviter les débordements horizontaux
      },
      headContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 5, // Ajustement de la marge
      },
      logo: {
        height: 50,
        width: 120,
      },
      year: {
        fontSize: 13,
        marginLeft: 10, // Ajustement de la marge
        marginTop: 20,
        marginLeft:50,
      },
      title: {
        fontSize: 20,
        color: 'black',
        paddingTop: 50,
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
        backgroundColor: 'blue', 
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
        backgroundColor: 'blue', 
        padding: 5,
        borderRadius: 5,
        margin: 14,
        marginRight:200,

      },
    })