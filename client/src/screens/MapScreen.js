import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import MapSearchModal from '../components/MapSearchModal';
import { getCurrentUserKey } from '../actions/authActions';
import {
  requestLocationPermission,
  getLocation,
  getUsersLocations,
  updateFirebaseLocation,
} from '../actions/locationActions';

const MapScreen = props => {
  // Initial State
  const [user, setUser] = useState(null);
  const [userKey, setUserKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [locationOn, setLocationOn] = useState(null);
  const [usersLocationData, setUsersLocationData] = useState(null);
  const [searchVisible, setSearchVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(null);

  // Default Coordinates if unable to obtain user location
  const [coordinates, setCoordinates] = useState({
    latitude: 34.03961,
    longitude: -118.2523,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });

  // Event Handlers
  const navigateToProfile = item => {
    if (user.displayName == item._value.username) {
      props.navigation.navigate('Profile');
    } else {
      props.navigation.navigate('OtherUser', {
        item: item._value,
        key: item.key,
      });
    }
  };

  const handleMapPress = value => {
    if (searchVisible) {
      setSearchVisible(false);
    } else {
      setSearchVisible(true);
    }
  };

  const handleIconPress = () => {
    getLocation()
      .then(res => {
        setCoordinates(res);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  const checkForLocation = async key => {
    const requestOk = await requestLocationPermission();
    if (requestOk) {
      getLocation()
        .then(res => {
          setCoordinates(res);
          setLocationOn(true);
          const { latitude, longitude } = res;
          updateFirebaseLocation(key, latitude, longitude);
        })
        .catch(err => {
          console.log('error: ', err);
        });
    } else {
      setLocationOn(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        getCurrentUserKey(user)
          .then(data => {
            setUserKey(data.key);
            checkForLocation(data.key);
          })
          .catch(err => {
            console.log('error: ', err);
          });
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    getUsersLocations()
      .then(res => {
        setUsersLocationData(res);
      })
      .catch(err => {
        console.log('error: ', err);
      });
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
        onPress={e => handleMapPress(e)}
        onRegionChangeComplete={e => setCoordinates(e)}
      >
        {usersLocationData &&
          usersLocationData.map(marker => (
            <Marker
              coordinate={marker._value.coordinates}
              title={marker._value.username}
              key={marker.key}
              onPress={() => navigateToProfile(marker)}
            >
              <Image
                source={{
                  uri: marker._value.profilePhoto,
                }}
                style={styles.image}
              />
            </Marker>
          ))}
      </MapView>
      <View style={styles.topContainer}>
        {searchVisible && (
          <TouchableOpacity
            style={styles.openModalButton}
            onPress={() => setModalOpen(true)}
          >
            <Icon name="md-search" size={28} color="#808080" />
            <Text style={styles.buttonText}>Search...</Text>
            <Icon
              name="md-menu"
              size={28}
              color="#808080"
              style={{ position: 'absolute', right: 0, paddingRight: 15 }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.locationButton}>
          <Icon
            name="md-locate"
            size={26}
            color="orangered"
            onPress={() => handleIconPress()}
          />
        </View>
      </View>
      {modalOpen && (
        <MapSearchModal
          modalOpen={modalOpen}
          closeModal={closeModal}
          usersLocationData={usersLocationData}
        />
      )}
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
  openModalButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    width: '90%',
    borderRadius: 10,
    paddingLeft: 20,
    backgroundColor: '#F8F8F8',
    elevation: 2, // Android
  },
  topContainer: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
    paddingRight: 10,
  },
  locationButton: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: '#808B96',
    borderWidth: 0.5,
    elevation: 2,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  buttonText: {
    color: '#808B96',
    // color: 'red',
    fontSize: 19,
    fontFamily: 'Roboto',
    paddingLeft: 25,
  },
});
