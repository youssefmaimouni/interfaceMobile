import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';


const EnvoiDeDonneer=()=>{
    const ipAdress='192.168.245.241';

    const associer = async () => {
        const data= [
            {
                "codeApogee": "A12345",
                "photo": "url_to_photo1.jpg",
                "CNE": "10001",
                "prenom_etudiant": "Alice",
                "nom_etudiant": "Smith"
            },
            {
                "codeApogee": "B67890",
                "photo": "url_to_photo2.jpg",
                "CNE": "10002",
                "prenom_etudiant": "Bob",
                "nom_etudiant": "Johnson"
            },
            {
                "codeApogee": "C13579",
                "photo": "url_to_photo3.jpg",
                "CNE": "10003",
                "prenom_etudiant": "Charlie",
                "nom_etudiant": "Williams"
            }
        ];

        data.map(async (item)=>{

            try {
              const response = await axios.post(`http://${ipAdress}:8000/api/etudiant/create`, item, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000
                  });
             console.log(response.data);
            } catch (error) {
              console.log(error);
            }
        })
          }

    return(
        <View style={styles.container}>
            <TouchableOpacity style={{backgroundColor:'yellow'}} onPress={associer}>
                <Text>EnvoiDeDonneer</Text>
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
    },
});

export default EnvoiDeDonneer;