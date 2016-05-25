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

  renderTransactions() {
    if (this.state.transactions._cachedRowCount === 0) {
      return (
        <View style={styles.noTransactionContainer}>
          <Text style={styles.noTransactionTitle}>No expenses to divvy up yet!</Text>
          <Text>When you create some,</Text>
          <Text>you'll see who owes who.</Text>
        </View>
      );
    }

    return (
      <ListView
        style={styles.expenseList}
        dataSource={this.state.transactions}
        enableEmptySections={true}
        renderRow={this.renderRow} />
    )
  },

  renderRow(transaction) {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.transactionPayer}>{this.renderPayerText(transaction.payer)} {transaction.payee}</Text>
        <Text style={styles.transactionAmount}>${transaction.amount}</Text>
      </View>
    );
  },

  renderPayerText(payer) {
    return payer === 'Me' ? 'I owe' : `${payer} owes`;
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

        {this.renderTransactions()}
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
    color: '#666',
    flex: 1,
  },
  transactionAmount: {
    alignItems: 'flex-end',
    color: '#666',
    fontWeight: 'bold',
  },
  noTransactionContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  noTransactionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: -100,
  },
});
