import React, {
  Alert,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Button from 'react-native-button';
import { getTrips } from '../actions/';
import { includes } from 'lodash';
import TripListItem from '../components/TripListItem';

const Trips = React.createClass({
  getInitialState() {
    return {
      tripName: '',
      trips: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
    };
  },

  componentWillMount() {
    this.props.dispatch(getTrips());
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      trips: this.state.trips.cloneWithRows(nextProps.trips.list)
    });
  },

  handlePress() {
    const { tripName } = this.state;
    if (tripName === '') {
      return Alert.alert('You went where?', 'Your trip must have a name!');
    }
    if (includes(this.props.trips.list.map(trip => { return trip.name }), tripName)) {
      return Alert.alert('Again?', 'A trip with this name already exists!');
    }

    this.props.navigator.push({
      name: 'tripEdit',
      passProps: {
        tripName,
        isNewTrip: true
      }
    });
    this.setState({ tripName: '' });
  },

  renderTrips() {
    if (this.state.trips._cachedRowCount === 0) {
      return (
        <View style={styles.noTripsContainer}>
          <Text style={styles.noTripsTitle}>No trips yet!</Text>
          <Text style={styles.noTripsText}>Got the itch to get out?</Text>
        </View>
      );
    }

    return (
      <ListView
        style={styles.tripList}
        dataSource={this.state.trips}
        enableEmptySections={true}
        renderRow={trip => { return <TripListItem navigator={this.props.navigator} trip={trip} /> }} />
    );
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topHalf}>
          <Text style={styles.title}>
            TripDivvy
          </Text>

          <TextInput
            onChangeText={tripName => { this.setState({ tripName }) }}
            placeholder='My trip name'
            value={this.state.tripName}
            style={styles.input} />

          <Button style={styles.button} onPress={this.handlePress}>
            Add a Trip
          </Button>
        </View>

        <View style={styles.bottomHalf}>
          {this.renderTrips()}
        </View>
      </View>
    );
  }
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Trips);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FAF2',
    flex: 1,
  },
  topHalf: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#c0ded3',
    paddingBottom: 20,
  },
  bottomHalf: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  title: {
    color: '#666',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#999',
    borderWidth: 1,
    height: 50,
    margin: 20,
    marginBottom: 15,
    padding: 15,
  },
  button: {
    backgroundColor: '#87c5ae',
    color: 'white',
    padding: 15,
    width: 150,
  },
  tripList: {
    alignSelf: 'stretch',
  },
  noTripsContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  noTripsTitle: {
    color: '#666',
    fontWeight: 'bold',
  },
  noTripsText: {
    color: '#666',
  },
});
