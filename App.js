import React from 'react';
import { View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
import firebase from 'firebase';
import CheckInScreen from './screens/CheckInScreen';
import MapScreen from './screens/MapScreen';
import CheckOutScreen from './screens/CheckOutScreen';
import SettingsScreen from './screens/SettingsScreen';
import DestinationScreen from './screens/DestinationScreen';
import NotificationScreen from './screens/NotificationScreen';
import TimeManagementScreen from './screens/TimeManagementScreen';
import LoginForm from './components/LoginForm';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Spinner } from './components/common';

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
    Time: TimeManagementScreen,
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
  }
  // {
  //   initialRouteName: 'CheckIn',
  // }
);

export default class App extends React.Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCqa4nIplb6kK9sd7SlClGVH4NhJUPmI3g',
      authDomain: 'checkin-9394a.firebaseapp.com',
      databaseURL: 'https://checkin-9394a.firebaseio.com',
      projectId: 'checkin-9394a',
      storageBucket: 'checkin-9394a.appspot.com',
      messagingSenderId: '225614316012',
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return <AppNavigator />;
      case false:
        return (
          // <Provider store={store}>
            <LoginForm />
          // </Provider>
        );
      default:
        return <Spinner size="large" />;
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        {this.renderContent()}
      </View>
    );
  }
}
