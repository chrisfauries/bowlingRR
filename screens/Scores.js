import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import ThreeFramesBoard from "./ThreeFramesBoard";
import ScoreBoard from "./ScoreBoard";
import EditScore from "./EditScore.js";
import initState from "./gameState.js";

export default class Scores extends Component {
  constructor(props) {
    super(props);
    this.updateScore = this.updateScore.bind(this);
    this.resetPreviousBowl = this.resetPreviousBowl.bind(this);
    this.state = {
      currentPlayer: 1,
      currentFrame: 0,
      currentBowl: 0,
      player: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0, 0]
      ],
      previousMoves: [],
      playerInfo: {
        player1name: "",
        player2name: "",
        player3name: "",
        player4name: "",
        players: 0,
        player1: [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0, 0]
        ],
        player2: [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0, 0]
        ],
        player3: [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0, 0]
        ],
        player4: [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0, 0]
        ]
      },
      ts: null
    };
  }

  freshPlayerScoreCard() {
    let arr = new Array(9).fill(0);
    arr = arr.map(_el => new Array(2).fill(0));
    arr.push([0, 0, 0]);
    return arr;
  }

  componentDidMount() {
    if (this.props.navigation.state.params) {
      const { data, ts } = this.props.navigation.state.params;
      if (data && (!this.state.ts || ts !== this.state.ts)) {
        this.setState(
          {
            ...initState,
            previousMoves: [],
            player: this.freshPlayerScoreCard()
          },
          () => {
            this.setState(
              {
                playerInfo: {
                  ...data,
                  player1: this.freshPlayerScoreCard(),
                  player2: this.freshPlayerScoreCard(),
                  player3: this.freshPlayerScoreCard(),
                  player4: this.freshPlayerScoreCard()
                },
                ts: ts
              },
              console.log("new game state: ", this.state)
            );
          }
        );
      }
    }
  }

  componentDidUpdate() {
    if (this.props.navigation.state.params) {
      const { data, ts } = this.props.navigation.state.params;
      if (data && (!this.state.ts || ts !== this.state.ts)) {
        this.setState({ ...initState, previousMoves: [] }, () => {
          this.setState(
            {
              playerInfo: {
                ...data,
                player1: this.freshPlayerScoreCard(),
                player2: this.freshPlayerScoreCard(),
                player3: this.freshPlayerScoreCard(),
                player4: this.freshPlayerScoreCard()
              },
              ts: ts
            },
            () => {
              this.setState({
                player: this.state.playerInfo[
                  `player${this.state.currentPlayer}`
                ]
              });
            }
          );
        });
      }
    }
  }

  //updateScore helper functions
  prevMoveStore() {
    this.setState(state => {
      return {
        previousMoves: [
          ...state.previousMoves,
          {
            player: state.currentPlayer,
            frame: state.currentFrame,
            bowl: state.currentBowl
          }
        ]
      };
    });
  }

  nextBowl() {
    const { currentBowl } = this.state;
    this.setState({ currentBowl: currentBowl + 1 });
  }

  nextPlayer() {
    const { currentPlayer } = this.state;
    this.setState({ currentPlayer: currentPlayer + 1 }, () => {
      this.setState({
        player: this.state.playerInfo[`player${this.state.currentPlayer}`]
      });
    });
  }

  nextFrame() {
    const { currentFrame } = this.state;
    this.setState({ currentFrame: currentFrame + 1, currentPlayer: 1 }, () => {
      this.setState({
        player: this.state.playerInfo[`player${this.state.currentPlayer}`]
      });
    });
  }

  resetBowls() {
    this.setState({ currentBowl: 0 });
  }

  gameOver() {
    console.log('game over')
    this.setState({ done: true });
  }

  updateScore(pins) {
    let {
      currentBowl,
      currentFrame,
      currentPlayer,
      player,
      done,
      playerInfo
    } = this.state;
    let temp = [...player];
    if (done) {
      return;
    } else {
      this.prevMoveStore();
    }

    temp[currentFrame][currentBowl] = pins;
    this.setState({ player: temp });
    
    if (currentBowl === 0) {
      if (pins === 10) {
        if (currentFrame === 9) {
          this.nextBowl();
          return;
        } else {
          if (currentPlayer < playerInfo.players) {
            this.nextPlayer();
            return;
          } else {
            this.nextFrame();
            return;
          }
        }
      } else {
        this.nextBowl();
        return;
      }
    } else if (currentBowl === 1) {
      if (pins + player[currentFrame][0] === 10 || pins + player[currentFrame][0] === 20) {
        if (currentFrame === 9) {
          this.nextBowl();
        } else {
          if (currentPlayer < playerInfo.players) {
            this.nextPlayer();
            this.resetBowls();
            return;
          } else {
            this.nextFrame();
            this.resetBowls();
            return;
          }
        }
      } else {
        if (currentFrame === 9) {
          if(player[currentFrame][0] === 10) {
            this.nextBowl();
            return;
          } else if (currentPlayer < playerInfo.players) {
            this.nextPlayer();
            this.resetBowls();
            return;
          } else {
            this.gameOver();
            return;
          }
        } else {
          if (currentPlayer < playerInfo.players) {
            this.nextPlayer();
            this.resetBowls();
            return;
          } else {
            this.nextFrame();
            this.resetBowls();
            return;
          }
        }
      }
    } else if (currentBowl === 2) {
      if (currentPlayer < playerInfo.players) {
        this.nextPlayer();
        this.resetBowls();
        return;
      } else {
        this.gameOver();
        return;
      }
    }
  }

  resetPreviousBowl() {
    if (this.state.previousMoves.length) {
      this.setState(
        state => {
          const { previousMoves } = state;
          const previousBowl = previousMoves.pop();
          return {
            currentPlayer: previousBowl.player,
            currentFrame: previousBowl.frame,
            currentBowl: previousBowl.bowl,
            previousMoves: [...previousMoves],
            done: false
          };
        },
        () => {
          const {
            playerInfo,
            currentPlayer,
            currentFrame,
            currentBowl
          } = this.state;
          let temp = playerInfo[`player${currentPlayer}`];
          temp[currentFrame][currentBowl] = 0;
          this.setState({ player: temp });
        }
      );
    }
  }

  scoreBoards(players) {
    const { playerInfo } = this.state;
    let boards = [];
    for (let i = 1; i <= players; i++) {
      boards.push(
        <ScoreBoard
          key={i}
          score={playerInfo[`player${i}`]}
          initials={playerInfo[`player${i}name`]}
        />
      );
    }
    return boards;
  }

  render() {
    const { currentFrame, player, currentBowl, playerInfo } = this.state;
    return (
      <>
        {this.scoreBoards(playerInfo.players)}
        <View style={styles.container}>
          <ThreeFramesBoard
            player={player}
            frame={currentFrame}
            bowl={currentBowl}
          />
        </View>
        <EditScore
          updateScore={this.updateScore}
          frame={currentFrame}
          player={player}
          bowl={currentBowl}
          previous={this.resetPreviousBowl}
        />
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

//  ****Refactored updateScore from this mess****
//   if(currentBowl === 0) {
//     if(pins === 10) {
//       temp[currentFrame][currentBowl] = pins;
//       currentFrame !== 9 ? currentBowl : ++ currentBowl;
//       if(currentFrame !== 9 && currentPlayer < playerInfo.players) {
//         ++currentPlayer;
//       } else if(currentFrame !== 9) {
//         ++currentFrame;
//         currentPlayer = 1;
//       }
//       this.setState({player : temp, currentFrame, currentBowl, currentPlayer}, ()=> {this.setState({player : playerInfo[`player${currentPlayer}`]})});
//     } else {
//       temp[currentFrame][currentBowl] = pins;
//       this.setState({player : temp, currentBowl: ++currentBowl});
//     }
//   } else {
//     if(currentBowl === 2) {
//       temp[currentFrame][currentBowl] = pins;
//       this.setState({player : temp})
//       console.log(currentPlayer, playerInfo.players)
//       if(currentPlayer < playerInfo.players) {
//         ++currentPlayer;
//         currentBowl = 0;
//         this.setState({player : playerInfo[`player${currentPlayer}`], currentBowl});
//         return;
//       } else {
//         this.setState({done: true})
//       }
//     }
//     if(currentFrame === 9) {
//       temp[currentFrame][currentBowl] = pins;
//       if(pins === 10 || pins + player[currentFrame][0] === 10) {
//         ++currentBowl;
//         this.setState({player : temp, currentBowl})
//       } else {
//         this.setState({player : temp});
//         if(currentPlayer < playerInfo.players) {
//           ++currentPlayer;
//           currentBowl = 0;
//           this.setState({player : playerInfo[`player${currentPlayer}`], currentBowl})
//         } else {
//           this.setState({done: true})
//         }
//       }
//     } else {
//       temp[currentFrame][currentBowl] = pins;
//       if(currentPlayer < playerInfo.players) {
//         ++currentPlayer;
//       } else {
//         ++currentFrame;
//         currentPlayer = 1;
//       }
//       this.setState({player : temp, currentFrame, currentPlayer, currentBowl : 0}, ()=> {this.setState({player : playerInfo[`player${currentPlayer}`]})});
//     }
//   }
// }
