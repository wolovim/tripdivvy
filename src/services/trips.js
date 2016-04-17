import { AsyncStorage } from 'react-native';

class Trips {
  addTrip(tripName) {
    return this.getTrips()
      .then(trips => {
        trips.push({ name: tripName })
        return JSON.stringify(trips);
      })
      .then(tripsJSON => AsyncStorage.setItem('trips', tripsJSON));
  }

  getTrips() {
    return AsyncStorage.getItem('trips')
      .then(
        tripJSON => {
          return JSON.parse(tripJSON || '[]')
        }
      );
  }
}

export default new Trips();
