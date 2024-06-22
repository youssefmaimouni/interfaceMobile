import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import * as Notifications from 'expo-notifications';

const Timer = () => {
  const totalTime = 90 * 60 * 1000; // 90 minutes in milliseconds
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Determine the start time based on current hour
  const determineStartTime = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return currentHour < 9 ? "09:00" : currentHour < 11 ? "11:00" : null;
    } else {
      return currentHour < 14 ? "14:00" : currentHour < 16 ? "16:00" : null;
    }
  };

  const startTime = determineStartTime();

  // Handle starting the timer
  const handleStartTimer = () => {
    setIsActive(true);
    setProgress(0);
    setTimeLeft(totalTime);
    sendNotification("l'examen a commencé");
  };

  // Periodically check the current time to start the timer
  useEffect(() => {
    const timeCheckInterval = setInterval(() => {
      const currentTime = `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`;
      if (currentTime === startTime && !isActive) {
        handleStartTimer();
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(timeCheckInterval);
  }, [startTime, isActive]);

  // Manage the timer countdown
  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1000;
          if (newTime <= 0) {
            clearInterval(id);
            sendNotification("l'examen est fini");
            setIsActive(false);
            return 0;
          }
          return newTime;
        });
        setProgress(prevProgress => prevProgress + (1000 / totalTime));
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [isActive]);

  // Request notification permissions on mount
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission for notifications was denied');
      }
    };
    requestNotificationPermission();
  }, []);

  // Notification helper function
  const sendNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: null, // Trigger immediately
    });
  };

  // Format time display
  const formatTime = milliseconds => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor(milliseconds / 1000 / 3600);
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <View style={styles.container}>
      <Progress.Bar style={styles.pro} progress={progress} width={200} />
      <Text style={styles.timerText}>le temps restant:{formatTime(timeLeft)}</Text>
      <Text style={styles.timeScheduled}>l'heure du debut: {startTime || 'seance terminé'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pro:{
    marginTop:15,
   margin:10,
   alignSelf:'center'
  },
  container: {
    
    backgroundColor: '#fff', 
   
  },
  timerText: {
    marginTop: 10,
    fontSize: 15,
    color: '#000', 
  },
  timeScheduled: {
    
    fontSize: 15,
    color: '#000', 
  },
});

export default Timer;
