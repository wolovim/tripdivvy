import React from 'react-native';
import { Provider } from 'react-redux';
import MyTripsPage from './MyTripsPage';
import configureStore from '../store/configureStore';

const store = configureStore();

const Root = React.createClass({
  render() {
    return (
      <Provider store={store}>
        <MyTripsPage />
      </Provider>
    );
  }
});

export default Root;
