import firebase from 'react-native-firebase';
import { PermissionsAndroid } from 'react-native';
// Firebase references
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');

// Function used inside of MapsScreen to get and zoom to location
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const coordinates = {
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        };
        resolve(coordinates);
      },
      error => {
        reject(new Error(error.message));
        return false;
      },
      { enableHighAccuracy: true },
    );
  });
};

// Used to setUser Location permission and modify
// firebase database location data on User
export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'BoliSession Location Permission',
        message:
          'BoliSession needs access to your location ' +
          'so other dancers and teams may collab with you.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('location access allowed');
      return true;
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

// Update users location status on Firebase database\
// permission is boolean true or false
export const updateFirebaseLocation = (
  key,
  latitude,
  longitude,
  permission,
) => {
  usersRef
    .child(key)
    .update({
      locationOn: permission,
      coordinates: {
        latitude,
        longitude,
      },
    })
    .then(() => {
      console.log('successfully updated coordinates');
    })
    .catch(error => {
      console.log(error);
    });
};

// Get location of all users with location permission granted
export const getUsersLocations = async () => {
  try {
    const userLocations = [];
    const snapshot = await usersRef
      .orderByChild('locationOn')
      .equalTo(true)
      .once('value');
    snapshot.forEach(data => {
      userLocations.push(data);
    });
    return userLocations;
  } catch (err) {
    console.warn(err);
  }
};
