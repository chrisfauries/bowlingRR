import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

export default class Scores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer : 1,
      currentFrame : 3,
      currentBowl : 1,
      // player : new Array(10).fill(0).map(frame => new Array(2).fill(0))
      player : [[2,3], [7,3], [10,0]] 
    };
  }

  miniFrameOne(frame) {
    if(this.state.player[frame][0] === 10) {
      return ''
    } else {
      return this.state.player[frame][0]
    }
  }

  miniFrameTwo(frame) {
    if(this.state.player[frame][0] === 10) {
      return '';
    } else {
      return this.state.player[frame][1];
    }
  }

  mainFrame(frame) {
    if(this.state.player[frame][0] === 10) {
      return 'X';
    } else if(this.state.player[frame][0] + this.state.player[frame][1] === 10) {
      return '/';
    } else {
      return this.state.player[frame][0] + this.state.player[frame][1];
    }  
  }

  render() {
    console.log(this.state.player)
    const {currentFrame, player, currentPlayer} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.frameNumbersContainer}>
          <View style={styles.frameNumberContainer}>
            <Text style={styles.textCenter}>{currentFrame - 2}</Text>
          </View>
          <View style={styles.frameNumberContainer}>
            <Text style={styles.textCenter}>{currentFrame - 1}</Text>
          </View>
          <View style={styles.frameNumberContainer}>
            <Text style={styles.textCenter}>{currentFrame}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.frameContainer}>
            <View style={styles.miniFrameContainer}>
              <Text style={styles.miniFrameText}>{this.miniFrameTwo(currentFrame - 3)}</Text>
            </View>
            <View style={styles.miniFrameContainer}>
              <Text style={styles.miniFrameText}>{this.miniFrameOne(currentFrame - 3)}</Text>
            </View>
            <Text style={styles.frameText}>{this.mainFrame(currentFrame - 3)}</Text>
          </View>
          <View style={styles.frameContainer}>
            <View style={styles.miniFrameContainer}>
              <Text style={styles.miniFrameText}>{this.miniFrameTwo(currentFrame - 2)}</Text>
            </View>
            <View style={styles.miniFrameContainer}>
              <Text style={styles.miniFrameText}>{this.miniFrameOne(currentFrame - 2)}</Text>
            </View>
            <Text style={styles.frameText}>{this.mainFrame(currentFrame - 2)}</Text>
          </View>
          <View style={styles.frameContainer}>
            <View style={styles.miniFrameContainer}>
              <Text style={styles.miniFrameText}>{this.miniFrameTwo(currentFrame - 1)}</Text>
            </View>
            <View style={styles.miniFrameContainer}>
              <Text style={styles.miniFrameText}>{this.miniFrameOne(currentFrame - 1)}</Text>
            </View>
            <Text style={styles.frameText}>{this.mainFrame(currentFrame - 1)}</Text>
          </View>
        </View>
      </View>
    );
  }
}

Scores.navigationOptions = {
  title: "Scores"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: "#fff"
  },

  frameNumbersContainer: {
    flexDirection: "row"
  },

  frameNumberContainer: {
    width: 100,
    height: 20,
    backgroundColor: "#eee",
    borderWidth: 0.5,
    borderColor: "black"
  },

  textCenter: {
    textAlign: "center"
  },

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
