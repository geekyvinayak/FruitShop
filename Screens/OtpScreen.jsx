import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
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

  return (
    <SafeAreaView className="flex-1">
      <FullScreenLoader isLoading={loading} />
      <View className="flex-row justify-start mx-5 mt-5">
        <TouchableOpacity
          className="bg-orange-100 p-2 rounded-xl"
          onPress={() => {
            setConfirm(null);
            navitgation.goBack();
          }}>
          <ChevronLeftIcon size="35" color="orange" />
        </TouchableOpacity>
      </View>
      {confirm ? (
        <VerifyOtp onSubmit={confirmVerificationCode} />
      ) : (
        <SendOtp onSubmit={signIn} />
      )}
    </SafeAreaView>
  );
};

export default OtpScreen;
