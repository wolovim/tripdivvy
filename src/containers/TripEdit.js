import React, {
  Alert,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { addTraveler, createTrip } from '../actions/';

const TripEdit = React.createClass({
  getInitialState() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      newTraveler: '',
      travelers: ds.cloneWithRows(this.props.travelers.list)
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      travelers: this.state.travelers.cloneWithRows(nextProps.travelers.list)
    });
  },

  renderRow(traveler) {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.travelerName}>{traveler}</Text>
      </View>
    );
  },

  addTraveler() {
    if (this.state.newTraveler === '') {
      return Alert.alert('Who?', 'The traveler must have a name!');
    }

    this.props.dispatch(addTraveler(this.state.newTraveler));
    this.setState({ newTraveler: '' });
  },

  handleCreateTrip() {
    const data = {
      name: this.props.tripName,
      travelers: this.props.travelers.list,
      expenses: []
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

        <View>
          <TextInput
            onChangeText={newTraveler => { this.setState({ newTraveler }) }}
            placeholder='Add a traveler'
            value={this.state.newTraveler}
            style={styles.input} />
          <Button style={styles.button} onPress={this.addTraveler}>+</Button>
        </View>

        <ListView
          style={styles.travelerList}
          dataSource={this.state.travelers}
          renderRow={this.renderRow} />

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
    backgroundColor: '#F5FAF2',
    flex: 1,
  },
  backBtn: {
    alignItems: 'flex-start',
    marginBottom: 20,
    marginTop: -28,
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
    fontWeight: 'bold',
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
  travelerList: {
    marginTop: 20,
    borderColor: '#c0ded3',
    borderTopWidth: 2,
    backgroundColor: 'white',
  },
  rowContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: '#c0ded3',
    flex: 1,
    flexDirection: 'row',
    padding: 25,
  },
  travelerName: {
    flex: 1,
    color: '#666',
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
