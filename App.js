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
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    // Settings: SettingsStack,
    Settings: {
      screen: SettingsStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => (
          <Ionicons
            name={`ios-settings${focused ? '' : '-outline'}`}
            size={25}
            color={tintColor}
          />
        ),
      }),
    },
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
