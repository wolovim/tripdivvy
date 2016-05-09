import { AsyncStorage } from 'react-native';
import { find } from 'lodash';

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

  getTrip(tripName) {
    return AsyncStorage.getItem('trips')
      .then(
        tripJSON => {
          const trips = JSON.parse(tripJSON || '[]')
          return find(trips, (trip) => {
            return trip.name === tripName;
          });
        }
      );
  }
}

export default new Trips();
