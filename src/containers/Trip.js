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
import { find, reduce } from 'lodash';

const Trip = React.createClass({
  getInitialState() {
    return { expenses: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) };
  },

  componentWillMount() {
    this.props.dispatch(getTrip(this.props.tripName));
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      expenses: this.state.expenses.cloneWithRows(nextProps.trip.expenses)
    });
  },

  navigateToAddExpense() {
    this.props.navigator.push({
      name: 'expense',
      passProps: {
        tripName: this.props.tripName
      }
    });
  },

  renderRow(expense) {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.expenseTitle}>{expense.title}</Text>
        <Text style={styles.expensePayer}>paid by: {expense.payer}</Text>
        <Text style={styles.expenseCost}>${expense.cost}</Text>
      </View>
    );
  },

  totalTripExpenses() {
    return reduce(this.props.trip.expenses, (sum, expense) => {
      return parseInt(sum, 10) + parseInt(expense.cost, 10);
    }, 0);
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
          This will be the trip page.
        </Text>

        <Button style={styles.button} onPress={this.navigateToAddExpense}>
          Add an Expense
        </Button>

        <ListView
          style={styles.expenseList}
          dataSource={this.state.expenses}
          enableEmptySections={true}
          renderRow={this.renderRow} />

        <View style={styles.sumView}>
          <Text style={styles.sum}>Total Trip Expenses:</Text>
          <Text style={styles.sumValue}>${this.totalTripExpenses()}</Text>
        </View>
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
  expenseList: {
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
  expenseTitle: {
    flex: 1,
    color: '#666',
  },
  expensePayer: {
    flex: 1,
    color: '#666',
    fontSize: 13,
    fontStyle: 'italic',
  },
  expenseCost: {
    color: '#666',
    flexDirection: 'column',
    alignItems: 'flex-end',
    fontWeight: 'bold',
  },
  sumView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderColor: '#c0ded3',
    borderTopWidth: 2,
  },
  sum: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  sumValue: {
    color: '#666',
    fontWeight: 'bold',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 25,
    fontSize: 16,
  },
});
