import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import ThreeFramesBoard from "./ThreeFramesBoard";
import ScoreBoard from './ScoreBoard';
import EditScore from './EditScore.js';

export default class Scores extends Component {
  constructor(props) {
    super(props);
    this.updateScore = this.updateScore.bind(this);
    this.state = {
      currentPlayer : 1,
      currentFrame : 0,
      currentBowl : 0,
      // player : [[2,3],[7,3],[10,0],[6,3],[8,2],[10,0],[0,0],[9,0],[0,10],[5,5,10]],
      // player : [[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,10,10]],
      player : [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0,0]],
      playerInfo : {
        player1name :'',
        player2name :'',
        player3name :'',
        player4name :'',
        players: 0,
        done : false
      }
    };
  }

  componentDidUpdate() {
    if(this.props.navigation.state.params) {
      const {data, ts} = this.props.navigation.state.params;
      if(data && (!this.state.ts || ts !== this.state.ts)) {
        this.setState({playerInfo: data, ts: ts})
      }
    }
  }

  updateScore(pins) {
    let {currentBowl, currentFrame, player, done} = this.state
    let temp = [...player];
    if(done) {
      return;
    }
    if(currentBowl === 0) {
      if(pins === 10) {
        temp[currentFrame][currentBowl] = pins;
        currentBowl = currentFrame !== 9 ? currentBowl : ++ currentBowl; 
        currentFrame = currentFrame !== 9 ? ++currentFrame : currentFrame;
        this.setState({player : temp, currentFrame, currentBowl}, ()=> {console.log(this.state)});
      } else {
        temp[currentFrame][currentBowl] = pins;
        this.setState({player : temp, currentBowl: ++currentBowl});
      }
    } else {
      console.log('bowl 2')
      if(currentBowl === 2) {
        temp[currentFrame][currentBowl] = pins;
        this.setState({player : temp, done : true })
      }
      if(currentFrame === 9) {
        temp[currentFrame][currentBowl] = pins;
        if(pins === 10 || pins + player[currentFrame][0] === 10) {
          ++currentBowl;
          this.setState({player : temp, currentBowl})
        } else {
          this.setState({player : temp, done : true})
        }
      } else {
        temp[currentFrame][currentBowl] = pins;
        currentFrame = ++currentFrame;
        this.setState({player : temp, currentFrame, currentBowl : 0});
      }
    }
  }
  
  render() {
    const {currentFrame, player, currentPlayer, playerInfo} = this.state;
    return (
      <>
        <ScoreBoard score={player} initials={playerInfo.player1name} />
      <View style={styles.container}>
        <View style={styles.frameNumbersContainer}>
          <View style={styles.frameNumberContainer}>
            <Text style={styles.textCenter}>{currentFrame - 2 > 0 ? currentFrame - 1 : 1}</Text>
          </View>
          <View style={styles.frameNumberContainer}>
            <Text style={styles.textCenter}>{currentFrame - 1 > 1 ? currentFrame : 2}</Text>
          </View>
          <View style={styles.frameNumberContainer}>
            <Text style={styles.textCenter}>{currentFrame > 2 ? currentFrame +1 : 3}</Text>
          </View>
        </View>
          <ThreeFramesBoard player={this.state.player} frame={this.state.currentFrame} bowl={this.state.currentBowl} />
      </View>
        <EditScore updateScore={this.updateScore} frame={this.state.currentFrame} player={this.state.player} bowl={this.state.currentBowl}/>
      </>
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
  }
});
