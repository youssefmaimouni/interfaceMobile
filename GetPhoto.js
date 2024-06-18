import React, { useState, useEffect } from 'react';
import { View, Image, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const GetPhoto = () => {
    const [imageUri, setImageUri] = useState(null);
    const [key, setKey] = useState(0);  // State to force re-render
    const imagePath = `${FileSystem.documentDirectory}downloadedImage.jpg`;

    const saveImage = async (base64String,imagePath) => {
        console.log('Saving image...');
        try {
            await FileSystem.writeAsStringAsync(imagePath, base64String, {
                encoding: FileSystem.EncodingType.Base64,
            });
            console.log('Image saved successfully at:', imagePath);
            return true;
        } catch (error) {
            console.error('Failed to save image:', error);
            return false;
        }
    };
    

    const loadImage = async () => {
        console.log('Loading image from filesystem...');
        try {
            const fileInfo = await FileSystem.getInfoAsync(imagePath);
            if (fileInfo.exists) {
                console.log('Image loaded from:', imagePath);
                setImageUri(imagePath + '?' + new Date().getTime()); // Adding a timestamp to the URI to avoid caching issues
                setKey(prevKey => prevKey + 1); // Increment key to force re-render
            } else {
                console.log('No image found at the path');
            }
        } catch (error) {
            console.error('Failed to load image:', error);
        }
    };

    const fetchAndStoreImage = async (etudiants) => {
        console.log('Fetching image from API...');
        try {
            const response = await axios.post(`http://192.168.245.131:8000/api/tablette/getPhoto/10001`);
            let imageData = response.data.image;
            console.log('Image data received:', imageData);
            if (imageData.startsWith('data:image/jpeg;base64,')) {
                imageData = imageData.replace('data:image/jpeg;base64,', '');
            }
            const saveSuccessful = await saveImage(imageData);
            if (saveSuccessful) {
                loadImage();
            }
        } catch (error) {
            console.error('Error fetching and storing images:', error);
        }
      };

    useEffect(() => {
        loadImage();
    }, []);

    return (
        <View style={styles.container}>
            {imageUri ? (
                <Image key={key} source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <Text>No image loaded</Text>
            )}
            <Button title="Fetch Image" onPress={fetchAndStoreImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#4D4D69'
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 20,
    }
});

export default GetPhoto;
