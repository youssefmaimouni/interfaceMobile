import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

async function registerForPushNotificationsAsync() {
  if (Platform.OS !== 'android' && Platform.OS !== 'ios') {
    console.log('Must use physical device for Push Notifications');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return;
  }

  const expoConfig = Constants.expoConfig;
  console.log('expoConfig:', expoConfig);

  const firebaseProjectId = expoConfig?.extra?.firebaseConfig?.projectId ?? null;
  const projectId = expoConfig?.extra?.projectId ?? null;

  console.log('Firebase Project ID:', firebaseProjectId);
  console.log('Expo Project ID:', projectId);

  if (!projectId) {
    console.log('Failed to get Expo project ID from expoConfig');
    return;
  }

  try {
    const token = (await Notifications.getExpoPushTokenAsync({
      projectId: projectId, // Ensure this matches your Expo project ID
    })).data;

    console.log("Notification Token:", token);
    return token;
  } catch (error) {
    console.error('Error fetching Expo push token:', error);
  }
}

export default registerForPushNotificationsAsync;
