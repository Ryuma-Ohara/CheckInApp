import React from 'react';
import {
  Alert,
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';

export default class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
      time: '',
      distance: '',
      items: [
        {
          label: '50m',
          value: 50,
        },
        {
          label: '100m',
          value: 100,
        },
        {
          label: '150m',
          value: 150,
        },
      ],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        distance: 50,
      });
    }, 1000);
  }

  _showDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: true,
    });

  _hideDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: false,
    });

  _handleDatePicked = date => {
    let newDate = date.toString().split(' ')[4];
    this.setState({
      time: newDate.slice(0, -3),
    });
    this._hideDateTimePicker();
  };

  handleSet = (time, distance) => {
    const { currentUser } = firebase.auth();

    firebase
      .database()
      .ref(`/users/${currentUser.uid}/settings/notification`)
      .set({ time, distance });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Alert: Time </Text>
        <View style={styles.picker}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._showDateTimePicker}>
            <Text style={styles.pickerText}>{this.state.time}</Text>
          </TouchableOpacity>
          <DateTimePicker
            is24Hour
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            mode="time"
          />
        </View>
        <View
          style={{
            paddingVertical: 5,
          }}
        />
        <Text style={styles.text}>Alert: distance</Text>
        <RNPickerSelect
          placeholder={{
            label: 'Select a distance...',
            value: null,
          }}
          items={this.state.items}
          onValueChange={value => {
            this.setState({
              distance: value,
            });
          }}
          onUpArrow={() => {
            this.inputRefs.name.focus();
          }}
          onDownArrow={() => {
            this.inputRefs.picker2.togglePicker();
          }}
          style={{
            ...pickerSelectStyles,
          }}
          value={this.state.distance}
          ref={el => {
            this.inputRefs.picker = el;
          }}
        />

        <TouchableOpacity
          style={styles.setButton}
          onPress={() => this.handleSet(this.state.time, this.state.distance)}
          // onPress={() => console.log(this.state.time.split(' ')[4])}
        >
          <Text style={styles.setButtonText}>Set</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    height: 45,
    marginBottom: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  pickerText: {
    paddingLeft: 5,
    fontSize: 16,
    textAlignVertical: 'center',
  },
  setButton: {
    marginTop: 30,
    backgroundColor: 'lightblue',
    width: 200,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  setButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  text: {
    marginBottom: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
});
