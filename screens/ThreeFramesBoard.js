import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ThreeFramesBoard = props => {
  const { player, frame, bowl } = props;

  const miniFrameOne = function(frame) {
    if (player[frame][0] === 10) {
      return "";
    } else {
      return player[frame][0];
    }
  };

  const miniFrameTwo = function(frame) {
    if (player[frame][0] === 10) {
      return "";
    } else {
      return player[frame][1];
    }
  };

  const mainFrame = function(frame) {
    if (player[frame][0] === 10) {
      return "X";
    } else if (player[frame][0] + player[frame][1] === 10) {
      return "/";
    } else {
      return player[frame][0] + player[frame][1];
    }
  };

  const buildFrame = function(frame) {
    return (
      <View style={styles.frameContainer}>
        <View style={styles.miniFrameContainer}>
          <Text style={styles.miniFrameText}>{miniFrameTwo(frame)}</Text>
        </View>
        <View style={styles.miniFrameContainer}>
          <Text style={styles.miniFrameText}>{miniFrameOne(frame)}</Text>
        </View>
        <Text style={styles.frameText}>{mainFrame(frame)}</Text>
      </View>
    );
  };
  return (
    <View style={{ flexDirection: "row" }}>
      {frame - 3 > 0 ? buildFrame(frame - 2) : buildFrame(1)}
      {frame - 2 > 1 ? buildFrame(frame - 1) : buildFrame(2)}
      {frame - 1 > 2 ? buildFrame(frame) : buildFrame(3)}
    </View>
  );
};

const styles = StyleSheet.create({
  frameContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#eee",
    flexDirection: "row-reverse",
    borderWidth: 0.5,
    borderColor: "black"
  },

  miniFrameContainer: {
    width: 25,
    height: 25,
    borderWidth: 0.5,
    borderColor: "black"
  },

  miniFrameText: {
    fontSize: 18,
    textAlign: "center"
  },

  frameText: {
    fontSize: 48,
    paddingTop: 20
  }
});

export default ThreeFramesBoard;
