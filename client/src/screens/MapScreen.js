import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MapScreen = props => {
  // Initial State
  const [coordinates, setCoordinates] = useState({
    latitude: 34.03961,
    longitude: -118.2523,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });

  // Event Handlers
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log(position.coords);
        setCoordinates({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      },
      error => {
        Alert.alert(error.message);
      },
      { enableHighAccuracy: true },
    );
  };

  useEffect(() => {
    getLocation();
    setTimeout(() => {
      console.log('fired');
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={coordinates}
        showsUserLocation={true}
        loadingEnabled={true}
        showsMyLocationButton={false}
      />
      <View style={styles.locationButton}>
        <Icon
          name="md-locate"
          size={32}
          color="orangered"
          onPress={getLocation}
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
});
