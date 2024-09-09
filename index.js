/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background message handled:', remoteMessage);
  });

  messaging().onMessage(remoteMessage => {
    console.log('Foreground message:', remoteMessage);
    // Display the notification to the user
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('App opened by notification while in foreground:', remoteMessage);
    // Handle notification interaction when the app is in the foreground
  });
  messaging().getInitialNotification().then(remoteMessage => {
    console.log('App opened by notification from closed state:', remoteMessage);
    // Handle notification interaction when the app is opened from a closed state
  });
AppRegistry.registerComponent(appName, () => App);
