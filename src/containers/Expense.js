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
    return { title: '', total: '', payer: 'me' };
  },

  handleAddExpense() {
    // render alert if empty state
    this.props.dispatch(addExpense(this.props.tripName, this.state));
    this.props.navigator.pop();
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>New Expense</Text>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => { return this.props.navigator.pop(); }}>
          <Text style={styles.backText}>
            {'< Trip'}
          </Text>
        </TouchableOpacity>

        <TextInput
          onChangeText={title => { this.setState({ title }); }}
          multiline={false}
          placeholder='Expense title'
          style={styles.input}
          value={this.state.title} />
        <TextInput
          onChangeText={cost => { this.setState({ cost }); }}
          multiline={false}
          placeholder='Cost'
          style={styles.input}
          value={this.state.total} />
        <Picker
          onValueChange={payer => { this.setState({ payer }); }}
          selectedValue={this.state.payer}
          style={styles.inputPicker}>
          <Picker.item label='Me' value='Me' />
          <Picker.item label='Test 1' value='Test1' />
          <Picker.item label='Test 2' value='Test2' />
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
