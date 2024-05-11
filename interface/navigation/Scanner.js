import React,{useState,useEffect} from 'react';
import { View,Text,Button,StyleSheet } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default function Signature() {
    const [hasPermission,setHasPermission]=useState(null);
    const [scanned,setScanned]=useState(false);
    const [text ,setText]=useState('Not yet scanned');

    const askForComeraPermission =()=>{
        (async () => {
            const {status}=await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status==="granted");
        })()
    }

    useEffect( ()=>{
        askForComeraPermission();
    },[]);

    const handleBarCodeScaner =({type , data})=>{
        setScanned(true);
        setText(data);
        console.log("Type : " + type + "\nData : " + data);
    }

    if (hasPermission ===null) {
        return(
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        ) 
    }

    if (hasPermission ===false) {
        return(
            <View style={styles.container}>
                <Text>No access to camera</Text>
                <Button title={'Allow camera'} onPress={()=>askForComeraPermission()}/>
            </View>
        ) 
    }
    return(
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScaner}
                    style={{height:400,width:400}}
                />
            </View>
            <Text style={styles.maintext}>{text}</Text>
            {scanned && <Button title='Scan again ?'onPress={()=>setScanned(false)}/>}
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    barcodebox:{
        alignItems:'center',
        justifyContent:'center',
        height:300,
        width:300,
        overflow:'hidden',
        borderRadius:30,
        borderColor:'#fff',
        borderWidth:1,
        backgroundColor:'black'
    }

});