import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";

const SkeletonLoader = () => {
  const shimmerAnimation = useRef(new Animated.Value(-1)).current;

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnimation]);

  const shimmerStyle = {
    transform: [
      {
        translateX: shimmerAnimation.interpolate({
          inputRange: [-1, 1],
          outputRange: [-screenWidth, screenWidth],  
        }),
      },
    ],
  };

  
  

  return (
    <View style={styles.body}>
      {[...Array(3)].map((_, leagueIndex) => (
        <View key={leagueIndex} style={styles.leagueSkeleton}>
          <View style={styles.leagueTitleSkeleton}>
            <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
          </View>
  
          {[...Array(leagueIndex === 0 ? 2 : leagueIndex === 1 ? 3 : 1 )].map((_, matchIndex) => (
            <View key={matchIndex} style={styles.matchSkeleton}>
              <View style={styles.teamSkeleton}>
                <View style={styles.nameSkeleton}>
                  <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
                </View>
                <View style={styles.logoSkeleton2}>
                  <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
                </View>
              </View>
              <View style={styles.timeSkeleton}>
                <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
              </View>
              <View style={styles.teamSkeleton}>
                <View style={styles.logoSkeleton}>
                  <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
                </View>
                <View style={styles.nameSkeleton}>
                  <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
                </View>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  
}

export default SkeletonLoader;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    padding: 10,
  },
  leagueSkeleton: {
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,  
    elevation: 2,
  },
  leagueTitleSkeleton: {
    width: "50%",
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginBottom: 15,
    overflow: "hidden",
    position: "relative",
    alignSelf: "flex-end",
  },
  matchSkeleton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
    position: "relative",
    overflow: "hidden",
  },
  teamSkeleton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoSkeleton: {
    width: 30,
    height: 30,
    backgroundColor: "#E0E0E0",
    borderRadius: 15,
    marginRight: 10,
    overflow: "hidden",
    position: "relative",
  },
  nameSkeleton: {
    width: 50,
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
  },
  logoSkeleton2 : {
    width: 30,
    height: 30,
    backgroundColor: "#E0E0E0",
    borderRadius: 15,
    marginLeft: 10,
    overflow: "hidden",
    position: "relative",
  },
  timeSkeleton: {
    width: 40,
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
  },
  shimmerOverlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
  },
});