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

  const miniFrameThree = function(frame) {

  }

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
    const thirdFrame = frame === 9 ? (
      <View style={styles.miniFrameContainer}>
      <Text style={styles.miniFrameText}>{miniFrameThree(frame)}</Text>
    </View>
    ) : (
      <></>
    )
    return (
      <View style={styles.frameContainer}>
        {thirdFrame}
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
      {frame - 2 > 0 ? buildFrame(frame - 2) : buildFrame(0)}
      {frame - 1 > 1 ? buildFrame(frame - 1) : buildFrame(1)}
      {frame > 2 ? buildFrame(frame) : buildFrame(2)}
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
