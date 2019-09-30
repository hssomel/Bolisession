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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MapSearchModal from '../components/MapScreenComponents/MapSearchModal';
import MapSettingsModal from '../components/MapScreenComponents/MapSettingsModal';
import {
  requestLocationPermission,
  getLocation,
  getUsersLocations,
  updateFirebaseLocation,
} from '../actions/Location/locationActions';

const { width, height } = Dimensions.get('window');

const MapScreen = ({ navigation, userkey, user }) => {
  const { username, locationOn } = user;
  // Initial State
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
    if (username == item._value.username) {
      navigation.navigate('Profile', {});
    } else {
      navigation.navigate('Profile', {
        profileName: item._value.username,
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

  const checkAppLevelPermission = async () => {
    if (locationOn) {
      const coords = await getLocation();
      setCoordinates(coords);
      const { latitude, longitude } = coords;
      updateFirebaseLocation(userkey, latitude, longitude, true);
      return true;
    }
  };

  const initializePermissionsAndFields = async () => {
    const userLocations = await getUsersLocations();
    setUsersLocationData(userLocations);
    const OSLevelPerm = await requestLocationPermission();
    if (OSLevelPerm) {
      await checkAppLevelPermission();
    } else {
      updateFirebaseLocation(userkey, 0, 0, false);
    }
  };

  useEffect(() => {
    initializePermissionsAndFields();
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
          setCoordinates={setCoordinates}
          userKey={userkey}
        />
      )}
    </View>
  );
};

MapScreen.propTypes = {
  user: PropTypes.object.isRequired,
  userkey: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  userkey: state.auth.userkey,
});

export default connect(mapStateToProps)(MapScreen);

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
    height: '100%',
    width,
    flex: 1,
  },
  openModalButton: {
    flexDirection: 'row',
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
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    width,
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
