import React, {
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Button from 'react-native-button';
import { getTrip } from '../actions/';
import { find } from 'lodash';

const Trip = React.createClass({
  getInitialState() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const trip = find(this.props.trips.list, (trip) => {
      return trip.name === this.props.tripName;
    });
    return { expenses: ds.cloneWithRows(trip.expenses) };
  },

  navigateToAddExpense() {
    this.props.navigator.push({
      name: 'expense'
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.trip.name}
        </Text>

        <TouchableOpacity style={styles.backBtn} onPress={() => { return this.props.navigator.pop(); }}>
          <Text style={styles.backText}>
            {'< Trips'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.content}>
          This will be the trip page.
        </Text>

        <Button style={styles.button} onPress={this.navigateToAddExpense}>
          Add an Expense
        </Button>

        <ListView
          style={styles.tripList}
          dataSource={this.state.expenses}
          enableEmptySections={true}
          renderRow={expense => { return <Text>{expense.title} - {expense.cost}</Text> }} />
      </View>
    );
  }
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Trip);

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
  button: {
    alignSelf: 'center',
    backgroundColor: '#87c5ae',
    color: 'white',
    marginTop: 20,
    padding: 15,
    width: 200,
  },
  tripList: {
    alignSelf: 'stretch',
    marginTop: 20,
  },
});
