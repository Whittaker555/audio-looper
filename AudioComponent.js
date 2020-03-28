import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Audio } from 'expo-av';

class AudioComponent extends Component {
    state = {
        playingStatus: "nosound",
        file: this.props.file
      };
      
      async _playRecording() {
        const { sound } = await Audio.Sound.createAsync(
          this.state.file,
          {
            shouldPlay: true,
            isLooping: true,
          },
          this._updateScreenForSoundStatus,
        );
        this.sound = sound;
        this.setState({
          playingStatus: 'playing'
        });
      }
      async _pauseAndPlayRecording() {
        if (this.sound != null) {
          if (this.state.playingStatus == 'playing') {
            console.log('pausing...');
            await this.sound.pauseAsync();
            console.log('paused!');
            this.setState({
              playingStatus: 'donepause',
            });
          } else {
            console.log('playing...');
            await this.sound.playAsync();
            console.log('playing!');
            this.setState({
              playingStatus: 'playing',
            });
          }
        }
      }
      _syncPauseAndPlayRecording() {
        if (this.sound != null) {
          if (this.state.playingStatus == 'playing') {
            this.sound.pauseAsync();
          } else {
            this.sound.playAsync();
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
    render() {
        
        return (
           <View style={styles.audioUnit}>
               <TouchableOpacity onPress={this._playAndPause}>
                    <Image source={require('./assets/cassette.png')}  style={styles.image}/>  
                    <Text>{this.props.title} {this.state.playingStatus}</Text>
                </TouchableOpacity>
           </View>
        )
    }
}

export default AudioComponent

const styles = StyleSheet.create({
    audioUnit: {
      backgroundColor: 'powderblue',
      width: '100%',
    height: '30%'
    },

  image: {
    width: '100%',
    height: '40%'
  }})
  