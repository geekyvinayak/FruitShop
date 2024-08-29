import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';

const FullScreenLoader = ({message, isLoading = false}) => {
  if (!isLoading) return null;

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="orange" />
      {message && <Text style={styles.messageText}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute', // Ensures the loader overlays the content
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    zIndex: 50, // Ensures the loader is on top of other components
  },
  messageText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#4B5563', // Gray color
  },
});

export default FullScreenLoader;
