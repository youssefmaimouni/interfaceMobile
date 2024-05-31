import { View,Text, StyleSheet,Image, ScrollView, Button, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useEtudiants } from './dataScreen';
import { useNavigation } from '@react-navigation/native';

const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('./logofsac.jpeg')} style={styles.logo} />
    </View>
  );
export default function Acceuil({route}) {
  const image = require('../bg4.jpg');
  const navigation=useNavigation(); 
  const {seance}=route.params;
  const showAlertWithAction = () => {
    Alert.alert(
      "Attention",  
      "Si vous naviguez vers la Séance 2, vous ne pourrez pas retourner.", 
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => handleOKPress(),  // Action on pressing OK
        }
      ],
      { cancelable: false }  // This prevents the alert from being dismissed by tapping outside of it
    );
  };
  
  const handleOKPress = () => {
    console.log("OK Pressed");
    navigation.navigate("Seance2");
  };
  const handleOKPress2 = () => {
    console.log("OK 2");
    navigation.navigate("EnvoiDeDonneer");
  };
  const FinExame=()=>{
    Alert.alert(
      "Attention",  
      "Si vous terminer la seance, vous ne pourrez pas retourner.", 
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => handleOKPress2(),  // Action on pressing OK
        }
      ],
      { cancelable: false }  // This prevents the alert from being dismissed by tapping outside of it
    );
  }
  
    return(
      <ImageBackground    resizeMode="cover" style={styles.image}>
            <View style={styles.card}>
                 <Head />
                 <View style={styles.con}>
                <Text >Année universitaire ____-____</Text>
                <Text>module :</Text>
                <Text>seance :{seance}</Text>
                <Text>demi_journée:</Text>
                <Text> local:</Text>
                {seance=='seance1'&&<TouchableOpacity onPress={showAlertWithAction} style={styles.button}>
                  <Text style={{color:'#fff'}}>Seance 2</Text>
                </TouchableOpacity>}
                {seance=='seance2'&&<TouchableOpacity onPress={FinExame} style={styles.button}>
                  <Text style={{color:'#fff'}}>fin d'examen</Text>
                </TouchableOpacity>}
                </View>
            </View>
      </ImageBackground>

    )
}

const  styles=StyleSheet.create({
    image:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#E1E7E7'
    }, 
    con:{
       marginTop:100,
    },
     card: {
        margin: 10,
        alignSelf:'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height:400,
        width:350
      },text:{
        marginTop:100,
        alignSelf:'center',
        fontSize: 20,
        fontWeight: 'bold',
      },headContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 5, 
        marginBottom:20,
        alignSelf:'center'
      },
      logo: {
        height: 50,
        width: 120,
        marginLeft:10,
      },
      year: {
        fontSize: 13,
        marginLeft: 10, 
        marginTop: 20,
        marginLeft:40,
      },button:{
        marginTop:50,
        padding:6,
        width:200,
        backgroundColor:'#476f95',
        alignSelf:'center',
        alignItems:'center',
        borderRadius:10
      }
})