import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
//import { Rapp, Scanner, Signature ,Acceuil,Etudiants} from './interface/navigation/indexe';
import {Entypo} from '@expo/vector-icons';
import { View,Text } from 'react-native';
import Acceuil from './interface/navigation/Acceuil';
import Etudiants from './interface/navigation/Etudiants';
import Rapp from './interface/navigation/Rapp';
import Signature from './interface/navigation/Scanner';
import { Scanner } from './interface/navigation';
import PV from './interface/PV';


const Tab = createBottomTabNavigator();
const screenOptions={
    tabBarShowLabel:true,
    headerShown:true,
       tabBarStyle:{
           position:'absolute',
           height:60,
           bottom:0,
           right:0,
           left:0,
           elevation:0,
           borderBottomLeftRadius:16,
           background:'#fff',
           borderTopWidth:1,
       }
}

export default function App() {
  return (
    <PV />
    // <NavigationContainer>
    //      <Tab.Navigator screenOptions={screenOptions}>
      
          
    //      <Tab.Screen name='Acceuil'
    //     component={Acceuil}
    //     options={{
    //         tabBarIcon:({focused})=>{
    //           return(

    //             <View style={{alignItems:"center" ,justifyContent:"center" }} >
    //                 <Entypo name='home' size={24} color="black" />
    //                 <Text>Home</Text>
    //             </View>
    //             )
    //         }
    //     }}
    //      />
    //      <Tab.Screen name='Etudiants' component={Etudiants} options={{
    //         tabBarIcon:({focused})=>{
    //           return(

    //             <View style={{alignItems:"center" ,justifyContent:"center" }} >
    //                 <Entypo name='home' size={24} color="black" />
    //                 <Text>Etudiants</Text>
    //             </View>
    //             )
    //         }
    //     }} />
    //     <Tab.Screen name='Rapport' component={Rapp} options={{
    //         tabBarIcon:({focused})=>{
    //           return(

    //             <View style={{alignItems:"center" ,justifyContent:"center" }} >
    //                 <Entypo name='home' size={24} color="black" />
    //                 <Text>Rapp</Text>
    //             </View>
    //             )
    //         }
    //     }}/>
    //      <Tab.Screen name='Signature' component={Signature} options={{
    //         tabBarIcon:({focused})=>{
    //           return(

    //             <View style={{alignItems:"center" ,justifyContent:"center" }} >
    //                 <Entypo name='home' size={24} color="black" />
    //                 <Text>Signature</Text>
    //             </View>
    //             )
    //         }
    //     }}/>
    //      <Tab.Screen name='Scanner' component={Scanner} options={{
    //         tabBarIcon:({focused})=>{
    //           return(

    //             <View style={{alignItems:"center" ,justifyContent:"center" }} >
    //                 <Entypo name='home' size={24} color="black" />
    //                 <Text>Scanner</Text>
    //             </View>
    //             )
    //         }
    //     }}/>
      

    //  </Tab.Navigator> 
    // </NavigationContainer>
    
  );
}

