import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons name={'map-pin'} size={25} color={tintColor} />
    ),
  };
  state = {
    location: null,
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.error('Location permission not granted!');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location,
    });
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  render() {
    if (!this.state.location) {
      return <View />;
    }
    return (
      <MapView
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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
});
