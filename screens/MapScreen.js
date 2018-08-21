import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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

  getDistance = () => {
    let currentLa = (this.state.location.coords.latitude * Math.PI) / 180;
    let currentLo = (this.state.location.coords.longitude * Math.PI) / 180;
    let targetLa = (this.state.destination.latlng.latitude * Math.PI) / 180;
    let targetLo = (this.state.destination.latlng.longitude * Math.PI) / 180;

    let equatorRadius = 6378137.0;

    let averageLat = (currentLa - targetLa) / 2;
    let averageLon = (currentLo - targetLo) / 2;
    let distance =
      equatorRadius *
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(averageLat), 2) +
            Math.cos(currentLa) *
              Math.cos(targetLa) *
              Math.pow(Math.sin(averageLon), 2)
        )
      );
    return distance / 1000;
    console.log(distance);
  };

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
        }}>
        <Marker title="Current" coordinate={this.state.location.coords} />
        <Marker
          coordinate={{
            latitude: this.state.destination.latlng.latitude,
            longitude: this.state.destination.latlng.longitude,
          }}
          title={this.state.destination.title}
        />
        <Text style={styles.text}>
          {Math.floor(this.getDistance() * 1000) + 'm'}
        </Text>
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
  text: {
    marginTop: 20,
    marginLeft: 20,
  },
});
