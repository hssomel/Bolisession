import React from 'react';
import { Modal, View, Switch, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  updateFirebaseLocation,
  getLocation,
} from '../actions/locationActions';

const MapSettingsModal = props => {
  const {
    settingsModalOpen,
    setSettingsModalOpen,
    setCoordinates,
    locationOn,
    setLocationOn,
    userKey,
  } = props;
  // Event Handlers
  const toggleLocation = value => {
    setLocationOn(value);
    // if user turned off location
    if (!value) {
      updateFirebaseLocation(userKey, 0, 0, false);
    } else {
      // user turned on location
      getLocation()
        .then(res => {
          setCoordinates(res);
          setLocationOn(true);
          const { latitude, longitude } = res;
          updateFirebaseLocation(userKey, latitude, longitude, true);
        })
        .catch(err => {
          console.log('error: ', err);
        });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={settingsModalOpen}
      onRequestClose={() => setSettingsModalOpen(false)}
    >
      <View style={styles.outerModalContainer}>
        <View style={styles.firstContainer}>
          <Icon
            name="ios-arrow-back"
            size={30}
            color="orangered"
            onPress={() => setSettingsModalOpen(false)}
          />
          <Text style={styles.settingsText}>Settings</Text>
        </View>
        <View style={styles.secondContainer}>
          <Text style={styles.infoText}>
            Your location updates while you have BoliSession Open
          </Text>
        </View>
        <View style={styles.thirdContainer}>
          <Text style={styles.locationText}>Location On</Text>
          <Switch
            onValueChange={toggleLocation}
            value={locationOn}
            thumbColor={'orangered'}
            style={{ paddingLeft: 25, size: 28 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MapSettingsModal;

const styles = StyleSheet.create({
  outerModalContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  firstContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 10,
  },
  settingsText: {
    color: 'orangered',
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
    paddingLeft: 15,
  },
  secondContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D2D4D1',
    paddingTop: 10,
    paddingBottom: 10,
  },
  infoText: {
    color: 'grey',
    fontFamily: 'normal',
    fontSize: 14,
  },
  thirdContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    paddingLeft: 25,
  },
  locationText: {
    color: 'black',
    // fontFamily: 'OpenSans-Bold',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
