import React, {
  Alert,
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
    return { title: '', cost: '', payer: 'Me' };
  },

  handleAddExpense() {
    if (this.state.title === '') {
      return Alert.alert('What did you buy?', 'Give it a name!');
    } else if (this.state.cost === '') {
      return Alert.alert('It wasn\'t free was it?', `How much did ${this.state.title} cost?`);
    }

    this.props.dispatch(addExpense(this.props.tripName, this.state));
    this.props.navigator.pop();
  },

  renderPickerOptions() {
    return this.props.trip.travelers.map((traveler, index) => {
      return <Picker.Item label={traveler} value={traveler} key={index} />
    });
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
          onChangeText={cost => { this.setState({ cost: parseInt(parseFloat(cost) + 0.5) }); }}
          multiline={false}
          placeholder='Cost'
          style={styles.input}
          value={this.state.cost.toString()} />
        <Picker
          onValueChange={payer => { this.setState({ payer }); }}
          selectedValue={this.state.payer}
          style={styles.inputPicker}>
          {this.renderPickerOptions()}
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
