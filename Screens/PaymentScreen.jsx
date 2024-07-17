import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

const PaymentScreen = ({route}) => {
    const { amount} = route.params;

    const [qr,setqr]=useState()

    const createQr = async()=>{
        const url = `upi://pay?pa=8700494936@paytm&am=${amount}&cu=INR`;
        console.log(url)
    }

    useEffect( () => {
        createQr()
        // setqr(qrCode)
    }, [amount])
    
  return (
    <View>
      <Text>{amount}</Text>
      
    </View>
  )
}

export default PaymentScreen