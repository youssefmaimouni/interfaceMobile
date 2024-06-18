import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';



const uploadPDF = async (filePath, deviceId) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');

  const file = {
    uri: filePath,
    type: 'application/pdf',
    name: `PV_${year}${month}${day}.pdf`,
  };

  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('device_id', deviceId);
  formData.append('date', `${year}-${month}-${day}`); 

  try {
    const response = await axios.post(`http://192.168.11.100:8000/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Upload successful:', response.data);
    Alert.alert('Upload Successful', 'PDF has been uploaded successfully.');
  } catch (error) {
    console.error('Upload error:', error.response ? error.response.data : 'No response data');
    Alert.alert('Upload Error', `An error occurred while uploading the PDF: ${error.message}`);
  }
};
const EnvoiDeDonneer=({route})=>{
    const ipAdress=route.params.ipAdress;

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
        width: 350,
        backgroundColor:'#238AF5',
        borderRadius: 25,
      },
      buttonText:{
        color:'#fff',
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:20,
      },image:{
        height:250,
        width:'110%',
        marginBottom: 50
      }
});

export default EnvoiDeDonneer;