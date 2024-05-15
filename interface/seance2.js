import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Scanner,Acceuil,Etudiants} from './navigation';
import RapportStack from './navigation/rapport/RapportStack';
import SignatureStack from './navigation/signaturerep/signatureStack';
import {Entypo , MaterialCommunityIcons,FontAwesome5 ,FontAwesome ,Fontisto} from '@expo/vector-icons';
import { View,Text, Button,StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EtudiantsProvider } from './navigation/dataScreen';




const Tab = createBottomTabNavigator();
const seance='seance 2';



export default function Seance2() {
  const [listeEtudiants,setListeEtudiants]=useState([
    {
      "code-apogée": 10001,
      "nom": "Ait Hamou",
      "prénom": "Karim",
      "numéro-exam": 1,
      "CNE": "100021",
      "photo": "http://www.fsac.ac.ma/photo/abcde1",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10002,
      "nom": "Benkiran",
      "prénom": "Laila",
      "numéro-exam": 2,
      "CNE": "100022",
      "photo": "http://www.fsac.ac.ma/photo/abcde2",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10003,
      "nom": "Chraibi",
      "prénom": "Amal",
      "numéro-exam": 3,
      "CNE": "100023",
      "photo": "http://www.fsac.ac.ma/photo/abcde3",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10004,
      "nom": "Doukkali",
      "prénom": "Yassine",
      "numéro-exam": 4,
      "CNE": "100024",
      "photo": "http://www.fsac.ac.ma/photo/abcde4",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10005,
      "nom": "Essaadi",
      "prénom": "Fatima",
      "numéro-exam": 5,
      "CNE": "100025",
      "photo": "http://www.fsac.ac.ma/photo/abcde5",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10006,
      "nom": "Fassi",
      "prénom": "Sofia",
      "numéro-exam": 6,
      "CNE": "100026",
      "photo": "http://www.fsac.ac.ma/photo/abcde6",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10007,
      "nom": "Guennoun",
      "prénom": "Mohamed",
      "numéro-exam": 7,
      "CNE": "100027",
      "photo": "http://www.fsac.ac.ma/photo/abcde7",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10008,
      "nom": "Haddad",
      "prénom": "Omar",
      "numéro-exam": 8,
      "CNE": "100028",
      "photo": "http://www.fsac.ac.ma/photo/abcde8",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10009,
      "nom": "Ihssane",
      "prénom": "Imane",
      "numéro-exam": 9,
      "CNE": "100029",
      "photo": "http://www.fsac.ac.ma/photo/abcde9",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10010,
      "nom": "Jabri",
      "prénom": "Ali",
      "numéro-exam": 10,
      "CNE": "100030",
      "photo": "http://www.fsac.ac.ma/photo/abcde10",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10011,
      "nom": "Kabbaj",
      "prénom": "Sara",
      "numéro-exam": 11,
      "CNE": "100031",
      "photo": "http://www.fsac.ac.ma/photo/abcde11",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10012,
      "nom": "Lahmadi",
      "prénom": "Jamal",
      "numéro-exam": 12,
      "CNE": "100032",
      "photo": "http://www.fsac.ac.ma/photo/abcde12",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10013,
      "nom": "Maaroufi",
      "prénom": "Khalid",
      "numéro-exam": 13,
      "CNE": "100033",
      "photo": "http://www.fsac.ac.ma/photo/abcde13",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10014,
      "nom": "Naciri",
      "prénom": "Loubna",
      "numéro-exam": 14,
      "CNE": "100034",
      "photo": "http://www.fsac.ac.ma/photo/abcde14",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10015,
      "nom": "Ouazzani",
      "prénom": "Hassan",
      "numéro-exam": 15,
      "CNE": "100035",
      "photo": "http://www.fsac.ac.ma/photo/abcde15",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10016,
      "nom": "Qotbi",
      "prénom": "Rachid",
      "numéro-exam": 16,
      "CNE": "100036",
      "photo": "http://www.fsac.ac.ma/photo/abcde16",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10017,
      "nom": "Rahmouni",
      "prénom": "Ilham",
      "numéro-exam": 17,
      "CNE": "100037",
      "photo": "http://www.fsac.ac.ma/photo/abcde17",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10018,
      "nom": "Saadi",
      "prénom": "Youssef",
      "numéro-exam": 18,
      "CNE": "100038",
      "photo": "http://www.fsac.ac.ma/photo/abcde18",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10019,
      "nom": "Tazi",
      "prénom": "Nora",
      "numéro-exam": 19,
      "CNE": "100039",
      "photo": "http://www.fsac.ac.ma/photo/abcde19",
      "id_rapport": null,
      "estPerson": false
    },
    {
      "code-apogée": 10020,
      "nom": "Uzziel",
      "prénom": "Imane",
      "numéro-exam": 20,
      "CNE": "100040",
      "photo": "http://www.fsac.ac.ma/photo/abcde20",
      "id_rapport": null,
      "estPerson": false
    }
  ]
  );
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
  initialRouteName='Acceuil'
  data={'seance1'}
  >
       <Tab.Screen name='Rapport' component={Rapp} initialParams={{seance}} options={{
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
                   <Entypo name='home' size={24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />
                   {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Acceuil</Text>}
               </View>
               )
           }
       }}
        />
             <Tab.Screen name='Etudiants' component={Etudiants} options={{
                  tabBarIcon:({focused})=>{
                      return(
                          
                          <View style={[focused ? styles.focused : styles.nonfocused]} >
                        <Fontisto name="persons" size={24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />
                        {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Etudiants</Text>}
                     </View>
                     )
                 }
             }}
             />
         <Tab.Screen name='Signature' component={Signature} options={{
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
    buttons2: {
      alignSelf: 'flex-start',
      backgroundColor:'#b0bec5',
      padding: 10,
      flex:2
      },
      buttons1: {
        alignSelf: 'flex-start',
        backgroundColor:'#5B8BCE',
        padding: 10,
        flex:2
      },
      buttonTexts2: {
        color: '#90a4ae',
        fontWeight:'bold'
    },
    buttonTexts1: {
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