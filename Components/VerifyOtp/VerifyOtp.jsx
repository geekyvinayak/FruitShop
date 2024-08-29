import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';


const VerifyOtp = (props) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={styles.container}>
      <Text>Enter Otp:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Otp"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <Button title="Submit" onPress={()=>props.onSubmit(inputValue)} />
      <Text style={styles.notice}>Use Otp for testing : <Text style={styles.noticeValue}>123456</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  notice:{
    marginTop:25,
    color:"red"
  },
  noticeValue:{
    color:"blue"
  }
});

export default VerifyOtp;
