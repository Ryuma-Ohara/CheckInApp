import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import CheckInScreen from './screens/CheckInScreen';
import MapScreen from './screens/MapScreen';
import CheckOutScreen from './screens/CheckOutScreen';
import SettingsScreen from './screens/SettingsScreen';

const AppNavigator = createBottomTabNavigator(
  {
    CheckIn: CheckInScreen,
    Map: MapScreen,
    CheckOut: CheckOutScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'CheckIn',
  }
);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
