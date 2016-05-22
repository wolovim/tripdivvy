import React, {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import transaction from '../services/transaction';

const Breakdown = React.createClass({
  getInitialState() {
    return { transactions: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) };
  },

  componentWillMount() {
    const { expenses, travelers } = this.props.trip;
    const transactions = transaction.findFor(expenses, travelers);
    this.setState({ transactions: this.state.transactions.cloneWithRows(transactions) });
  },

  renderRow(transaction) {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.transactionPayer}>{transaction.payer} owes {transaction.payee}</Text>
        <Text style={styles.transactionAmount}>${transaction.amount}</Text>
      </View>
    );
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Breakdown</Text>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => { return this.props.navigator.pop(); }}>
          <Text style={styles.backText}>
            {'< Trip'}
          </Text>
        </TouchableOpacity>

        <ListView
          style={styles.expenseList}
          dataSource={this.state.transactions}
          enableEmptySections={true}
          renderRow={this.renderRow} />
      </View>
    );
  }
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Breakdown);

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
  rowContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: '#c0ded3',
    flex: 1,
    flexDirection: 'row',
    padding: 25,
  },
  transactionPayer: {
    flex: 1,
    color: '#666',
  },
  transactionAmount: {
    color: '#666',
    alignItems: 'flex-end',
    fontWeight: 'bold',
  },
});
