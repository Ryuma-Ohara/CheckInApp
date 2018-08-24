import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

let checkinkey, arrival;
class CheckInScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons name={'ios-log-in'} size={25} color={tintColor} />
    ),
  };

  state = {
    date: '',
    time: '',
    isArrived: false,
    timeKeys: ['kafjojoa'],
  };

  componentWillMount() {
    clearInterval(this.Clock);

    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/checkinout`)
      .once('value')
      .then(snapshot => {
        arrival = snapshot.child('isArrived').val();
        console.log(arrival);
      });
    this.setState({ isArrived: arrival });
  }

  componentDidMount() {
    this.Clock = setInterval(() => this.getTime(), 1000);
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

  setTime = (date, time, timeKeys) => {
    console.log(timeKeys);
    const { currentUser } = firebase.auth();

    firebase
      .database()
      .ref(`/users/${currentUser.uid}/checkinout`)
      .update({
        isArrived: true,
      });

    checkinkey = firebase
      .database()
      .ref(`/users/${currentUser.uid}/checkinout/checkin`)
      .push({
        date,
        time,
      }).key;

    this.setState(prevState => ({
      timeKeys: [...this.state.timeKeys, checkinkey],
    }));

    Alert.alert(
      `${this.state.date} \n ${this.state.time.toString().slice(0, -3)}`
    );
  };

  render() {
    // console.log(this.state.timeKeys);
    return (
      <View style={styles.container}>
        <Text> {this.state.date} </Text>
        <Text style={styles.timeText}> {this.state.time} </Text>
        <TouchableOpacity
          // disabled={this.state.isArrived ? true : false}
          style={styles.buttonStyle}
          onPress={() =>
            this.setTime(
              this.state.date,
              this.state.time.slice(0, -3),
              this.state.timekeys
            )
          }>
          <Text style={styles.text}>CheckIn</Text>
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

export default CheckInScreen;
