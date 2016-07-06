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
import { getTrip, deleteExpense } from '../actions/';
import { find, reduce } from 'lodash';
import ExpenseListItem from '../components/ExpenseListItem';

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

  navigateToEdit() {
    this.props.navigator.push({
      name: 'tripEdit',
      passProps: {
        tripName: this.props.tripName,
        editMode: true
      }
    });
  },

  navigateToBreakdown() {
    this.props.navigator.push({
      name: 'breakdown',
      passProps: {
        tripName: this.props.tripName
      }
    });
  },

  totalTripExpenses() {
    return reduce(this.props.trip.expenses, (sum, expense) => {
      return parseInt(sum, 10) + parseInt(expense.cost, 10);
    }, 0);
  },

  renderExpenses() {
    if (this.state.expenses._cachedRowCount === 0) {
      return (
        <View style={styles.noExpensesContainer}>
          <Text style={styles.noExpensesTitle}>No expenses yet.</Text>
          <Text style={styles.noExpensesText}>Enjoy it while it lasts!</Text>
        </View>
      );
    }
    return (
      <ListView
        dataSource={this.state.expenses}
        enableEmptySections={true}
        renderRow={expense => {
          return (
            <ExpenseListItem
              expense={expense}
              deleteExpense={expense => this.props.dispatch(deleteExpense(this.props.tripName, expense))} />
          );
        }}
        style={styles.expenseList} />
    );
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.tripName}
        </Text>

        <TouchableOpacity style={styles.backBtn} onPress={() => { return this.props.navigator.popToTop(); }}>
          <Text style={styles.backText}>
            {'< Trips'}
          </Text>
        </TouchableOpacity>

        <View style={styles.tripTopDetails}>
          <Text style={styles.content}>
            {this.props.trip.travelers.length} travelers
          </Text>

          <Button style={styles.button} onPress={this.navigateToAddExpense}>
            Add an Expense
          </Button>
        </View>

        {this.renderExpenses()}

        <View style={styles.sumView}>
          <Text style={styles.sum}>Total Trip Expenses:</Text>
          <Text style={styles.sumValue}>${this.totalTripExpenses()}</Text>
        </View>

        <View style={styles.viewBreakdownView}>
          <Button style={styles.buttonWhite} onPress={this.navigateToEdit}>
            Edit Trip
          </Button>

          <Button style={styles.button} onPress={this.navigateToBreakdown}>
            View Breakdown
          </Button>
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
  tripTopDetails: {
    borderBottomWidth: 2,
    borderColor: '#c0ded3',
    paddingBottom: 20,
  },
  content: {
    color: '#666',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#87c5ae',
    color: 'white',
    marginTop: 10,
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
  expenseList: {
    flex: 2,
    backgroundColor: 'white',
  },
  noExpensesContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#c0ded3',
    borderTopWidth: 2,
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  noExpensesTitle: {
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noExpensesText: {
    color: '#666',
  },
  sumView: {
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
  viewBreakdownView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
