import react from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Initial() {
   const navigation = useNavigation();
   const image = require('./bgg.jpeg');
     return(
      <ImageBackground source={image} style={styles.container}>
         <View style={{backgroundColor:'#fff',marginTop:'40%',flex:1,borderTopRightRadius:30,borderTopLeftRadius:30}}>

        
       <Text style={styles.textprin}>Bienvenue sur notre Application de Gestion des Présences!</Text>
       <Text style={styles.text}>
          Cette application innovante, conçue pour les établissements d'enseignement supérieur, 
          révolutionne la gestion des présences durant les examens grâce à la technologie de scan de QR codes. 
          Développée par des étudiants de l'Université Hassan II de Casablanca, 
          cette solution permet un enregistrement rapide et précis des présences,
          améliorant l'efficacité du processus et réduisant les erreurs administratives.
          Avec une interface conviviale et des fonctionnalités avancées,
          notre application assure une expérience fluide tant pour les surveillants que pour l'administration,
          facilitant une gestion efficace des présences en temps réel.
          Embarquez dans l'ère de la digitalisation avec nous et optimisez la gestion des présences lors de vos examens!
       </Text>     
       <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Home')}>
         <Text style={styles.textbutton}>commencer</Text>
       </TouchableOpacity>
      </View>
      </ImageBackground>
     );}
     const styles = StyleSheet.create({
     container : {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
     },
     textprin:{
        fontSize: 30,
        fontWeight: 'bold', 
        color: 'black',
        textAlign: 'center', 
        padding:30,
        marginTop:10
        
     },
     text:{
        
        marginLeft:20,
          fontSize: 13,
          marginRight:20,
          marginTop:10,
          color:'#373A40'
     },
     button:{
        marginTop:50,
        backgroundColor: '#238AF5', 
        borderRadius: 20,
        padding:5,
        width: 300,
        alignSelf:'center',
     },
     textbutton:{
        color: 'white',
        textAlign: 'center',
        padding:2,
        fontSize:20,
     }
}
  )
