import React, { Navigator, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Breakdown from './Breakdown';
import Expense from './Expense';
import Trip from './Trip';
import TripEdit from './TripEdit';
import Trips from './Trips';
import configureStore from '../store/configureStore';

const store = configureStore();

const ROUTES = {
  breakdown: Breakdown,
  expense: Expense,
  trip: Trip,
  tripEdit: TripEdit,
  trips: Trips,
};

const Root = React.createClass({
  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} {...route.passProps} />;
  },

  render() {
    return (
      <Provider store={store}>
        <Navigator
          style={styles.container}
          initialRoute={{ name: 'trips' }}
          renderScene={this.renderScene}
          configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }} />
      </Provider>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Root;
