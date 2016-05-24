import * as types from './actionTypes';
import trip from '../services/trip';

export function createTrip(tripData) {
  return dispatch => {
    trip.addTrip(tripData)
      .then(dispatch(createTripSuccess(tripData)));
  }
}

function createTripSuccess(trip) {
  return { type: types.CREATE_TRIP_SUCCESS, trip };
}

export function getTrips() {
  return dispatch => {
    trip.getTrips()
      .then(trips => dispatch(getTripsSuccess(trips)));
  }
}

function getTripsSuccess(trips) {
  return { type: types.GET_TRIPS_SUCCESS, trips };
}

export function getTrip(tripName) {
  return dispatch => {
    dispatch(fetchingTrip());
    trip.getTrip(tripName)
      .then(trip => dispatch(getTripSuccess(trip)));
  }
}

function fetchingTrip() {
  return { type: types.FETCHING_TRIP };
}

function getTripSuccess(trip) {
  return { type: types.GET_TRIP_SUCCESS, trip };
}

export function addExpense(tripName, expense) {
  return dispatch => {
    trip.addExpense(tripName, expense)
      .then(() => dispatch(getTrip(tripName)));
  }
}

export function addTraveler(traveler) {
  return { type: types.ADD_TRAVELER, traveler };
}
