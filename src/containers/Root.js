import React, { Navigator, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Trips from './Trips';
import Trip from './Trip';
import configureStore from '../store/configureStore';

const store = configureStore();

const ROUTES = {
  trips: Trips,
  trip: Trip,
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
