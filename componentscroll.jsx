import React, { useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, Animated } from 'react-native';

const InfiniteScroll = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const footerTranslateY = useRef(new Animated.Value(0)).current;
  const prevScrollY = useRef(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true, listener: (event) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const scrollDiff = offsetY - prevScrollY.current;

      if (scrollDiff > 5) {
        // Scrolling down
        hideFooter();
      } else if (scrollDiff < -5) {
        // Scrolling up
        showFooter();
      }

      prevScrollY.current = offsetY;
    }}
  );

  const hideFooter = () => {
    Animated.timing(footerTranslateY, {
      toValue: 65, // Height of the footer
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const showFooter = () => {
    Animated.timing(footerTranslateY, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        stickyHeaderIndices={[1]}
        className="relative"
        style={{ flex: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Component1 */}
        <View style={styles.component1}>
          <Text>Component 1</Text>
        </View>

        {/* Component2 - Sticky Header */}
        <View style={styles.stickyHeader}>
          <Text>Component 2</Text>
        </View>

        {/* Placeholder to fill the scrollable area */}
        <ScrollView style={styles.scrollableArea}>
          {[...Array(200)].map((_, index) => (
            <Text key={index} style={styles.scrollContent}>
              Scrollable Content {index + 1}
            </Text>
          ))}
        </ScrollView>
      </Animated.ScrollView>

      {/* Sticky Footer */}
      <Animated.View
        style={[
          styles.stickyFooter,
          { transform: [{ translateY: footerTranslateY }] },
        ]}
      >
        <Text>Footer</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  component1: {
    height: 65,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickyHeader: {
    height: 65,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollableArea: {
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InfiniteScroll;
