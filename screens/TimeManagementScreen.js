import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import Ionicons from 'react-native-vector-icons/Ionicons';

let date, time;

class TimeManagementScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons name={'ios-paper'} size={25} color={tintColor} />
    ),
  };

  state = {
    date1: '',
    time1: '',
  };

  componentWillMount() {
    const { currentUser } = firebase.auth();

    firebase
      .database()
      .ref(`/users/${currentUser.uid}/checkinout/checkin/-LKedtrl2Kytm3QF8YuA`)
      .once('value')
      .then(snapshot => {
        date = snapshot.child('date').val();
        time = snapshot.child('time').val();
        console.log(date);
      });
    this.setState({ date1: date, time1: time });
  }

  render() {
    let tableHead = ['Date', 'Checkin', 'Checkout', 'Hours'];
    let tableData = [
      [],
      ['2018\n08/12', '12:50', '17:03', '4:03'],
      ['2018\n08/13', '12:57', '17:01', '4:01'],
      ['2018\n08/17', '13:12', '17:23', '4:11'],
      ['2018\n08/18', '12:50', '17:00', '4:00'],
      ['2018\n08/19', '12:59', '17:05', '4:05'],
    ];
    // tableData[0][0].push(date, time);
    return (
      <View style={styles.container}>
        <Table
          borderStyle={{
            borderWidth: 2,
            borderColor: '#c8e1ff',
          }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
  },
});

export default TimeManagementScreen;
