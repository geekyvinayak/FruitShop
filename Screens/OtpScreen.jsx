import {
  Linking,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SendOtp from '../Components/SendOtp';
import VerifyOtp from '../Components/VerifyOtp';
import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeftIcon} from 'react-native-heroicons/micro';
import {useNavigation} from '@react-navigation/native';
import FullScreenLoader from '../Components/FullScreenLoader';
import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
  isErrorWithCode,
} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {addItemUserDetails, selectUser} from '../slices/navSlice';
const OtpScreen = () => {
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '192921244583-jkv87j1pkn6pcoo29au4g9vqqffovjek.apps.googleusercontent.com',
    });
  }, []);

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

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        // read user's info

        dispatch(addItemUserDetails(response.data));
      } else if (isNoSavedCredentialFoundResponse(response)) {
        // Android and Apple only.
        // No saved credential found, call `createAccount`
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.ONE_TAP_START_FAILED:
            // Android-only, you probably have hit rate limiting.
            // You can still call `presentExplicitSignIn` in this case.
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android: play services not available or outdated
            // Web: when calling an unimplemented api (requestAuthorization)
            break;
          default:
          // something else happened
        }
      } else {
        // an error that's not related to google sign in occurred
        console.log('error', error);
      }
    }
  };

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

  const signOut = async () => {
    try {
      const response = await GoogleSignin.signOut(userData.user.id);
      dispatch(addItemUserDetails({}));
      Alert.alert(
        'Success',
        'Logout Successfully',
        [{text: 'OK', onPress: () => navitgation.navigate('Home')}],
        {cancelable: false},
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  if (userData.user?.id) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-row justify-start  mt-5 ">
          <TouchableOpacity
            className="bg-orange-100 p-2 rounded-xl"
            onPress={() => {
              setConfirm(null);
              navitgation.goBack();
            }}>
            <ChevronLeftIcon size="35" color="orange" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 justify-center bg-pink-300 items-center">
          <Image
            source={{
              uri: userData.user.photo,
            }}
            style={{width: 150, height: 150}}
          />
          <Text>{userData.user.name}</Text>
          <Text>{userData.user.email}</Text>
          <TouchableOpacity
            onPress={() => signOut()}
            className=" mt-5 bg-orange-400 p-5 items-center">
            <Text className="font-bold">Sign Out Of Google</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-5">
      <FullScreenLoader isLoading={loading} />
      <View className="flex-row">
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
          className=" mt-5 bg-orange-400 p-5 items-center">
          <Text className="font-bold">Goto Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePress}
          className=" mt-5 bg-orange-400 p-5 items-center">
          <Text className="font-bold">Open Browser</Text>
        </TouchableOpacity>
        <TouchableOpacity className=" mt-5 p-5 items-center">
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            // initiate sign in
            googleSignIn();
          }}
          disabled={false}
        />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;
