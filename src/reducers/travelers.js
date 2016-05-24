import * as types from '../actions/actionTypes';

const initialState = {
  list: ['Me']
}

function travelers(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TRAVELER:
      return {
        list: state.list.concat(action.traveler)
      }
    case types.CREATE_TRIP_SUCCESS:
      return {
        list: ['Me']
      }
    default:
      return state;
  }
}

export default travelers;
