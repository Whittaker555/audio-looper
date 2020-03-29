import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import AudioComponent from './AudioComponent'


class App extends Component{
  state = {
    hasGrantedMicPermission: false,
    title: 'Hello'
  }

  async componentDidMount() {
    this.micAccess()
  }

  micAccess = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    if (status === 'granted') {
      this.setState({ hasGrantedMicPermission: true })
    }
  }

  render() {
    const {
      hasGrantedMicPermission,
    } = this.state;

    if (
      hasGrantedMicPermission === false
    ) {
      return (
        <View style={{ flex: 1, marginTop: 100 }}>
          <Text>No access to mic!</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>        
          <Image source={require('./assets/cassette.png')} style={styles.image} />
          <AudioComponent title={'1'} file={require('./assets/sounds/1.wav') }/>
          <AudioComponent title={'2'} file={require('./assets/sounds/2.wav') }/>
          <AudioComponent title={'3'} file={require('./assets/sounds/3.wav') }/>
          <AudioComponent title={'4'} file={require('./assets/sounds/4.wav') }/>
          <AudioComponent title={'5'} file={require('./assets/sounds/kal.wav') }/>
          <AudioComponent title={'6'} file={require('./assets/sounds/moog.wav') }/>
        </View>

      )
    }
  }
}
export default App

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },


  image: {
    resizeMode: "stretch",
    width: '100%',
    height: 200,
  },
})