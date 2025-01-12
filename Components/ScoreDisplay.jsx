import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ScoreDisplay = ({ score, time }) => {
  const [firstTeamScore, secondTeamScore] = score.split(" - ").map(Number);

  const firstTeamColor =
    firstTeamScore >= 1 &&
    secondTeamScore >= 1 &&
    firstTeamScore === secondTeamScore
      ? "green"
      : firstTeamScore > secondTeamScore
      ? "green"
      : "gray";

  const secondTeamColor =
    firstTeamScore >= 1 &&
    secondTeamScore >= 1 &&
    firstTeamScore === secondTeamScore
      ? "green"
      : secondTeamScore > firstTeamScore
      ? "green"
      : "gray";

  return (
    <>
      <Text style={styles.colorizeGray}>
        {time}
      </Text>
      <View style={styles.scoreContainer}>
        <Text style={[styles.scoreText, { color: firstTeamColor }]}>
          {firstTeamScore}
        </Text>
        <Text style={styles.dashText}>&nbsp;-&nbsp;</Text>
        <Text style={[styles.scoreText, { color: secondTeamColor }]}>
          {secondTeamScore}
        </Text>
      </View>
    </>
  );
};

export default ScoreDisplay;

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 14,
    color: "gray",
    fontWeight: "bold",
  },
  dashText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "gray",
  },
  colorizeGray: {
    fontSize: 13,
    fontWeight: "600",
    color: "gray",
  },
});
