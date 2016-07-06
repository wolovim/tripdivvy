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
import {
  addTravelerToNewTrip,
  addTravelerToTrip,
  createTrip,
  deleteTrip
} from '../actions/';

const TripEdit = React.createClass({
  getInitialState() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      newTraveler: '',
      travelers: ds.cloneWithRows(this.props.travelers.list)
    };
  },

  componentWillMount() {
    if (this.props.isNewTrip) { return; }
    this.setState({ travelers: this.state.travelers.cloneWithRows(this.props.trip.travelers) });
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.isNewTrip) {
      this.setState({
        travelers: this.state.travelers.cloneWithRows(nextProps.travelers.list)
      });
    } else {
      this.setState({
        travelers: this.state.travelers.cloneWithRows(nextProps.trip.travelers)
      });
    }
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
      return Alert.alert('Who?', 'Your friend must have a name!');
    }

    if (this.props.isNewTrip) {
      this.props.dispatch(addTravelerToNewTrip(this.state.newTraveler));
    } else {
      this.props.dispatch(addTravelerToTrip(this.props.tripName, this.state.newTraveler));
    }

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

  handleDeleteTrip() {
    Alert.alert('Whoa!', 'Are you sure you want to delete it?', [
      { text: 'Cancel', onPress: () => { return } },
      { text: 'Delete', onPress: () => { this.deleteAndRedirect() } }
    ]);
  },

  deleteAndRedirect() {
    this.props.dispatch(deleteTrip(this.props.tripName));
    this.props.navigator.popToTop();
  },

  renderActionBtn() {
    if (this.props.editMode) {
      return (
        <View style={styles.viewActionBtns}>
          <Button style={styles.buttonWhite} onPress={this.handleDeleteTrip}>Delete Trip</Button>
          <Button style={styles.button} onPress={() => { this.props.navigator.pop()}}>Back to Trip</Button>
        </View>
      );
    }

    return <Button style={styles.button} onPress={this.handleCreateTrip}>Create Trip</Button>;
  },

  render() {
    const { editMode } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.tripName}
        </Text>

        <TouchableOpacity style={styles.backBtn} onPress={() => { return this.props.navigator.pop(); }}>
          <Text style={styles.backText}>
            {editMode ? '< Trip' : '< Trips'}
          </Text>
        </TouchableOpacity>

        <View style={styles.travelerFormView}>
          <TextInput
            onChangeText={newTraveler => { this.setState({ newTraveler }) }}
            placeholder='Who is coming with you?'
            value={this.state.newTraveler}
            style={styles.input} />
          <Button style={styles.button} onPress={this.addTraveler}>Add Traveler</Button>
        </View>

        <ListView
          style={styles.travelerList}
          dataSource={this.state.travelers}
          renderRow={this.renderRow} />

        <View style={styles.createBtnView}>
          {this.renderActionBtn()}
        </View>
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
  travelerFormView: {
    borderBottomWidth: 2,
    borderColor: '#c0ded3',
    paddingBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#999',
    borderWidth: 1,
    height: 50,
    margin: 20,
    marginBottom: 10,
    padding: 15,
  },
  travelerList: {
    backgroundColor: 'white',
    flex: 2,
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
    color: '#666',
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#87c5ae',
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    width: 200,
  },
  buttonWhite: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: '#87c5ae',
    borderWidth: 1,
    color: '#87c5ae',
    marginTop: 10,
    padding: 15,
    width: 200,
  },
  travelerContainer: {
    height: 40,
  },
  createBtnView: {
    alignItems: 'center',
    borderColor: '#c0ded3',
    borderTopWidth: 2,
    justifyContent: 'center',
  },
  actionBtnsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
