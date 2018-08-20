import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import CheckInScreen from './screens/CheckInScreen';
import MapScreen from './screens/MapScreen';
import CheckOutScreen from './screens/CheckOutScreen';
import SettingsScreen from './screens/SettingsScreen';
import DestinationScreen from './screens/DestinationScreen';
import NotificationScreen from './screens/NotificationScreen';

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  destination: DestinationScreen,
  notification: NotificationScreen,
});

const AppNavigator = createBottomTabNavigator(
  {
    CheckIn: CheckInScreen,
    Map: MapScreen,
    CheckOut: CheckOutScreen,
    Settings: SettingsStack,
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
