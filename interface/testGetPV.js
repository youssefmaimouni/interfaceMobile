import { Button, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Device from 'expo-device';
import base64 from 'base-64';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const username = 'admin';
const password = 'admin';
const encodedCredentials = base64.encode(`${username}:${password}`);



const TestGetPV = () => {
    const [deviceId, setDeviceId] = useState('');
    const ipAdress='192.168.245.131';
    useEffect(() => {
      const fetchDeviceId = () => {
        setDeviceId(Device.osBuildId);
      };
      fetchDeviceId();
    }, []);
  
    // useEffect(() => {
    //   if (deviceId) {  
    //      getPV();
    //   }
    // }, [deviceId]); 
    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear(); // Gets the full year (4 digits)
        const month = date.getMonth() + 1; // Gets the month (0-11, +1 to make it 1-12)
        const day = date.getDate(); // Gets the day of the month (1-31)
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`; // Formats to YYYY-MM-DD
      };
      const getAmOrPm = () => {
        const date = new Date();
        const hours = date.getHours(); // Gets the hour of the day (0-23)
        return hours < 12 ? 'AM' : 'PM'; // Checks if the hour is less than 12 for AM, otherwise PM
      };
      
      
      useEffect(()=>{
          console.log(getCurrentDate());
          console.log(getAmOrPm());
          checkDocuments();
      })
    const getPV= async () => {
        const data = {
          "device_id": deviceId,
          "date": getCurrentDate(),
          "demi_journee": getAmOrPm(),
        };
        try {
          const response = await axios.post(`http://${ipAdress}:8000/api/tablette/getPV`, data, {
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 10000
          });
          if(response.data.PV){
            console.log('surveillants');
            response.data.PV.surveillants.map((e)=>{
              console.log(e);
            })
            console.log('local');
            response.data.PV.local.map((e)=>{
              console.log(e);
            })
            console.log('reserviste');
            response.data.PV.reserviste.map((e)=>{
              console.log(e);
            })
            console.log('etudiantsS1');
            response.data.PV.etudiantsS1.map((e)=>{
              console.log(e);
            })
            console.log('etudiantsS2');
            response.data.PV.etudiantsS2.map((e)=>{
              console.log(e);
            })
            console.log('session');
            response.data.PV.session.map((e)=>{
              console.log(e);
            })
          }else{
            console.log(response.data);
          }
          
          
        } catch (error) {
          console.log(error);
        }
      }
      const checkDocuments = async () => {
        try {
          const response1 = await axios.get(`http://${ipAdress}:5984/etudiantsun/_all_docs?limit=1`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${encodedCredentials}`
            }
          });
          const response2 = await axios.get(`http://${ipAdress}:5984/etudiantsdeux/_all_docs?limit=1`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${encodedCredentials}`
            }
          });
          const response3 = await axios.get(`http://${ipAdress}:5984/surveillants/_all_docs?limit=1`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${encodedCredentials}`
            }
          });
          const response4 = await axios.get(`http://${ipAdress}:5984/reserviste/_all_docs?limit=1`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${encodedCredentials}`
            }
          });
          return (response1.data.total_rows > 0) || (response2.data.total_rows > 0)|| (response3.data.total_rows > 0) ||(response4.data.total_rows > 0) ;
        } catch (error) {
          console.error('Error checking documents:', error);
        }
      };
      
      

  return (
    <View style={styles.container}>
      <Button title="wertzui" onPress={getPV} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#4D4D69'
  }
});

export default TestGetPV;
