import { View,Text, StyleSheet,Image, ScrollView, Button, ImageBackground } from 'react-native';
import { useEtudiants } from './dataScreen';

const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('./logofsac.jpeg')} style={styles.logo} />
    </View>
  );
export default function Acceuil({route}) {
  const image = require('./back2.jpeg'); 
  const {seance}=route.params;
    return(
      <ImageBackground   source={image} resizeMode="cover" style={styles.image}>
            <View style={styles.card}>
                 <Head />
                 <View style={styles.con}>
                <Text >Année universitaire ____-____</Text>
                <Text>module :</Text>
                <Text>seance :{seance}</Text>
                <Text>demi_journée:</Text>
                <Text> local:</Text>
                </View>
            </View>
      </ImageBackground>

    )
}

const  styles=StyleSheet.create({
    image:{
        flex:1,
        justifyContent:'center',
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
      },
})