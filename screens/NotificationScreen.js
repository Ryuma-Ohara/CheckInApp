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

class NotificationScreen extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'Notification',
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>NotificationScreen</Text>
        <TextInput
          style={styles.input}
          value="test"
          onChangeText={this.handleNameChange}
          placeholder="User name"
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
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

export default NotificationScreen;
