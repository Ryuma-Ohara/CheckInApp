import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import Expo from 'expo';
// import store from '../redux/store';
import { connect } from 'react-redux';
import { setDestination } from '../redux/actions';
class DestinationScreen extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'Destination',
    };
  };

  state = {
    location: '',
    title: '',
    longitude: null,
    latitude: null,
  };

  handleChangeTitle = title => {
    this.setState({ title: title });
  };

  handleChangeAddress = location => {
    this.setState({
      location,
    });
  };

  handleSet = async () => {
    try {
      const position = await Expo.Location.geocodeAsync(this.state.location);
      this.setState({
        longitude: position[0].longitude,
        latitude: position[0].latitude,
      });
      const { currentUser } = firebase.auth();
      firebase
        .database()
        .ref(`/users/${currentUser.uid}/settings/destination`)
        .set({
          title: this.state.title,
          longitude: position[0].longitude,
          latitude: position[0].latitude,
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.state);

    // this.props.destination
    // this.props.setDestinattion({})
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Name of the destination</Text>
        <TextInput
          style={styles.input}
          value={this.state.title}
          onChangeText={this.handleChangeTitle}
          placeholder="School"
        />
        <Text style={styles.text}> Address of the destination</Text>
        <TextInput
          style={styles.input}
          value={this.state.location}
          onChangeText={this.handleChangeAddress}
          placeholder="Ex. 2345 West 33nd avenue"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSet}>
          <Text style={styles.buttonText}>Set</Text>
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
});

export default DestinationScreen;

// const mapStateToProps = state => ({
//   destination: state.destination,
// });
// export default connect(
//   mapStateToProps,
//   { setDestination }
// )(DestinationScreen);
