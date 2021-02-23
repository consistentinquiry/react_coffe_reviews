import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

class Search extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      token: '',
      searchTerm: '',
    };
  }
  render() {
    return (
      <View>
        <View style={styles.box}>
          <Text> Search: </Text>
          <TextInput
            onChangeText={(text) => this.setState({searchTerm: text})}
          />
        </View>
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: '#777',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
});

export default Search;
