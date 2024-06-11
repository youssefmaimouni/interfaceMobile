import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';


const EnvoiDeDonneer=()=>{
    const ipAdress='192.168.245.241';

    const associer = async () => {
        const pv={
            "rapports":[
                    {
          "titre_rapport": "qwertz",
          "contenu": "dlddjldjd",
          "id_pv": "1",
          "codeApogee": "2222"
        },{
          "titre_rapport": "siosos",
          "contenu": "sskskks",
          "id_pv": "1",
          "codeApogee": "2222"
        }
            ],
            "passers":[
          {
            "id_examen": 1,
            "id_local": 1,
            "codeApogee": 333,
            "isPresent": true,
            "num_exam": 1,
            "created_at": "2024-05-30T22:55:00.000000Z",
            "updated_at": "2024-05-30T22:55:00.000000Z"
          },
          {
            "id_examen": 1,
            "id_local": 1,
            "codeApogee": 1111,
            "isPresent": true,
            "num_exam": 1,
            "created_at": "2024-05-30T22:55:09.000000Z",
            "updated_at": "2024-05-30T22:55:09.000000Z"
          },
          {
            "id_examen": 1,
            "id_local": 1,
            "codeApogee": 2222,
            "isPresent": true,
            "num_exam": 1,
            "created_at": "2024-05-30T22:54:46.000000Z",
            "updated_at": "2024-05-30T22:54:46.000000Z"
          }
        ],
            "signers":[
                {
          "id_surveillant": 1,
          "id_pv": 1,
          "signer": true
        }
            ]
        };

            try {
              const response = await axios.post(`http://${ipAdress}:8000/api/tablette/setPV`, pv, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000
                  });
             console.log(response.data);
            } catch (error) {
              console.error(error);
            }
          }
          const image = require('./interface/demande.jpg');
    return(
        <View  style={styles.container}>
        <StatusBar />
            <Image source={image} style={styles.image}/>
            <TouchableOpacity style={styles.button} onPress={associer}>
                <Text style={styles.buttonText}>Envoyer le PV</Text>
            </TouchableOpacity>
            
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor:'#4D4D69'
    },button: {
        marginTop: 100,
        padding: 10,
        width: 400,
        backgroundColor:'#238AF5',
        borderRadius: 25,
      },
      buttonText:{
        color:'#fff',
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:20,
      },image:{
        height:200,
        width:'110%',
        marginBottom: 50
      }
});

export default EnvoiDeDonneer;