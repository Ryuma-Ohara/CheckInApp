import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from 'firebase';
// import { Constants } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';

class CheckOutScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons name={'ios-log-out'} size={25} color={tintColor} />
    ),
  };

  state = {
    date: '',
    time: '',
    isArrived: true,
  };

  componentDidMount() {
    this.Clock = setInterval(() => this.getTime(), 1000);

    // const { currentUser } = firebase.auth();
    // const isArrived = firebase
    //   .database()
    //   .ref(`/users/${currentUser.uid}/checkinout`)
    //   .once('value');
    // this.setState({
    //   isArrived,
    // });
  }

  componentWillMount() {
    clearInterval(this.Clock);
  }

  getTime() {
    let date, day, type, hour, minutes, seconds, fullTime;

    date = new Date();
    day =
      date.getFullYear().toString() +
      '/' +
      (date.getMonth() + 1).toString() +
      '/' +
      date.getDate().toString();

    hour = date.getHours();
    // if (hour <= 11) {
    //   type = 'AM';
    // } else {
    //   type = 'PM';
    // }

    // if (hour > 12) {
    //   hour = hour - 12;
    // }

    // if (hour === 0) {
    //   hour = 12;
    // }

    minutes = date.getMinutes();

    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }

    seconds = date.getSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }

    fullTime =
      // type.toString() +
      // ' ' +
      hour.toString() + ':' + minutes.toString() + ':' + seconds.toString();

    this.setState({
      date: day,
      time: fullTime,
    });
  }

  setTime = (date, time) => {
    const { currentUser } = firebase.auth();

    // this.setState({
    //   isArrived: false,
    // });

    firebase
      .database()
      .ref(`/users/${currentUser.uid}/checkinout`)
      .update({
        isArrived: false,
      });

    firebase
      .database()
      .ref(`/users/${currentUser.uid}/checkinout/checkout`)
      .push({
        date,
        time,
      });

    Alert.alert(
      `${this.state.date} \n ${this.state.time.toString().slice(0, -3)}`
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> {this.state.date} </Text>
        <Text style={styles.timeText}> {this.state.time} </Text>
        <TouchableOpacity
          disabled={this.state.isArrived ? false : true}
          style={styles.buttonStyle}
          onPress={() =>
            this.setTime(this.state.date, this.state.time.slice(0, -3))
          }>
          <Text style={styles.text}> CheckOut </Text>
        </TouchableOpacity>
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
  buttonStyle: {
    width: 200,
    height: 200,
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 100,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  timeText: {
    fontSize: 26,
    textAlign: 'center',
    color: 'blue',
    marginBottom: 20,
  },
});

export default CheckOutScreen;
