import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Scanner,SignatureStack,RapportStack ,Acceuil} from './navigation';
import EtudiantStack from './navigation/EtudiantStack';
import {Entypo , MaterialCommunityIcons,FontAwesome5 ,FontAwesome ,Fontisto} from '@expo/vector-icons';
import { View,Text, Button,StyleSheet, TouchableOpacity, ImageComponent, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { createContext, useState, useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EtudiantsProvider } from './navigation/dataScreen';





const Tab = createBottomTabNavigator();
const seance='seance 1';






export default function Seance1() {
  const [listeEtudiants,setListeEtudiants]=useState( [
    {
      "code-apogée": 12345,
      "nom": "El Amrani",
      "prénom": "Fatima",
      "numéro-exam": 1,
      "CNE": "123456",
      "photo": "http://www.fsac.ac.ma/photo/abcde",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 12346,
      "nom": "Ben Salah",
      "prénom": "Ahmed",
      "numéro-exam": 2,
      "CNE": "654321",
      "photo": "http://www.fsac.ac.ma/photo/ahmed",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 12347,
      "nom": "Haddad",
      "prénom": "Sara",
      "numéro-exam": 3,
      "CNE": "789012",
      "photo": "http://www.fsac.ac.ma/photo/sara",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 12348,
      "nom": "Omar",
      "prénom": "Mehdi",
      "numéro-exam": 4,
      "CNE": "345678",
      "photo": "http://www.fsac.ac.ma/photo/mehdi",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 12349,
      "nom": "El Bouzidi",
      "prénom": "Nour",
      "numéro-exam": 5,
      "CNE": "901234",
      "photo": "http://www.fsac.ac.ma/photo/nour",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 12350,
      "nom": "Mouhssine",
      "prénom": "Ali",
      "numéro-exam": 6,
      "CNE": "567890",
      "photo": "http://www.fsac.ac.ma/photo/ali",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 12351,
      "nom": "Lamrani",
      "prénom": "Leila",
      "numéro-exam": 7,
      "CNE": "234567",
      "photo": "http://www.fsac.ac.ma/photo/leila",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 12352,
      "nom": "Saidi",
      "prénom": "Khalid",
      "numéro-exam": 8,
      "CNE": "876543",
      "photo": "http://www.fsac.ac.ma/photo/khalid",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 12353,
      "nom": "Zahraoui",
      "prénom": "Yasmina",
      "numéro-exam": 9,
      "CNE": "345678",
      "photo": "http://www.fsac.ac.ma/photo/yasmina",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 12354,
      "nom": "El Idrissi",
      "prénom": "Mohammed",
      "numéro-exam": 10,
      "CNE": "112233",
      "photo": "http://www.fsac.ac.ma/photo/mohammed",
      "id_rapport": null,
      "estPerson": false
    }
  ]);
const [listeRapport,setListeRapport]=useState([
  {
    "id": 1,
    "titre": "Analyse des cas de fraude en mathématiques",
    "nom": "Alice Johnson"
  },
  {
    "id": 2,
    "titre": "Étude de la fraude en sciences informatiques",
    "nom": "Maxime Dubois"
  },
  {
    "id": 3,
    "titre": "Examen des tactiques de tricherie en physique",
    "nom": "Sophie Martin"
  },
  {
    "id": 4,
    "titre": "Analyse des incidents de fraude en biologie",
    "nom": "Thomas Leroy"
  },
  {
    "id": 5,
    "titre": "Étude des stratégies de tricherie en chimie",
    "nom": "Eva Garcia"
  },
  {
    "id": 6,
    "titre": "Analyse des fraudes en sciences sociales",
    "nom": "Lucas Bernard"
  },
  {
    "id": 7,
    "titre": "Examen des tactiques de tricherie en langues étrangères",
    "nom": "Léa Petit"
  },
  {
    "id": 8,
    "titre": "Analyse des incidents de fraude en histoire",
    "nom": "Hugo Dupont"
  },
  {
    "id": 9,
    "titre": "Étude des stratégies de tricherie en géographie",
    "nom": "Camille Lambert"
  },
  {
    "id": 10,
    "titre": "Examen des tactiques de tricherie en philosophie",
    "nom": "Louis Moreau"
  },
  {
    "id": 11,
    "titre": "Analyse des fraudes en littérature",
    "nom": "Amélie Rousseau"
  },
  {
    "id": 12,
    "titre": "Étude des incidents de fraude en économie",
    "nom": "David Martin"
  },
  {
    "id": 13,
    "titre": "Examen des tactiques de tricherie en psychologie",
    "nom": "Juliette Lefèvre"
  },
  {
    "id": 14,
    "titre": "Analyse des fraudes en arts visuels",
    "nom": "Gabriel Duval"
  },
  {
    "id": 15,
    "titre": "Étude des stratégies de tricherie en musique",
    "nom": "Manon Girard"
  },
  {
    "id": 16,
    "titre": "Examen des tactiques de tricherie en éducation physique",
    "nom": "Théo Laurent"
  },
  {
    "id": 17,
    "titre": "Analyse des incidents de fraude en éducation civique",
    "nom": "Clara Bonnet"
  },
  {
    "id": 18,
    "titre": "Étude des stratégies de tricherie en technologie",
    "nom": "Antoine Lefebvre"
  },
  {
    "id": 19,
    "titre": "Examen des tactiques de tricherie en études religieuses",
    "nom": "Emma Rousseau"
  },
  {
    "id": 20,
    "titre": "Analyse des fraudes en sciences de l'environnement",
    "nom": "Noémie Garcia"
  }
]
);
    const navigation=useNavigation();
    
  return (<View style={styles.page}>
    <StatusBar />
        <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttons1}
          onPress={()=>navigation.navigate("Seance1")} 
        >
          <Text style={styles.buttonTexts1}>Seance 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons2}
          onPress={()=>navigation.navigate("Seance2")}
        >
          <Text style={styles.buttonTexts2}>Seance 2</Text>
        </TouchableOpacity>
         </View>
         <EtudiantsProvider listeEtudiants={listeEtudiants} setListeEtudiants={setListeEtudiants} listeRapport={listeRapport} setListeRapport={setListeRapport}>
         <Tab.Navigator screenOptions={({root}) => ({
            tabBarShowLabel:false,
            headerShown:false,
            tabBarStyle:{
                position:'absolute',
                height:68,
                bottom:0,
                right:0,
                left:0,
                elevation:0,
                borderRadius:5,
                backgroundColor:'#d1dbe4',
                borderTopWidth:1,
                borderColor:'#a3b7ca'
       }})
     }
    initialRouteName='Acceuil'>
         <Tab.Screen name='RapportStack' component={RapportStack} options={{
            tabBarIcon:({focused})=>{
                return(
                    
                    <View style={[focused ? styles.focused : styles.nonfocused]}>
                     <FontAwesome name={focused ? "file-text" : "file-text-o"} size={focused ? 35 : 24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />               
                     {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Rapp</Text>}
                </View>
                )
            }
        }}/>
        <Tab.Screen name='Scanner' component={Scanner} initialParams={{seance}}
        options={{
            tabBarIcon:({focused})=>{
              return(

                <View style={[focused ? styles.focused : styles.nonfocused]} >
                   <MaterialCommunityIcons name="qrcode-scan" size={focused ? 35 : 24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />
                   {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Scanner</Text>}
                </View>
                )
            }
        }}/>
        <Tab.Screen name='Acceuil'
       component={Acceuil}
       initialParams={{seance}}
       options={{
           tabBarIcon:({focused})=>{
             return(

               <View style={[focused ? styles.focused : styles.nonfocused]} >
                   <Ionicons name={focused ? "home": "home-outline"} size={focused ? 35 : 24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />
                   {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Acceuil</Text>}
               </View>
               )
           }
       }}
        />
             <Tab.Screen name='Etudiants' 
             component={EtudiantStack}
             initialParams={{seance}}
             options={{
                  tabBarIcon:({focused})=>{
                      return(
                          
                          <View style={[focused ? styles.focused : styles.nonfocused]} >
                        <Fontisto name="persons" size={focused ? 35 : 24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />
                        {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Etudiants</Text>}
                     </View>
                     )
                 }
             }}
             />
         <Tab.Screen name='SignatureStack' component={SignatureStack} options={{
            tabBarIcon:({focused})=>{
              return(

                <View style={[focused ? styles.focused : styles.nonfocused]} >
                    
                    <FontAwesome5 name="signature" size={focused ? 35 : 24}  style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}/>
                    {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Signature</Text>}
                </View>
                )
            }
        }}/>
         
      

     </Tab.Navigator> 
     </EtudiantsProvider>
    </View>
    
  );
}

const styles=StyleSheet.create({
    page:{
      
        flex:1,
        backgroundColor:'#fff'
    },
    buttons1: {
        alignSelf: 'flex-start',
        backgroundColor:'#d1dbe4',
        padding: 10,
        flex:2,
        
      },
      buttons2: {
        alignSelf: 'flex-start',
        backgroundColor:'#7593af',
        padding: 10,
        flex:2,
        borderRadius:20,
        margin:2,
        
      },
      buttonTexts1: {
        color: '#90a4ae',
        fontWeight:'bold'
    },
    buttonTexts2: {
        color: '#455a64',
        fontWeight:'bold'
      },
    container:{
        flexDirection:'row',
        backgroundColor:'#d1dbe4',
    },
    focused:{
        alignItems:"center" ,
        justifyContent:"center",
        height :64,
        width :64,
        marginBottom:3,
        
    },
    nonfocused:{
        alignItems:"center" ,
        justifyContent:"center",
        height :60,
        width :60,
        
    },
    colorIconFocus:{
        color:'#546e7a',
    },
    colorIconNonFocus:{
        color:'#a3b7ca',
    }
})