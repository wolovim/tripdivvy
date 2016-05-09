import React, {
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { addExpense } from '../actions/';

const Expense = React.createClass({
  getInitialState() {
    return { title: '', cost: 0, payer: 'me' };
  },

  handleAddExpense() {
    // render alert if empty state
    console.log('expense: ', this.state);
    this.props.dispatch(addExpense(this.props.trip.name, this.state));
    this.props.navigator.pop();
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          New Expense
        </Text>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => { return this.props.navigator.pop(); }}>
          <Text style={styles.backText}>
            {'< Trip'}
          </Text>
        </TouchableOpacity>

        <TextInput
          keyboardType='default'
          onChangeText={title => { this.setState({ title }); }}
          placeholder='Expense title'
          value={this.state.title}
          style={styles.input} />
        <TextInput
          keyboardType='numeric'
          onChangeText={cost => { this.setState({ cost }); }}
          placeholder='Cost'
          value={this.state.total}
          style={styles.input} />
        <Picker
          onValueChange={payer => { this.setState({ payer }); }}
          selectedValue={this.state.payer}
          style={styles.inputPicker}>
          <Picker.item label='Me' value='me' />
          <Picker.item label='Test 1' value='test1' />
          <Picker.item label='Test 2' value='test2' />
        </Picker>

        <Button style={styles.button} onPress={this.handleAddExpense}>
          Add Expense
        </Button>
      </View>
    );
  }
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Expense);

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
  input: {
    backgroundColor: 'white',
    borderColor: '#999',
    borderWidth: 1,
    height: 50,
    margin: 20,
    marginBottom: 0,
    padding: 15,
  },
  inputPicker: {
    backgroundColor: 'white',
    borderColor: '#999',
    borderWidth: 1,
    margin: 20,
    marginBottom: 0,
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
