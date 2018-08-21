import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  DatePickerIOS,
} from 'react-native';

class NotificationScreen extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'Notification',
    };
  };

  state = {
    time: '',
    distance: '',
  };

  handleChangeTime = time => {
    this.setState({
      time,
    });
  };

  handleChangeDistance = distance => {
    this.setState({
      distance,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Alert: Time</Text>
        <TextInput
          style={styles.input}
          value={this.state.title}
          onChangeText={this.handleChangeTime}
          placeholder="1300"
        />
        <Text style={styles.text}>Alert: Distance</Text>
        <TextInput
          style={styles.input}
          value={this.state.location}
          onChangeText={this.handleChangeDistance}
          placeholder="100"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSet}>
          <Text style={styles.buttonText}> Set </Text>{' '}
        </TouchableOpacity>{' '}
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
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginBottom: 30,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  button: {
    backgroundColor: 'lightblue',
    width: 200,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default NotificationScreen;
