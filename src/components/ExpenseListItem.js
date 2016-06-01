import React, {
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';

const TripListItem = React.createClass({
  handlePress() {
    const { deleteExpense, expense } = this.props;

    Alert.alert('Are you sure?', `Do you want to delete expense: ${expense.title}?`, [
      { text: 'Cancel', onPress: () => { return; } },
      { text: 'Delete', onPress: () => { deleteExpense(expense); } }
    ])
  },

  render() {
    const { expense } = this.props;
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={styles.rowContainer}>
          <Text style={styles.expenseTitle}>{expense.title}</Text>
          <Text style={styles.expensePayer}>paid by: {expense.payer}</Text>
          <Text style={styles.expenseCost}>${expense.cost}</Text>
        </View>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
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
});

export default TripListItem;
