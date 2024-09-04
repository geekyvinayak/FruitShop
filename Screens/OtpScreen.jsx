import {Linking, TouchableOpacity, View, Text, Alert} from 'react-native';
import React, {useCallback, useState} from 'react';
import SendOtp from '../Components/SendOtp';
import VerifyOtp from '../Components/VerifyOtp';
import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeftIcon} from 'react-native-heroicons/micro';
import {useNavigation} from '@react-navigation/native';
import FullScreenLoader from '../Components/FullScreenLoader';
const OtpScreen = () => {
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  const navitgation = useNavigation();
  async function signIn(phoneNumber) {
    setLoading(true);
    try {
      const number = '+91 ' + phoneNumber;
      const confirmation = await auth().signInWithPhoneNumber(number);
      setConfirm(confirmation);
    } catch (error) {
      alert(
        'THIS IS TESTING MODE PLEASE USE NUMBER PROVIDED AT FIREBSE TESTING',
      );
    } finally {
      setLoading(false);
    }
  }

  async function confirmVerificationCode(code) {
    setLoading(true);
    try {
      await confirm.confirm(code);
      alert('code verified');
      setConfirm(null);
    } catch (error) {
      alert('Invalid code');
    } finally {
      setLoading(false);
    }
  }

  const handleOpenSettings = useCallback(async () => {
    // Open the custom settings if the app has one
    await Linking.openSettings();
  }, []);

  const handlePress = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    try {
      const supported = await Linking.canOpenURL('https://google.com');

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL('https://google.com');
      } else {
        Alert.alert(`Don't know how to open this URL: ${'https://google.com'}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <FullScreenLoader isLoading={loading} />
      <View className="flex-row justify-start mx-5 mt-5 ">
        <TouchableOpacity
          className="bg-orange-100 p-2 rounded-xl"
          onPress={() => {
            setConfirm(null);
            navitgation.goBack();
          }}>
          <ChevronLeftIcon size="35" color="orange" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-center">
        {confirm ? (
          <VerifyOtp onSubmit={confirmVerificationCode} />
        ) : (
          <SendOtp onSubmit={signIn} />
        )}

        <TouchableOpacity
          onPress={handleOpenSettings}
          className="mx-5 mt-5 bg-orange-400 p-5 items-center">
          <Text className="font-bold">Goto Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePress}
          className="mx-5 mt-5 bg-orange-400 p-5 items-center">
          <Text className="font-bold">Open Browser</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;
