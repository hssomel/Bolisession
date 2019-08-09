import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import {
  getCurrentUserKey,
  requestLocationPermission,
  getLocation,
  getUsersLocations,
} from '../actions/authActions';

const MapScreen = props => {
  // Initial State
  const [isLoaded, setIsLoaded] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userKey, setUserKey] = useState(null);
  const [userData, setUserData] = useState(null);
  const [locationOn, setLocationOn] = useState(null);
  const [usersData, setUsersLocationData] = useState(null);
  // Default Coordinates if unable to obtain user location
  const [coordinates, setCoordinates] = useState({
    latitude: 34.03961,
    longitude: -118.2523,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });

  // Event Handlers
  const checkLocation = async key => {
    const requestOk = await requestLocationPermission();
    if (requestOk) {
      getLocation(setCoordinates, key);
      setLocationOn(true);
    } else {
      setLocationOn(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log('mounted to MapsScreen');
      if (user) {
        setProfilePhoto(user.photoURL);
        getCurrentUserKey(user, setUserData, setUserKey)
          .then(key => {
            checkLocation(key);
          })
          .catch(err => {
            console.log('error', err);
          });
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
      console.log('unmounted from MapsScreen');
    };
  }, []);

  useEffect(() => {
    getUsersLocations(setUsersLocationData, setIsLoaded);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={coordinates}
        showsUserLocation={false}
        loadingEnabled={true}
        showsMyLocationButton={false}
      >
        {isLoaded &&
          usersData.map(marker => (
            <Marker
              coordinate={marker._value.coordinates}
              title={marker._value.username}
              key={marker.key}
            />
          ))}
      </MapView>
      <View style={styles.locationButton}>
        <Icon
          name="md-locate"
          size={32}
          color="orangered"
          onPress={() => getLocation(setCoordinates)}
        />
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationButton: {
    paddingRight: 20,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  image: {
    height: 60,
    width: 60,
    backgroundColor: 'pink',
    borderRadius: 30,
  },
});
