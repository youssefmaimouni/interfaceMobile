import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, ScrollView, TextInput } from 'react-native-gesture-handler';

const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('../logofsac.jpeg')} style={styles.logo} />
      <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
  );
export default function AddRapp() {
    const [titre,setTitre]=useState('');
    const changeHandler=(val)=>{
        setTitre(val);
    }
    return (
        <View style={styles.container}>
            
           <GestureHandlerRootView>
            <ScrollView style={styles.scrollView}>
            <Head/>
            <Text style={styles.title}>Rapport</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.textbutton} >selectionner un étudiant</Text>
            </TouchableOpacity>
            <TextInput
            style={styles.input}
            placeholder='titre du rapport'
            onChangeText={(val)=>changeHandler(val)}
            />
            <TextInput
            style={styles.multilinetext} 
            placeholder='contenu'
            multiline
            />
            <TouchableOpacity style={styles.button1}>
                <Text style={styles.textbutton}>soumettre</Text>
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
        paddingTop: 50,
      },
      scrollView: {
        marginBottom: 60,
        marginTop: 20,
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
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        padding: 20,
      },
      button: {
        backgroundColor: 'blue',
        paddingVertical: 8, // Ajustement pour un meilleur aspect
        paddingHorizontal: 20, // Ajustement pour un meilleur aspect
        borderRadius: 5,
        alignSelf: 'center', // Aligner au centre horizontalement
        marginTop: 14,
        marginBottom: 10, // Ajustement pour un meilleur aspect
        marginRight:200,
      },
      textbutton: {
        fontSize: 13,
        color: 'white',
      },
      input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginHorizontal: 10, // Ajustement horizontal
      },
      multilinetext: {
        minHeight: 200,
        borderWidth: 1,
        padding: 10,
        margin: 12,
      },
      button1: {
        backgroundColor: 'blue',
        paddingVertical: 8,
        paddingHorizontal: 20, 
        borderRadius: 5,
        marginTop: 14,
        marginBottom: 10, 
        marginLeft:250,
        marginRight:25,
      },
        });