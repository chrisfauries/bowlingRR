import React,{useState} from "react";
import { View, Text, StyleSheet } from "react-native";

const ScoreBoard = (props) => {
	const { score, initials } = props;
	const [subTotals, setSubtotals] = useState([0,0,0,0,0,0,0,0,0])
	function buildBoard() {
		let arr = [];
		for(let i = 0; i <= 8; i++) {
			arr.push(
				<View key={i} style={styles.frame}>
					<Text style={styles.frameNumber}>{i + 1}</Text>
        	<Text style={styles.textCenter}>{total(i)}</Text>
					<Text style={styles.subTotal}>{subTotals[i]}</Text>
      	</View>
			)
		}
		let lastFrame = '';
		if(score[9][0] === 10 && score[9][1] === 10 && score[9][2] === 10) {
			lastFrame += 'X X X';
		} else if(score[9][0] === 10 && score[9][1] === 10 && score[9][2] !== 10) {
			lastFrame += 'X X ' + score[9][2] ? score[9][2] : '-';
		}else if(score[9][0] === 10 && score[9][1] < 10 && (score[9][1] + score[9][2] === 10)) {
			lastFrame += 'X /' ;
		} else if(score[9][0] < 10 && (score[9][0] + score[9][1] === 10)) {
			lastFrame += '/'
			if(score[9][2] === 10) {
				lastFrame += ' X';
			} else {
				lastFrame += ' ' + score[9][2] ? score[9][2] : '-'
			}
		} else if(score[9][0] === 10 && score[9][1] < 10)  {
			lastFrame += 'X';
			if(score[9][1] + score[9][2] !== 10) {
				lastFrame += ' | ';
				lastFrame += score[9][1] ? score[9][1] : '-';
				lastFrame += ' | ';
				lastFrame += score[9][2] ? score[9][2] : '-';
			}
		} else if((score[9][0] + score[9][1]) !== 10) {
			lastFrame += score[9][0] ? score[9][0] : '-';
			lastFrame += ' | ';
			lastFrame += score[9][1] ? score[9][1] : '-';
			lastFrame += ' | ';
			if(score[9][2] === 10) {
				lastFrame += ' X';
			} else {
				lastFrame += score[9][2] ? score[9][2] : '-'
			}
		}
		arr.push(
			<View key={9} style={styles.lastFrame}>
				<Text style={styles.frameNumber}>{10}</Text>
				<Text style={styles.textCenter}>{lastFrame}</Text>
			</View>
		)
		return arr;
	}

	function total(index) {
		if(score[index][0] === 10) {
			return 'X';
		} else if(score[index][0] + score[index][1] === 10) {
			return '/';
		}  else if(score[index][0] + score[index][1] === 0) {
			return '-';
		} else {
			return score[index][0] + score[index][1];
		}
	}

	function totalScore() {
		let total = 0;
		let arr = [];
		// first 8 frames
		for(let i = 0; i < score.length - 2 ; i++) {
				if(score[i][0] === 10) {
					total += 10;
					if(score[i + 1][0] === 10) {
						total += 10;
						total += score[i + 2][0];
					} else {
						total += score[i + 1][0] + score[i + 1][1];
					}
					arr[i] = total;
					continue;
				} else if(score[i][0] + score[i][1] === 10) {
					total += 10;
					total += score[i + 1][0];
					arr[i] = total;
				} else {
					total += score[i][0] + score[i][1];
					arr[i] = total;
				}
			}
			// 9th frame
			if(score[8][0] === 10) {
				total += 10;
				total += score[9][0] + score[9][1];
			} else if (score[8][0] + score[8][1]) {
				total += 10 + score[9][0];
			} else {
				total += score[8][0] + score[8][1];
			}
			arr[8] = total;
			
			//10th frame
			total += score[9].reduce((a,b) => a + b);
			arr[9] = total;
			if(subTotals[9] !== total) {
				setSubtotals(arr);
			}
			return (			<View style={styles.lastFrame}>
			<Text style={styles.textCenter}>{total}</Text>
		</View>);
	}

  return (
    <View style={styles.framesContainer}>
      <Text>{initials} </Text>
			{buildBoard()}
			{totalScore()}
    </View>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    textAlign: "center"
  },

  framesContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },

  frame: {
    width: 25,
    height: 25,
    backgroundColor: "#eee",
    borderWidth: 0.5,
    borderColor: "black"
	},
	
  lastFrame: {
    width: 50,
    height: 25,
    backgroundColor: "#eee",
    borderWidth: 0.5,
    borderColor: "black"
	},
	
	subTotal : {
		position: 'absolute',
		bottom: 0,
		right: 2,
		fontSize: 6
	},

	frameNumber : {
		position: 'absolute',
		fontStyle : 'italic',
		top: 0,
		left: 2,
		fontSize: 6
	}
});

export default ScoreBoard;
