import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RNCamera} from 'react-native-camera';

class CoffeeCam extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 16}}>CAPTURE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    //Async task to take a picture and save the item in Async storage
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      await AsyncStorage.setItem('review_img_uri', JSON.stringify(data.uri));
      Alert.alert('Snap!');
      console.log('uri:' + data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},
  preview: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default CoffeeCam;
