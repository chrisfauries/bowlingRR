import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const EditScore = (props) => {
	const {player, frame, bowl} = props;

	const choices = function() {
		let available = 10 - player[frame][0];
		if(frame === 9 && player[frame][bowl - 1] === 10) {
			available = 10;
		}
			return (
				<>
				<View style={styles.rowContainer}>
					<TouchableOpacity style={styles.pinAmount} onPress={available >= 1 ? () => {props.updateScore(1)} : () => {}}>
						<Text style={styles.pinNumber}>1</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.pinAmount} onPress={available >= 2 ? () => {props.updateScore(2)} : () => {}}>
						<Text style={styles.pinNumber}>2</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.pinAmount} onPress={available >= 3 ? () => {props.updateScore(3)} : () => {}}>
						<Text style={styles.pinNumber}>3</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.rowContainer}>
					<TouchableOpacity style={styles.pinAmount} onPress={available >= 4 ? () => {props.updateScore(4)} : () => {}}>
						<Text style={styles.pinNumber}>4</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.pinAmount} onPress={available >= 5 ? () => {props.updateScore(5)} : () => {}}>
						<Text style={styles.pinNumber}>5</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.pinAmount} onPress={available >= 6 ? () => {props.updateScore(6)} : () => {}}>
						<Text style={styles.pinNumber}>6</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.rowContainer}>
					<TouchableOpacity style={styles.pinAmount} onPress={available >= 7 ? () => {props.updateScore(7)} : () => {}}>
						<Text style={styles.pinNumber}>7</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.pinAmount} onPress={available >= 8 ? () => {props.updateScore(8)} : () => {}}>
						<Text style={styles.pinNumber}>8</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.pinAmount} onPress={available >= 9 ? () => {props.updateScore(9)} : () => {}}>
						<Text style={styles.pinNumber}>9</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.rowContainer}>
					<TouchableOpacity style={styles.strike} onPress={available >= 0 ? () => {props.updateScore(0)} : () => {}}>
						<Text style={styles.pinNumber}>0</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.strike} onPress={available >= 10 ? () => {props.updateScore(10)} : () => {}}>
						<Text style={styles.pinNumber}>10</Text>
					</TouchableOpacity>
				</View>
				</>
			)
	}

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.centerText}>How many pins did you get?</Text>
      </View>
      <View>
				{choices()}
			</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

	rowContainer : {
		flexDirection: 'row', 
		justifyContent: 'center'
	},

	pinAmount : {
		height: 50, 
		width: 50, 
		backgroundColor: '#eee', 
		borderWidth: 0.5, 
		borderColor: 'black'
	},

	strike : {
		height: 50, 
		width: 75, 
		backgroundColor: '#eee', 
		borderWidth: 0.5, 
		borderColor: 'black',
		textAlign: 'center'
	},

	pinNumber : {
		textAlign: 'center',
		fontSize: 18
	},

  centerText: {
    textAlign: "center"
  }
});

export default EditScore;
