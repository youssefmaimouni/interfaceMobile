import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';
import { useEffect, useState } from "react";
import * as Device from 'expo-device';


const SendData=()=>{
    const ipAdress='192.168.245.131';
    const [deviceId, setDeviceId] = useState('');

    useEffect(() => {
      setDeviceId(Device.osBuildId);
    }, []);
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const associer = async () => {
      const etudiant1 = [
        {
          "codeApogee": 10001,
          "nom_etudiant": "El Amrani",
          "prenom_etudiant": "Fatima",
          "numéro-exam": 1,
          "CNE": "123456",
          "photo": "http://www.fsac.ac.ma/photo/abcde",
          "estPerson": false
        },
        {
          "codeApogee": 10002,
          "nom_etudiant": "Bouazzaoui",
          "prenom_etudiant": "Mohammed",
          "numéro-exam": 2,
          "CNE": "654321",
          "photo": "http://www.fsac.ac.ma/photo/xyzzy",
          "estPerson": false
        },
        {
          "codeApogee": 10003,
          "nom_etudiant": "Fassi",
          "prenom_etudiant": "Nawal",
          "numéro-exam": 3,
          "CNE": "987654",
          "photo": "http://www.fsac.ac.ma/photo/pqrst",
          "estPerson": false
        },
        {
          "codeApogee": 10004,
          "nom_etudiant": "El Harrak",
          "prenom_etudiant": "Youssef",
          "numéro-exam": 4,
          "CNE": "456789",
          "photo": "http://www.fsac.ac.ma/photo/lmnop",
          "estPerson": false
        },
        {
          "codeApogee": 10005,
          "nom_etudiant": "Benchekroun",
          "prenom_etudiant": "Khadija",
          "numéro-exam": 5,
          "CNE": "987654",
          "photo": "http://www.fsac.ac.ma/photo/defgh",
          "estPerson": false
        },
        {
          "codeApogee": 10006,
          "nom_etudiant": "El Khattabi",
          "prenom_etudiant": "Ahmed",
          "numéro-exam": 6,
          "CNE": "234567",
          "photo": "http://www.fsac.ac.ma/photo/ghijk",
          "estPerson": false
        },
        {
          "codeApogee": 10007,
          "nom_etudiant": "Chraibi",
          "prenom_etudiant": "Amina",
          "numéro-exam": 7,
          "CNE": "345678",
          "photo": "http://www.fsac.ac.ma/photo/abcde",
          "estPerson": false
        },
        {
          "codeApogee": 10008,
          "nom_etudiant": "El Amine",
          "prenom_etudiant": "Omar",
          "numéro-exam": 8,
          "CNE": "876543",
          "photo": "http://www.fsac.ac.ma/photo/jklmn",
          "estPerson": false
        },
        {
          "codeApogee": 10009,
          "nom_etudiant": "Tazi",
          "prenom_etudiant": "Salma",
          "numéro-exam": 9,
          "CNE": "987655",
          "photo": "http://www.fsac.ac.ma/photo/mnopq",
          "estPerson": false
        },
        {
          "codeApogee": 10010,
          "nom_etudiant": "El Khadir",
          "prenom_etudiant": "Mohamed",
          "numéro-exam": 10,
          "CNE": "765432",
          "photo": "http://www.fsac.ac.ma/photo/qrsuv",
          "estPerson": false
        },
        {
          "codeApogee": 10011,
          "nom_etudiant": "Lahlou",
          "prenom_etudiant": "Fadwa",
          "numéro-exam": 11,
          "CNE": "654321",
          "photo": "http://www.fsac.ac.ma/photo/tuvwx",
          "estPerson": false
        },
        {
          "codeApogee": 10012,
          "nom_etudiant": "Bounou",
          "prenom_etudiant": "Houda",
          "numéro-exam": 12,
          "CNE": "543219",
          "photo": "http://www.fsac.ac.ma/photo/efghi",
          "estPerson": false
        },
        {
          "codeApogee": 10013,
          "nom_etudiant": "Hassani",
          "prenom_etudiant": "Othmane",
          "numéro-exam": 13,
          "CNE": "234567",
          "photo": "http://www.fsac.ac.ma/photo/ijklm",
          "estPerson": false
        },
        {
          "codeApogee": 10014,
          "nom_etudiant": "Ezzahraoui",
          "prenom_etudiant": "Sanaa",
          "numéro-exam": 14,
          "CNE": "432198",
          "photo": "http://www.fsac.ac.ma/photo/mnopq",
          "estPerson": false
        },
        {
          "codeApogee": 10015,
          "nom_etudiant": "El Hadri",
          "prenom_etudiant": "Fatima Zahra",
          "numéro-exam": 15,
          "CNE": "321987",
          "photo": "http://www.fsac.ac.ma/photo/xyzzy",
          "estPerson": false
        },
        {
          "codeApogee": 10016,
          "nom_etudiant": "El Ghazi",
          "prenom_etudiant": "Yasmine",
          "numéro-exam": 16,
          "CNE": "876543",
          "photo": "http://www.fsac.ac.ma/photo/uvwxy",
          "estPerson": false
        },
        {
          "codeApogee": 10017,
          "nom_etudiant": "Essaadi",
          "prenom_etudiant": "Youssef",
          "numéro-exam": 17,
          "CNE": "987656",
          "photo": "http://www.fsac.ac.ma/photo/qrsuv",
          "estPerson": false
        },
        {
          "codeApogee": 10018,
          "nom_etudiant": "El Mekki",
          "prenom_etudiant": "Sara",
          "numéro-exam": 18,
          "CNE": "876543",
          "photo": "http://www.fsac.ac.ma/photo/ghijk",
          "estPerson": false
        },
        {
          "codeApogee": 10019,
          "nom_etudiant": "El Jazouli",
          "prenom_etudiant": "Mehdi",
          "numéro-exam": 19,
          "CNE": "987649",
          "photo": "http://www.fsac.ac.ma/photo/abcde",
          "estPerson": false
        },
        {
          "codeApogee": 10020,
          "nom_etudiant": "El Fassi",
          "prenom_etudiant": "Nada",
          "numéro-exam": 20,
          "CNE": "876543",
          "photo": "http://www.fsac.ac.ma/photo/fghij",
          "estPerson": false
        }
      ];
      const etudiant2=[
          {
              "codeApogee": 10021,
              "nom_etudiant": "El Amrani",
              "prenom_etudiant": "Fatima",
              "numéro-exam": 1,
              "CNE": "123456",
              "photo": "http://www.fsac.ac.ma/photo/abcde",
              "estPerson": false
          },
          {
              "codeApogee": 10022,
              "nom_etudiant": "Bennani",
              "prenom_etudiant": "Youssef",
              "numéro-exam": 2,
              "CNE": "123457",
              "photo": "http://www.fsac.ac.ma/photo/abcd1",
              "estPerson": false
          },
          {
              "codeApogee": 10023,
              "nom_etudiant": "Hamza",
              "prenom_etudiant": "Sara",
              "numéro-exam": 3,
              "CNE": "123458",
              "photo": "http://www.fsac.ac.ma/photo/abcd2",
              "estPerson": false
          },
          {
              "codeApogee": 10024,
              "nom_etudiant": "Omar",
              "prenom_etudiant": "Karim",
              "numéro-exam": 4,
              "CNE": "123459",
              "photo": "http://www.fsac.ac.ma/photo/abcd3",
              "estPerson": false
          },
          {
              "codeApogee": 10025,
              "nom_etudiant": "Salah",
              "prenom_etudiant": "Amina",
              "numéro-exam": 5,
              "CNE": "123460",
              "photo": "http://www.fsac.ac.ma/photo/abcd4",
              "estPerson": false
          },
          {
              "codeApogee": 10026,
              "nom_etudiant": "Kamal",
              "prenom_etudiant": "Hanae",
              "numéro-exam": 6,
              "CNE": "123461",
              "photo": "http://www.fsac.ac.ma/photo/abcd5",
              "estPerson": false
          },
          {
              "codeApogee": 10027,
              "nom_etudiant": "Fahd",
              "prenom_etudiant": "Leila",
              "numéro-exam": 7,
              "CNE": "123462",
              "photo": "http://www.fsac.ac.ma/photo/abcd6",
              "estPerson": false
          },
          {
              "codeApogee": 10028,
              "nom_etudiant": "Nour",
              "prenom_etudiant": "Mohammed",
              "numéro-exam": 8,
              "CNE": "123463",
              "photo": "http://www.fsac.ac.ma/photo/abcd7",
              "estPerson": false
          },
          {
              "codeApogee": 10029,
              "nom_etudiant": "El Ghazi",
              "prenom_etudiant": "Imane",
              "numéro-exam": 9,
              "CNE": "123464",
              "photo": "http://www.fsac.ac.ma/photo/abcd8",
              "estPerson": false
          },
          {
              "codeApogee": 10030,
              "nom_etudiant": "Mourad",
              "prenom_etudiant": "Hassan",
              "numéro-exam": 10,
              "CNE": "123465",
              "photo": "http://www.fsac.ac.ma/photo/abcd9",
              "estPerson": false
          },
          {
              "codeApogee": 10031,
              "nom_etudiant": "Nadia",
              "prenom_etudiant": "Rachid",
              "numéro-exam": 11,
              "CNE": "123466",
              "photo": "http://www.fsac.ac.ma/photo/abcda",
              "estPerson": false
          },
          {
              "codeApogee": 10032,
              "nom_etudiant": "Karima",
              "prenom_etudiant": "Samir",
              "numéro-exam": 12,
              "CNE": "123467",
              "photo": "http://www.fsac.ac.ma/photo/abcdb",
              "estPerson": false
          },
          {
              "codeApogee": 10033,
              "nom_etudiant": "Hakim",
              "prenom_etudiant": "Salma",
              "numéro-exam": 13,
              "CNE": "123468",
              "photo": "http://www.fsac.ac.ma/photo/abcdc",
              "estPerson": false
          },
          {
              "codeApogee": 10034,
              "nom_etudiant": "Anas",
              "prenom_etudiant": "Yasmina",
              "numéro-exam": 14,
              "CNE": "123469",
              "photo": "http://www.fsac.ac.ma/photo/abcdd",
              "estPerson": false
          },
          {
              "codeApogee": 10035,
              "nom_etudiant": "Layla",
              "prenom_etudiant": "Othmane",
              "numéro-exam": 15,
              "CNE": "123470",
              "photo": "http://www.fsac.ac.ma/photo/abcde",
              "estPerson": false
          },
          {
              "codeApogee": 10036,
              "nom_etudiant": "Rachida",
              "prenom_etudiant": "Anwar",
              "numéro-exam": 16,
              "CNE": "123471",
              "photo": "http://www.fsac.ac.ma/photo/abcdf",
              "estPerson": false
          },
          {
              "codeApogee": 10037,
              "nom_etudiant": "Souad",
              "prenom_etudiant": "Jalil",
              "numéro-exam": 17,
              "CNE": "123472",
              "photo": "http://www.fsac.ac.ma/photo/abcdg",
              "estPerson": false
          },
          {
              "codeApogee": 10038,
              "nom_etudiant": "Saad",
              "prenom_etudiant": "Nour",
              "numéro-exam": 18,
              "CNE": "123473",
              "photo": "http://www.fsac.ac.ma/photo/abcdh",
              "estPerson": false
          },
          {
              "codeApogee": 10039,
              "nom_etudiant": "El Mehdi",
              "prenom_etudiant": "Hamid",
              "numéro-exam": 19,
              "CNE": "123474",
              "photo": "http://www.fsac.ac.ma/photo/abcdi",
              "estPerson": false
          },
          {
              "codeApogee": 10040,
              "nom_etudiant": "Tariq",
              "prenom_etudiant": "Rania",
              "numéro-exam": 20,
              "CNE": "123475",
              "photo": "http://www.fsac.ac.ma/photo/abcdj",
              "estPerson": false
          }
      ]
      
      const filiere= {
        "nom_filiere": "SMI"
      }
      const module={
        "id_filiere": 1,
        "intitule_module": "DBA"
      }
      const session={
          "nom_session": "automne-hiver",
          "type_session": "Normal",
          "Annee_universitaire": "2023-2024",
          "datedebut": "2024-06-5",
          "datefin": "2024-06-15"
        }
      
      const exam ={
        "id_session": 1,
        "code_module": 1,
        "id_pv": 1,
        "date_examen": "2024-06-12",
        "demi_journee_examen": "PM",
        "seance_examen": "S1"
      }
      const exam2 ={
        "id_session": 1,
        "code_module": 1,
        "id_pv": 1,
        "date_examen": "2024-06-12",
        "demi_journee_examen": "PM",
        "seance_examen": "S2"
      }
      const pv ={ 
        "id_tablette": 1
      }
      const tablette = {
        "device_id": deviceId,
      };
      const local={
        "num_local": "5",
        "type_local": "salle"
      }
      const local2={
        "num_local": 0,
        "type_local": "R"
      }

      
      try {
              let response = await axios.post(`http://${ipAdress}:8000/api/tablette/create`, tablette, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
              });
              console.log('tablette:');
              console.log(response.data);
              response = await axios.post(`http://${ipAdress}:8000/api/local/create`, local, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
              });
              console.log( 'local:');
              console.log( response.data);
              response = await axios.post(`http://${ipAdress}:8000/api/local/create`, local2, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
              });
              console.log('local:' );
              console.log(response.data);
               response= await axios.post(`http://${ipAdress}:8000/api/pv/create`, pv, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
              });
              console.log('pv:' );
              console.log(response.data);
              response = await axios.post(`http://${ipAdress}:8000/api/session/create`, session, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
              });
              console.log('sess :');
              console.log(response.data);
              response = await axios.post(`http://${ipAdress}:8000/api/filiere/create`, filiere, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
              });
              console.log( 'filiere:');
              console.log( response.data);
              response = await axios.post(`http://${ipAdress}:8000/api/module/create`, module, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
              });
              console.log('module:' );
              console.log(response.data);
              response = await axios.post(`http://${ipAdress}:8000/api/examen/create`, exam, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
              });
              console.log('exam:');
              console.log( response.data);
              response = await axios.post(`http://${ipAdress}:8000/api/examen/create`, exam2, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
              });
              console.log('exam2:');
              console.log( response.data);
             

            etudiant1.map(
                async(e)=>{
                    const response = await axios.post(`http://${ipAdress}:8000/api/etudiant/create`, e, {
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          timeout: 10000
                        });

                   console.log('etud:');
                   console.log(response.data);

                }
            )
            etudiant2.map(
                async(e)=>{
                    const response = await axios.post(`http://${ipAdress}:8000/api/etudiant/create`, e, {
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          timeout: 10000
                        });

                   console.log('etud:');
                   console.log(response.data);

                }
            )
            } catch (error) {
              console.error(error);
            }
          }

          const pas= async()=>{
            const passer =[
              {
                "id_examen": 1,
                "codeApogee": 10001,
                "id_local": 1,
                "num_exam": 1,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10002,
                "id_local": 1,
                "num_exam": 2,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10003,
                "id_local": 1,
                "num_exam": 3,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10004,
                "id_local": 1,
                "num_exam": 4,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10005,
                "id_local": 1,
                "num_exam": 5,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10006,
                "id_local": 1,
                "num_exam": 6,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10007,
                "id_local": 1,
                "num_exam": 7,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10008,
                "id_local": 1,
                "num_exam": 8,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10009,
                "id_local": 1,
                "num_exam": 9,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10010,
                "id_local": 1,
                "num_exam": 10,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10011,
                "id_local": 1,
                "num_exam": 11,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10012,
                "id_local": 1,
                "num_exam": 12,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10013,
                "id_local": 1,
                "num_exam": 13,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10014,
                "id_local": 1,
                "num_exam": 14,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10015,
                "id_local": 1,
                "num_exam": 15,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10016,
                "id_local": 1,
                "num_exam": 16,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10017,
                "id_local": 1,
                "num_exam": 17,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10018,
                "id_local": 1,
                "num_exam": 18,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10019,
                "id_local": 1,
                "num_exam": 19,
                "isPresent": false
              },
              {
                "id_examen": 1,
                "codeApogee": 10020,
                "id_local": 1,
                "num_exam": 20,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10021,
                "id_local": 1,
                "num_exam": 1,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10022,
                "id_local": 1,
                "num_exam": 2,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10023,
                "id_local": 1,
                "num_exam": 3,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10024,
                "id_local": 1,
                "num_exam": 4,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10025,
                "id_local": 1,
                "num_exam": 5,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10026,
                "id_local": 1,
                "num_exam": 6,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10027,
                "id_local": 1,
                "num_exam": 7,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10028,
                "id_local": 1,
                "num_exam": 8,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10029,
                "id_local": 1,
                "num_exam": 9,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10030,
                "id_local": 1,
                "num_exam": 10,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10031,
                "id_local": 1,
                "num_exam": 11,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10032,
                "id_local": 1,
                "num_exam": 12,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10033,
                "id_local": 1,
                "num_exam": 13,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10034,
                "id_local": 1,
                "num_exam": 14,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10035,
                "id_local": 1,
                "num_exam": 15,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10036,
                "id_local": 1,
                "num_exam": 16,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10037,
                "id_local": 1,
                "num_exam": 17,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10038,
                "id_local": 1,
                "num_exam": 18,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10039,
                "id_local": 1,
                "num_exam": 19,
                "isPresent": false
              },
              {
                "id_examen": 2,
                "codeApogee": 10040,
                "id_local": 1,
                "num_exam": 20,
                "isPresent": false
              },
            ]
            try {
              passer.map(
                async(e)=>{
                    const response = await axios.post(`http://${ipAdress}:8000/api/passer/create`, e, {
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          timeout: 10000
                        });
                        console.log('passer:')
                   console.log(response.data);

                }
            )
            } catch (error) {
              console.error(error);
            }
          }
          const send = async()=>{
            const departement ={
              "nom_departement": "Math Info",
              "code_departement": "MI"
            }
            const surveillants =[
              {
                "id_departement": "1",
                "nomComplet_s": "Ahmed Al-Jaber"
              },
              {
                "id_departement": "1",
                "nomComplet_s": "Luisa Fernández"
              },
              {
                "id_departement": "1",
                "nomComplet_s": "Tomoe Gozen"
              },
              {
                "id_departement": "1",
                "nomComplet_s": "George Washington"
              },
              {
                "id_departement": "1",
                "nomComplet_s": "Chen Wei"
              },
              {
                "id_departement": "1",
                "nomComplet_s": "Simone"
              },
              {
                "id_departement": "1",
                "nomComplet_s": "Jean Dupont"
              },
              {
                "id_departement": "1",
                "nomComplet_s": "Marie Curie"
              },
              {
                "id_departement": "1",
                "nomComplet_s": "Emile Durkheim"
              },
              {
                "id_departement": "1",
                "nomComplet_s": "Claude Monet"
              },
            ]
            const affectation ={
              "id_tablette": 1,
              "id_local": 1,
              "date_affectation": "2024-06-12",
              "demi_journee_affectation": "PM"
            }
            const affectation2 ={
              "id_tablette": 1,
              "id_local": 2,
              "date_affectation": "2024-06-12",
              "demi_journee_affectation": "PM"
            }
            const association =[
              {
                "id_surveillant": 1,
                "id_affectation": 1
              },
              {
                "id_surveillant": 2,
                "id_affectation": 1
              },
              {
                "id_surveillant": 3,
                "id_affectation": 1
              },
              {
                "id_surveillant": 4,
                "id_affectation": 1
              },
              {
                "id_surveillant": 5,
                "id_affectation": 1
              },
              {
                "id_surveillant": 6,
                "id_affectation": 2
              },
              {
                "id_surveillant": 7,
                "id_affectation": 2
              },
              {
                "id_surveillant": 8,
                "id_affectation": 2
              },
              {
                "id_surveillant": 9,
                "id_affectation": 2
              },
              {
                "id_surveillant": 10,
                "id_affectation": 2
              }
            ]

            try{
              response = await axios.post(`http://${ipAdress}:8000/api/departement/create`, departement, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
              });
              console.log('departement:');
              console.log(response.data);
              response = await axios.post(`http://${ipAdress}:8000/api/affectation/create`, affectation, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
              });
              console.log('affectation2:');
              console.log(response.data);
              response= await axios.post(`http://${ipAdress}:8000/api/affectation/create`, affectation2, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
              });
              console.log('affectation2:');
              console.log(response.data);
              surveillants.map(
                async(e)=>{
                    const response = await axios.post(`http://${ipAdress}:8000/api/surveillant/create`, e, {
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          timeout: 10000
                        });
                        console.log('surv :')
                   console.log(response.data);

                }
            )
            association.map(
                async(e)=>{
                    const response = await axios.post(`http://${ipAdress}:8000/api/associer/create`, e, {
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          timeout: 10000
                        });
                  console.log('association:');
                   console.log(response.data);

                }
            )
          } catch (error) {
            console.error(error);
          }
          }
          useEffect(()=>{
            console.log('+++++++++++++');
          },[]);
    return(
        <View  style={styles.container}>
        <StatusBar />
            <TouchableOpacity style={styles.button} onPress={associer}>
                <Text style={styles.buttonText}>Envoyer les donnee</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pas}>
                <Text style={styles.buttonText}>Envoyer les donnee</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={send}>
                <Text style={styles.buttonText}>Envoyer les donnee</Text>
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

export default SendData;