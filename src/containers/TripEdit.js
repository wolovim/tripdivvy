import React, {
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { createTrip } from '../actions/';

const TripEdit = React.createClass({
  getInitialState() {
    return { newTraveler: '', travelers: ['Me'] };
  },

  renderTravelers() {
    return this.state.travelers.map((traveler, index) => {
      return (
        <View key={index} style={styles.travelerContainer}>
          <Text>{traveler}</Text>
        </View>
      )
    });
  },

  addTraveler() {
    this.setState({
      travelers: this.state.travelers.concat(this.state.newTraveler),
      newTraveler: ''
    });
  },

  handleCreateTrip() {
    const data = {
      name: this.props.tripName,
      travelers: this.state.travelers
    };
    this.props.dispatch(createTrip(data));
    this.props.navigator.push({
      name: 'trip',
      passProps: { tripName: this.props.tripName }
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.tripName}
        </Text>

        <TouchableOpacity style={styles.backBtn} onPress={() => { return this.props.navigator.pop(); }}>
          <Text style={styles.backText}>
            {'< Trips'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.content}>
          This will be the trip edit page.
        </Text>

        <View>
          <TextInput
            onChangeText={newTraveler => { this.setState({ newTraveler }) }}
            placeholder='Add a traveler'
            value={this.state.newTraveler}
            style={styles.input} />
          <Button style={styles.button} onPress={this.addTraveler}>+</Button>
        </View>

        {this.renderTravelers()}

        <Button style={styles.button} onPress={this.handleCreateTrip}>Create Trip</Button>
      </View>
    );
  }
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(TripEdit);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdfefb',
    flex: 1,
  },
  backBtn: {
    marginTop: -25,
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  backText: {
    color: '#666',
    fontSize: 18,
    marginLeft: 10,
  },
  title: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#666',
    fontSize: 26,
    marginTop: 40,
    textAlign: 'center',
  },
  content: {
    color: '#666',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#999',
    borderWidth: 1,
    height: 50,
    margin: 20,
    marginBottom: 20,
    padding: 15,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#87c5ae',
    color: 'white',
    marginTop: 20,
    padding: 15,
    width: 200,
  },
  travelerContainer: {
    height: 40,
  },
});
