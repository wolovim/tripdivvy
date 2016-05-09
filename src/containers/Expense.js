import React, {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Button from 'react-native-button';

const Expense = React.createClass({
  handleAddExpense() {
    console.log('navigating to expense');
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          New Expense
        </Text>

        <TouchableOpacity style={styles.backBtn} onPress={() => { return this.props.navigator.pop(); }}>
          <Text style={styles.backText}>
            {'< Trip'}
          </Text>
        </TouchableOpacity>

        <Button style={styles.button} onPress={this.handleAddExpense}>
          Add Expense
        </Button>
      </View>
    );
  }
});

export default Expense;

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
  button: {
    alignSelf: 'center',
    backgroundColor: '#87c5ae',
    color: 'white',
    marginTop: 20,
    padding: 15,
    width: 200,
  },
});
