import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';

class CheckOutScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => console.log('clicked')}>
          <Text style={styles.text}> CheckOut </Text>
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

export default CheckOutScreen;
