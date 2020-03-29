import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, Switch, Button } from 'react-native'
import { Audio } from 'expo-av';

class AudioComponent extends Component {
  state = {
    fileLoaded: false,
    playingStatus: "nosound",
    file: this.props.file,
    mutedState: false,
    loopState: true
  };

  async _playRecording() {
    const { sound } = await Audio.Sound.createAsync(
      this.state.file,
      {
        shouldPlay: false,
        isLooping: this.state.loopState,
        isMuted: this.state.mutedState
      },
      this._updateScreenForSoundStatus,
    );
    this.sound = sound;
    this.sound.playAsync();

    this.setState({
      fileLoaded: true,
      playingStatus: 'playing'
    });
  }
  async _pauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == 'playing') {
        await this.sound.pauseAsync();
        this.setState({
          playingStatus: 'donepause',
        });
      } else {
        await this.sound.playAsync();
        this.setState({
          playingStatus: 'playing'
        });
      }
    }
  }

  _playAndPause = () => {
    switch (this.state.playingStatus) {
      case 'nosound':
        this._playRecording();
        break;
      case 'donepause':
      case 'playing':
        this._pauseAndPlayRecording();
        break;
    }
  }

  _mute = async () =>{
    let muted = this.state.mutedState;
    this.setState({
      mutedState: !muted
    })
    if(this.state.fileLoaded){
      await this.sound.setIsMutedAsync(!muted);
    }
  }

  _loop = () =>{
    let loop = this.state.loopState;
    this.setState({
      loopState: !loop
    })
    if(this.state.fileLoaded){
      this.sound.setStatusAsync({ positionMillis: 0, shouldPlay: false})
      this.sound.setIsLoopingAsync(!loop);
    }
  }


  render() {
    let mutedState = this.state.mutedState ? 'UNMUTE' : 'MUTE';
    let loopState = this.state.loopState;
    let playing = this.state.playingStatus === 'playing' ? 'Pause' : 'Play';
    return (
      <View style={styles.audioUnit}>
        <Text>{this.props.title}</Text>
        <View style={styles.textView}>
            

            <Button 
              onPress={this._playAndPause}
              title={playing}
            /> 
            <Button
              onPress={this._mute}
              title={mutedState}
            />
            <Text>Loop</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={loopState ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this._loop}
              value={loopState}
            /> 
        </View>
      </View>
    )
  }
}

export default AudioComponent

const styles = StyleSheet.create({
  audioUnit: {
    backgroundColor: 'powderblue',
    width: '100%',
    maxWidth: 1000,
    height: 100,
    justifyContent: 'center',
    margin: 'auto'
  },

  textView:{
    flex: 1, 
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection:'row', 
    flexWrap:'wrap'
  }
  
})
