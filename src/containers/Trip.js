import React, {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

const Trip = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.tripName}
        </Text>

        <Text style={styles.content}>
          This will be the trip page.
        </Text>
      </View>
    );
  }
});

export default Trip;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fdfefb',
    flex: 1,
  },
  title: {
    color: '#666',
    fontSize: 26,
    marginBottom: 20,
    marginTop: 40,
    textAlign: 'center',
  },
  content: {
    color: '#666',
  },
});
