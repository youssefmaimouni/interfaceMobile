import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Rapp, Scanner, Signature ,Acceuil,Etudiants} from './navigation';
import {Entypo , MaterialCommunityIcons,FontAwesome5 ,FontAwesome ,Fontisto} from '@expo/vector-icons';
import { View,Text, Button,StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';



const Tab = createBottomTabNavigator();


export default function Seance2() {
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
         <Tab.Screen name='Rapport' component={Rapp} options={{
            tabBarIcon:({focused})=>{
                return(
                    
                    <View style={[focused ? styles.focused : styles.nonfocused]}>
                     <FontAwesome name="file-text-o" size={24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />               
                     {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Rapp</Text>}
                </View>
                )
            }
        }}/>
        <Tab.Screen name='Scanner' component={Scanner} options={{
            tabBarIcon:({focused})=>{
              return(

                <View style={[focused ? styles.focused : styles.nonfocused]} >
                   <MaterialCommunityIcons name="qrcode-scan" size={24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />
                   {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Scanner</Text>}
                </View>
                )
            }
        }}/>
        <Tab.Screen name='Acceuil'
       component={Acceuil}
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
                    
                    <FontAwesome5 name="signature" size={24}  style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}/>
                    {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Signature</Text>}
                </View>
                )
            }
        }}/>
         
      

     </Tab.Navigator> 
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
      height :65,
      width :65,
      backgroundColor:'#8AABF7',
      borderRadius:40 ,
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