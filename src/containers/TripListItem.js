import React, {
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';

const TripListItem = React.createClass({
  render() {
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.content}>
            {this.props.trip.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderTopColor: '#c0ded3',
    borderTopWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 25,
  },
  content: {
    color: '#666',
  },
});

export default TripListItem;
