import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Constants } from 'expo';

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Settings',
    };
  };
  state = {
    distenation: '',
    notification: 100,
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('destination')}>
          <Text style={styles.text}>Destination</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.props.navigation.navigate('notification')}>
          <Text style={styles.text}>Notification </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => firebase.auth().signOut()}>
          <Text style={styles.logoutText}> Log Out </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
  },
  buttonStyle: {
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
  },
  logoutText: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  logoutButton: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
  },
});

export default SettingsScreen;
