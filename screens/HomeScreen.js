import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ImageBackground
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import bgPic from '../assets/images/bg.jpg';

const styles = StyleSheet.create({
  adjustContainer: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    // backgroundColor: '#EEE'
  },

  makeBigger :{
    color: 'green',
    fontSize: 30,
    fontWeight: 'bold'
  },

  options: {
    flex: 3,
    justifyContent: "center",
    backgroundColor: 'rgba(255,255,255,0.3)'
    // backgroundColor: '#DDD'
  },

  players: {
    height: 50,
    width: 150, 
    backgroundColor: '#f3e5f5',
  }
})

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
    this.startGame = this.startGame.bind(this);
    this.state = {
      players: null
    }
  }

  handlePlayerSelect(number) {
    this.setState({
      players : number
    })
  }s

  startGame() {
    this.props.navigation.navigate("Scores");
  }

  render() {
    let p1Input = null;
    let p2Input = null;
    let p3Input = null;
    let p4Input = null;
    let start = null;
    let inputs = function() {
      let arr = [];
      for(let i=0; i< this.state.players; i++) {
        arr.push(<TextInput style={{width: '23%', backgroundColor: 'rgba(255,255,255,0.3)', textAlign:'center'}} placeholderTextColor='black' blurOnSubmit={i+1 === this.state.players ? true : false} onSubmitEditing={i+1 === this.state.players ? () => {this.start.props.onPress()} : () => {this[`p${i+2}input`].focus(); }} key={i} returnKeyType={i+1 === this.state.players ? 'done' : 'next'} stlye={{height: 40}} maxLength={3} placeholder={'player ' + (i + 1) + ' Initials'} ref={(input) => { this[`p${i+1}input`] = input} } onChangeText={(text) => this.setState({[`player${i+1}name`]: text})} />)
      }
      return arr;
    }.bind(this)
    console.log(this.state)
  return (
    <>
    <ImageBackground source={ bgPic } style={{width: '100%', height: '100%'}}>
    <View style={styles.options}>
      <View style={{height: 50, paddingBottom: 16, alignItems: 'center'}}>
        <Text style={{fontSize: 24, color: 'white'}}># of Players</Text>
      </View>
      <View style={{flex: 1,height: 100,width: 100, alignSelf: "center"}}>
        <Button title='1' color={this.state.players === 1 ? '#bbdefb' : ''} onPress={()=> {this.handlePlayerSelect(1)}} />
        <Button title='2' color={this.state.players === 2 ? '#bbdefb' : ''} onPress={()=> {this.handlePlayerSelect(2)}} />
        <Button title='3' color={this.state.players === 3 ? '#bbdefb' : ''} onPress={()=> {this.handlePlayerSelect(3)}} />
        <Button title='4' color={this.state.players === 4 ? '#bbdefb' : ''} onPress={()=> {this.handlePlayerSelect(4)}} />
      </View>
    {this.state.players ?(
    <View style={{flex: 2, alignItems: "center"}}>
      {inputs()}
      <Button ref={input => this.start = input} title='Start' onPress={()=> {this.startGame()}}></Button>
    </View>
    ) : (
      <></>
    )}
    </View>
    </ImageBackground>
  </>
  );
  }
}

HomeScreen.navigationOptions = {
  title: 'New Game',
};
