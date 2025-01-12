import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Colors from './Colors';

export default function ColorScreen({ route }) {
  const [fadeAnim] = useState(new Animated.Value(0));  
  const [bgColor] = useState(new Animated.Value(0)); 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false, 
    }).start();

    let toValue = 0;
    switch (route.name) {
      case 'Home': toValue = 0; break;
      case 'Page2': toValue = 1; break;
      case 'Page3': toValue = 2; break;
      case 'Page4': toValue = 3; break;
      default: toValue = 4;
    }

    Animated.timing(bgColor, {
      toValue,
      duration: 800,
      useNativeDriver: false,  
    }).start();
  }, [route.name]);

  const interpolatedColor = bgColor.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: [
      Colors.primary,
      Colors.green,
      Colors.red,
      Colors.purple,
      Colors.white,
    ],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: interpolatedColor, opacity: fadeAnim },
      ]}
    >
      <View style={styles.content}></View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
