import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';

class NotificationScreen extends React.Component {
  constrtuctor(props) {
    super(props)
  }
  static navigationOptions = () => {
    return {
      headerTitle: 'Notification',
    };
  };

  // this.inputRefs = {};

  this.state = {
    time: '',
    distance: '',
    isDateTimePickerVisible: false,
    favColor: undefined,
    items: [
      {
        label: 'Red',
        value: 'red',
      },
      {
        label: 'Orange',
        value: 'orange',
      },
      {
        label: 'Blue',
        value: 'blue',
      },
    ],
  };

  handleChangeTime = time => {
    this.setState({
      time,
    });
  };

  handleChangeDistance = distance => {
    this.setState({
      distance,
    });
  };

  _showDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: true,
    });

  _hideDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: false,
    });

  _handleDatePicked = date => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Alert: Time</Text>

        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={this._showDateTimePicker}>
            <Text>Show DatePicker</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            mode="time"
          />
        </View>

        {/*<TextInput
          style={styles.input}
          value={this.state.title}
          onChangeText={this.handleChangeTime}
          placeholder="1300"
        />*/}
        <Text style={styles.text}>Alert: Distance</Text>
        {/*<TextInput
          style={styles.input}
          value={this.state.location}
          onChangeText={this.handleChangeDistance}
          placeholder="100"
          autoCapitalize="none"
        />*/}
        <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
          <Picker.Item label="Steve" value="steve" />
          <Picker.Item label="Ellen" value="ellen" />
          <Picker.Item label="Maria" value="maria" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={this.handleSet}>
          <Text style={styles.buttonText}> Set </Text>{' '}
        </TouchableOpacity>

        <RNPickerSelect
          placeholder={{
            label: 'Select a color...',
            value: null,
          }}
          items={this.state.items}
          onValueChange={value => {
            this.setState({
              favColor: value,
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
          value={this.state.favColor}
          ref={el => {
            this.inputRefs.picker = el;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginBottom: 30,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  button: {
    backgroundColor: 'lightblue',
    width: 200,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  picker: {
    backgroundColor: 'lightblue',
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

export default NotificationScreen;
