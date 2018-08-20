import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MapView, Permissions, Location } from 'expo';
import { Marker } from 'react-native-maps';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        name={`ios-search${focused ? '' : '-outline'}`}
        size={25}
        color={tintColor}
      />
    ),
  };
  state = {
    location: null,
    destination: {
      latlng: {
        latitude: 49.285304,
        longitude: -123.112894,
      },
      title: 'School',
    },
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
    // console.log(this.state.location.timestamp);
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
        }}>
        <Marker title="Current" coordinate={this.state.location.coords} />
        <Marker
          coordinate={{
            latitude: this.state.destination.latlng.latitude,
            longitude: this.state.destination.latlng.longitude,
          }}
          title={this.state.destination.title}
        />
      </MapView>
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
