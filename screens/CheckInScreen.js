import React from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';

class CheckInScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => console.log('clicked')}>
          <Text style={styles.text}>CheckIn</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    height: 80,
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 50,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default CheckInScreen;
