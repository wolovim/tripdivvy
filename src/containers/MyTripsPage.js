import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Button from 'react-native-button';

const MyTripsPage = React.createClass({
  getInitialState() {
    return { tripName: '' };
  },

  handlePress() {
    console.log('submitting with: ', this.state.tripName);
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>
          TripDivvy
        </Text>

        <TextInput
          onChangeText={tripName => { this.setState({ tripName }) }}
          value={this.state.tripName}
          style={styles.input} />
        <Button style={styles.button} onPress={this.handlePress}>
          Add a Trip
        </Button>
      </View>
    );
  }
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(MyTripsPage);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fdfefb',
    flex: 1,
    marginTop: 40,
  },
  content: {
    color: '#666',
    fontSize: 26,
    margin: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#999',
    borderWidth: 1,
    height: 40,
    margin: 20,
    marginBottom: 10,
    padding: 5,
  },
  button: {
    backgroundColor: '#87c5ae',
    color: 'white',
    padding: 10,
    width: 150,
  }
});
