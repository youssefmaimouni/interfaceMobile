import { View,Text, StyleSheet,Image, ScrollView, Button } from 'react-native';
import { useEtudiants } from './dataScreen';

const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('./logofsac.jpeg')} style={styles.logo} />
    </View>
  );
export default function Acceuil({route}) {
  const {seance}=route.params;
    return(
        <View style={styles.container}>
       
            <Text style={styles.text}>Acceuil</Text>
            <View style={styles.card}>
                 <Head />
                 <Text >Année universitaire ____-____</Text>
                <Text>module :</Text>
                <Text>seance :{seance}</Text>
                <Text>demi_journée:</Text>
                <Text> durée:</Text>
                <Text> local:</Text>
            </View>
        </View>
    )
}

const  styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
    },  card: {
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
        height:300,
        width:300
      },text:{
        marginTop:10,
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