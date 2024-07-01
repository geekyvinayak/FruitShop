// import { ShoppingCartIcon } from '@heroicons/react/16/solid';
import React, { useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import messaging from '@react-native-firebase/messaging';



const Stack = createNativeStackNavigator();

function App() {

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async() =>{
    const token = await messaging().getToken()
    console.log("Token = ",token)
  }

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App