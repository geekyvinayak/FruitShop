// import { ShoppingCartIcon } from '@heroicons/react/16/solid';
import React, { useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import messaging from '@react-native-firebase/messaging';
import { store } from './store';
import { Provider } from 'react-redux';



const Stack = createNativeStackNavigator();

function App() {

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  }

  const getToken = async() =>{
    const token = await messaging().getToken()
    // console.log("Token = ",token)
  }

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, [])

  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App