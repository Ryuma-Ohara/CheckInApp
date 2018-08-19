import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Constants } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={`ios-settings${focused ? '' : '-outline'}`}
        size={25}
        color={tintColor}
      />
    ),
  };
  state = {
    distenation: '',
    notification: 100,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    marginVertical: 20,
    marginHorizontal: 20,
  },
});

export default SettingsScreen;
