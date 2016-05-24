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
import TripListItem from './TripListItem';

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

    this.props.navigator.push({
      name: 'tripEdit',
      passProps: { tripName }
    });
    this.setState({ tripName: '' });
  },

  render() {
    return (
      <View style={styles.container}>
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

        <ListView
          style={styles.tripList}
          dataSource={this.state.trips}
          enableEmptySections={true}
          renderRow={trip => { return <TripListItem navigator={this.props.navigator} trip={trip} /> }} />
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
    alignItems: 'center',
    backgroundColor: '#F5FAF2',
    flex: 1,
  },
  title: {
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
    marginTop: 20,
  },
});
