import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import AudioComponent from './AudioComponent'


const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;
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
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>        
          <AudioComponent title={'drums'} file={require('./assets/sounds/whoosh.wav') }/>
          <AudioComponent title={'kalimba'} file={require('./assets/sounds/kal.wav') }/>
          <AudioComponent title={'moog'} file={require('./assets/sounds/moog.wav') }/>
        </View>

      )
    }
  }
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  image: {
    width: '100%',
    height: '10%'
  }
})