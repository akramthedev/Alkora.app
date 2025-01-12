import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

const CircularProgress = ({ progress, time, score }) => {
  const strokeWidth = 3;  
  const radius = 23;  
  const circumference = 2 * Math.PI * radius;  
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.circleContainer}>
      <Svg height={radius * 2 + strokeWidth} width={radius * 2 + strokeWidth}>
        <Circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#E0E0E0" 
          strokeWidth={strokeWidth}
          fill="none"
        />
      
        <Circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke="#fd9b02"  
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>  
      <Text style={styles.timeText}>{score}</Text>
      <Text style={styles.timeText2}>{time}</Text>     
    </View>
  );
};

const LiveMatch = ({ match }) => {
  const totalMinutes = 90;  
  const elapsedMinutes = parseInt(match.time.replace("'", ""), 10);  
  const progress = (elapsedMinutes / totalMinutes) * 100; 

  return (
    <View style={styles.timeContainer}>
      <CircularProgress progress={progress} time={`${match.time}`} score={match.score} />
    </View>
  );
};

export default LiveMatch;

const styles = StyleSheet.create({
  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection : "column"
  },
  timeText: {
    position: "absolute",  
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    top : 10,
  },
  timeText2: {
    position: "absolute",  
    fontSize: 12,
    top : 25,
    fontWeight: "900",
    color: "#fd9b02",
  },
});
