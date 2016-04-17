import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Button from 'react-native-button';
import { getTrips, createTrip } from '../actions/';
import TripListItem from './TripListItem';

const MyTripsPage = React.createClass({
  getInitialState() {
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    return {
      tripName: '',
      trips: ds.cloneWithRows([])
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
    this.props.dispatch(createTrip(this.state.tripName));
    this.setState({ tripName: '' });
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>
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

        <ListView
          style={styles.tripList}
          dataSource={this.state.trips}
          renderRow={trip => { return <TripListItem trip={trip} /> }} />
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
  },
  content: {
    color: '#666',
    fontSize: 26,
    marginTop: 40,
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
    backgroundColor: '#87c5ae',
    color: 'white',
    padding: 15,
    width: 150,
  },
  tripList: {
    alignSelf: 'stretch',
    flex: 1,
    marginTop: 20,
  },
});
