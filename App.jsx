// import { ShoppingCartIcon } from '@heroicons/react/16/solid';
import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import messaging from '@react-native-firebase/messaging';
import {store} from './store';
import {Provider} from 'react-redux';
import PaymentScreen from './Screens/PaymentScreen';
import OtpScreen from './Screens/OtpScreen';

const Stack = createNativeStackNavigator();

function App() { 
  const linking = {
    prefixes:['https://fullstack-nextjs-virid.vercel.app/app'],
    config:{
      screens:{
        OtpVerification:'OtpVerification',
        Product:"product/:id"
      }
    }
  }
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log("Token =",token)
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OtpVerification"
            component={OtpScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
