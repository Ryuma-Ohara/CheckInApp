import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Constants } from 'expo';

class DestinationScreen extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'Destination',
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>DestinationScreen</Text>
        <TextInput
          style={styles.input}
          // value="test"
          onChangeText={this.handleNameChange}
          placeholder="Ex. 2345 West 33nd avenue"
          autoCapitalize="none"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  text: {
    paddingTop: 60,
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
});

export default DestinationScreen;
