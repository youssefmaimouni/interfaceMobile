import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Scanner,SignatureStack,RapportStack ,Acceuil,Etudiants} from './navigation';
import {Entypo , MaterialCommunityIcons,FontAwesome5 ,FontAwesome ,Fontisto} from '@expo/vector-icons';
import { View,Text, Button,StyleSheet, TouchableOpacity, ImageComponent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { createContext, useState, useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EtudiantsProvider } from './navigation/dataScreen';





const Tab = createBottomTabNavigator();
const seance='seance 1';






export default function Seance1() {
  const [listeEtudiants,setListeEtudiants]=useState([
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
    "code-apogée": 54321,
    "nom": "Bouazzaoui",
    "prénom": "Mohammed",
    "numéro-exam": 2,
    "CNE": "654321",
    "photo": "http://www.fsac.ac.ma/photo/xyzzy",
    "id_rapport": 2,
    "estPerson": false
  },
  {
    "code-apogée": 67890,
    "nom": "Fassi",
    "prénom": "Nawal",
    "numéro-exam": 3,
    "CNE": "987654",
    "photo": "http://www.fsac.ac.ma/photo/pqrst",
    "id_rapport": 3,
    "estPerson": false
  },
  {
    "code-apogée": 45678,
    "nom": "El Harrak",
    "prénom": "Youssef",
    "numéro-exam": 4,
    "CNE": "456789",
    "photo": "http://www.fsac.ac.ma/photo/lmnop",
    "id_rapport": null,
    "estPerson": false
  },
  {
    "code-apogée": 98765,
    "nom": "Benchekroun",
    "prénom": "Khadija",
    "numéro-exam": 5,
    "CNE": "987654",
    "photo": "http://www.fsac.ac.ma/photo/defgh",
    "id_rapport": 5,
    "estPerson": false
  },
  {
    "code-apogée": 23456,
    "nom": "El Khattabi",
    "prénom": "Ahmed",
    "numéro-exam": 6,
    "CNE": "234567",
    "photo": "http://www.fsac.ac.ma/photo/ghijk",
    "id_rapport": 6,
    "estPerson": false
  },
  {
    "code-apogée": 34567,
    "nom": "Chraibi",
    "prénom": "Amina",
    "numéro-exam": 7,
    "CNE": "345678",
    "photo": "http://www.fsac.ac.ma/photo/abcde",
    "id_rapport": 7,
    "estPerson": false
  },
  {
    "code-apogée": 87654,
    "nom": "El Amine",
    "prénom": "Omar",
    "numéro-exam": 8,
    "CNE": "876543",
    "photo": "http://www.fsac.ac.ma/photo/jklmn",
    "id_rapport": 8,
    "estPerson": false
  },
  {
    "code-apogée": 98764,
    "nom": "Tazi",
    "prénom": "Salma",
    "numéro-exam": 9,
    "CNE": "987655",
    "photo": "http://www.fsac.ac.ma/photo/mnopq",
    "id_rapport": 9,
    "estPerson": false
  },
  {
    "code-apogée": 76543,
    "nom": "El Khadir",
    "prénom": "Mohamed",
    "numéro-exam": 10,
    "CNE": "765432",
    "photo": "http://www.fsac.ac.ma/photo/qrsuv",
    "id_rapport": 10,
    "estPerson": false
  },
  {
    "code-apogée": 23456,
    "nom": "Lahlou",
    "prénom": "Fadwa",
    "numéro-exam": 11,
    "CNE": "654321",
    "photo": "http://www.fsac.ac.ma/photo/tuvwx",
    "id_rapport": 11,
    "estPerson": false
  },
  {
    "code-apogée": 54321,
    "nom": "Bounou",
    "prénom": "Houda",
    "numéro-exam": 12,
    "CNE": "543219",
    "photo": "http://www.fsac.ac.ma/photo/efghi",
    "id_rapport": 12,
    "estPerson": false
  },
  {
    "code-apogée": 23456,
    "nom": "Hassani",
    "prénom": "Othmane",
    "numéro-exam": 13,
    "CNE": "234567",
    "photo": "http://www.fsac.ac.ma/photo/ijklm",
    "id_rapport": 13,
    "estPerson": false
  },
  {
    "code-apogée": 43219,
    "nom": "Ezzahraoui",
    "prénom": "Sanaa",
    "numéro-exam": 14,
    "CNE": "432198",
    "photo": "http://www.fsac.ac.ma/photo/mnopq",
    "id_rapport": 14,
    "estPerson": false
  },
  {
    "code-apogée": 98765,
    "nom": "El Hadri",
    "prénom": "Fatima Zahra",
    "numéro-exam": 15,
    "CNE": "321987",
    "photo": "http://www.fsac.ac.ma/photo/xyzzy",
    "id_rapport": 15,
    "estPerson": false
  },
  {
    "code-apogée": 87654,
    "nom": "El Ghazi",
    "prénom": "Yasmine",
    "numéro-exam": 16,
    "CNE": "876543",
    "photo": "http://www.fsac.ac.ma/photo/uvwxy",
    "id_rapport": 16,
    "estPerson": false
  },
  {
    "code-apogée": 98769,
    "nom": "Essaadi",
    "prénom": "Youssef",
    "numéro-exam": 17,
    "CNE": "987656",
    "photo": "http://www.fsac.ac.ma/photo/qrsuv",
    "id_rapport": 17,
    "estPerson": false
  },
  {
    "code-apogée": 87654,
    "nom": "El Mekki",
    "prénom": "Sara",
    "numéro-exam": 18,
    "CNE": "876543",
    "photo": "http://www.fsac.ac.ma/photo/ghijk",
    "id_rapport": 18,
    "estPerson": false
  },
  {
    "code-apogée": 12345,
    "nom": "El Jazouli",
    "prénom": "Mehdi",
    "numéro-exam": 19,
    "CNE": "987649",
    "photo": "http://www.fsac.ac.ma/photo/abcde",
    "id_rapport": 19,
    "estPerson": false
  },
  {
    "code-apogée": 98765,
    "nom": "El Fassi",
    "prénom": "Nada",
    "numéro-exam": 20,
    "CNE": "876543",
    "photo": "http://www.fsac.ac.ma/photo/fghij",
    "id_rapport": 20,
    "estPerson": false
  }
]);
    const navigation=useNavigation();
  return (<View style={styles.page}>
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
         <EtudiantsProvider listeEtudiants={listeEtudiants} setListeEtudiants={setListeEtudiants}>
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
                backgroundColor:'#f5f5f5',
                borderTopWidth:1,
                borderColor:'#78909c'
       }})
     }
    initialRouteName='Acceuil'>
         <Tab.Screen name='RapportStack' component={RapportStack} options={{
            tabBarIcon:({focused})=>{
                return(
                    
                    <View style={[focused ? styles.focused : styles.nonfocused]}>
                     <FontAwesome name={focused ? "file-text" : "file-text-o"} size={focused ? 30 : 24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />               
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
                   <MaterialCommunityIcons name="qrcode-scan" size={focused ? 30 : 24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />
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
             component={Etudiants}
             initialParams={{seance}}
             options={{
                  tabBarIcon:({focused})=>{
                      return(
                          
                          <View style={[focused ? styles.focused : styles.nonfocused]} >
                        <Fontisto name="persons" size={focused ? 30 : 24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />
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
                    
                    <FontAwesome5 name="signature" size={focused ? 30 : 24}  style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}/>
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
        backgroundColor:'#b0bec5',
        padding: 10,
        flex:2
      },
      buttons2: {
        alignSelf: 'flex-start',
        backgroundColor:'#5B8BCE',
        padding: 10,
        flex:2
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
    },
    focused:{
        alignItems:"center" ,
        justifyContent:"center",
        height :64,
        width :64,
        backgroundColor:'#8AABF7',
        borderRadius:40 ,
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
        color:'#B6DEF6',
    }
})