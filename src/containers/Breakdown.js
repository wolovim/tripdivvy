import React, {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';

const Breakdown = React.createClass({
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

        <Text>Breakdown coming soon...</Text>
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
});
