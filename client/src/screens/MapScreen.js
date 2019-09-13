import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import MapSearchModal from '../components/MapScreenComponents/MapSearchModal';
import MapSettingsModal from '../components/MapScreenComponents/MapSettingsModal';
import { getClientUserKey } from '../actions/Authentication/authActions';
import {
  requestLocationPermission,
  getLocation,
  getUsersLocations,
  updateFirebaseLocation,
  isUserLocationOn,
} from '../actions/Location/locationActions';

const { width } = Dimensions.get('window');

const MapScreen = props => {
  // Initial State
  const [user, setUser] = useState(null);
  const [userKey, setUserKey] = useState(null);
  const [locationOn, setLocationOn] = useState(null);
  const [usersLocationData, setUsersLocationData] = useState(null);
  const [searchVisible, setSearchVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(null);
  const [settingsModalOpen, setSettingsModalOpen] = useState(null);

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
      props.navigation.navigate('Profile', {
        sameUser: true,
      });
    } else {
      props.navigation.navigate('Profile', {
        sameUser: false,
        username: item._value.username,
      });
    }
  };

  const handleMapPress = () => {
    if (searchVisible) {
      setSearchVisible(false);
    } else {
      setSearchVisible(true);
    }
  };

  const handleNavIconPress = () => {
    if (locationOn) {
      getLocation()
        .then(res => {
          setCoordinates(res);
        })
        .catch(err => {
          console.log('error: ', err);
        });
    } else {
      Alert.alert(
        'Location is currently off',
        'Please enable location permission on your device and in app settings for access to all features on the app!',
        [
          {
            text: 'Ask me later',
            onPress: () => console.log('Ask me later pressed'),
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
      );
    }
  };

  const checkAppLevelPermission = async key => {
    try {
      const location = await isUserLocationOn(key);
      if (location) {
        const coords = await getLocation();
        setCoordinates(coords);
        setLocationOn(true);
        const { latitude, longitude } = coords;
        updateFirebaseLocation(key, latitude, longitude, true);
        return true;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const initializePermissionsAndFields = async user => {
    try {
      const key = await getClientUserKey(user);
      setUserKey(key);
      const userLocations = await getUsersLocations();
      setUsersLocationData(userLocations);
      const OSLevelPerm = await requestLocationPermission();
      if (OSLevelPerm) {
        await checkAppLevelPermission(key);
      } else {
        updateFirebaseLocation(key, 0, 0, false);
        setLocationOn(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        initializePermissionsAndFields(user);
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
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
              onCalloutPress={() => navigateToProfile(marker)}
            >
              <Image
                source={{
                  uri: marker._value.profilePhoto,
                }}
                style={styles.image}
              />
              <Callout>
                <View style={styles.calloutView}>
                  <Text style={styles.usernameText}>
                    {'@' + marker._value.username}
                  </Text>
                  <Text style={styles.profileText}>Go to Profile</Text>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>
      <View style={styles.topContainer}>
        {searchVisible && (
          <TouchableOpacity
            style={styles.openModalButton}
            onPress={() => setModalOpen(true)}
          >
            <Icon name="md-search" size={28} color="black" />
            <Text style={styles.buttonText}>Search...</Text>
          </TouchableOpacity>
        )}
        <Icon
          name="md-settings"
          size={28}
          color="black"
          onPress={() => setSettingsModalOpen(true)}
          style={styles.settingsIcon}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.locationButton}>
          <Icon
            name="md-locate"
            size={26}
            color="orangered"
            onPress={() => handleNavIconPress()}
          />
        </View>
      </View>
      {modalOpen && (
        <MapSearchModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          usersLocationData={usersLocationData}
          setCoordinates={setCoordinates}
        />
      )}
      {settingsModalOpen && (
        <MapSettingsModal
          settingsmodalOpen={settingsModalOpen}
          setSettingsModalOpen={setSettingsModalOpen}
          locationOn={locationOn}
          setLocationOn={setLocationOn}
          setCoordinates={setCoordinates}
          userKey={userKey}
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
  topContainer: {
    marginTop: 10,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  openModalButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    width: width * 0.75,
    borderRadius: 10,
    paddingLeft: 20,
    backgroundColor: '#F8F8F8',
    opacity: 0.75,
    elevation: 2,
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
    color: 'black',
    fontSize: 19,
    fontFamily: 'Roboto',
    paddingLeft: 25,
  },
  calloutView: {
    width: width * 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 2,
  },
  usernameText: {
    color: 'black',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  profileText: {
    marginTop: 5,
    color: 'black',
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  settingsIcon: {
    position: 'absolute',
    right: 0,
    paddingRight: 15,
    marginTop: 12.5,
    opacity: 0.65,
    elevation: 2,
  },
});
