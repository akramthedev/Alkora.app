import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useFonts } from 'expo-font';



const LiveButton = ({isClicked, setIsClicked}) => {
  const togglePosition = useState(new Animated.Value(0))[0];

  
      const [fontsLoaded] = useFonts({
        'fontR': require('../fonts/fontR.ttf'),  
        'fontM': require('../fonts/fontM.ttf'),  
        'fontB': require('../fonts/fontB.ttf'),  
      });
  


  const toggleButton = () => {
    setIsClicked(!isClicked);
    Animated.timing(togglePosition, {
      toValue: togglePosition._value === 1 ? 0 : 1,  
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = togglePosition.interpolate({
    inputRange: [0, 1],
    outputRange: ["#9C9C9C", "#FF3D3D"], 
  });

  const textColor = togglePosition.interpolate({
    inputRange: [0, 1],
    outputRange: ["#2a2a2a", "#FFFFFF"],  
  });



  if (!fontsLoaded) {
    return null;  
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleButton}
    >
      <Animated.View
        style={[
          styles.movingRectangle,
          {
            backgroundColor: backgroundColor,
            transform: [
              {
                translateX: togglePosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 10],
                }),
              },
            ],
          },
        ]}
      >
        <Animated.Text style={[styles.text, { color: textColor }]}>
          مباشر
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 37,
    height: 14,
    backgroundColor: "#585858",
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  movingRectangle: {
    width: 43,
    height: 23,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 10,
    fontFamily : "fontM",
    alignItems : "center", 
    justifyContent : "center"
  },
});

export default LiveButton;