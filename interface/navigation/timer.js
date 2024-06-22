import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import * as Notifications from 'expo-notifications';

const Timer = () => {
  const totalTime = 1 * 60 * 1000; // 15 minutes in milliseconds
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [startTime, setStartTime] = useState("14:06"); // Set to your desired start time

  useEffect(() => {
    async function requestNotificationPermission() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission for notifications was denied');
      }
    }
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const timeCheckInterval = setInterval(() => {
      const currentTime = new Date();
      const currentFormattedTime = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`;

      if (currentFormattedTime === startTime && !isActive) {
        handleStartStop();
      }
    }, 10000); 

    return () => clearInterval(timeCheckInterval);
  }, [startTime, isActive]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const id = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1000;
          if (newTime <= 0) {
            clearInterval(id);
            sendNotification("Timer Fin", "Votre timer de 15 minutes est terminé.");
            setIsActive(false);
          }
          return newTime > 0 ? newTime : 0;
        });
        setProgress((prevProgress) => prevProgress + (1000 / totalTime));
      }, 1000);
      setIntervalId(id);
    } else if (!isActive && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, timeLeft]);

  const handleStartStop = () => {
    setIsActive(true);
    sendNotification("Timer Début", "Votre timer de 15 minutes a démarré.");
  };

  const sendNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: null, // Trigger immediately
    });
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor(milliseconds / 1000 / 3600);
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };


  return (
    <View style={styles.container}>
      <Progress.Bar progress={progress} width={200} />
     
      <Text style={styles.timerText}>{formatTime(timeLeft)} / {startTime}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff', 
   
  },
  timerText: {
    marginTop: 10,
    fontSize: 20,
    color: '#000', 
  },
  timeScheduled: {
    marginTop: 20,
    fontSize: 16,
    color: '#000', 
  },
});

export default Timer;
