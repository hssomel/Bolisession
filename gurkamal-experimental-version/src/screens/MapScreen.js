import React, { useEffect, useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { MAPBOX_TOKEN } from '../../env';

import { requestFineLocationPermission } from '../utils/androidPermissions';

MapboxGL.setAccessToken(MAPBOX_TOKEN);

// geolocation.getCurrentPosition(geo_success, [geo_error], [geo_options]);

// TODO: ANDROID GEOLOCATION????

const MapScreen = () => {
  const [
    androidFineLocationPermission,
    setAndroidFineLocationPermission,
  ] = useState(true);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestFineLocationPermission().then(result => {
        setAndroidFineLocationPermission(result);
      });
    }
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MapboxGL.MapView
        animated
        showUserLocation={androidFineLocationPermission}
        userTrackingMode={MapboxGL.UserTrackingModes.Follow}
        localizeLabels
        zoomEnabled
        scrollEnabled
        pitchEnabled
        rotateEnabled
        logoEnabled
        compassEnabled
        zoomLevel={4}
        pitch={45}
        styleURL={MapboxGL.StyleURL.Street}
        style={styles.map}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export default MapScreen;

// <SafeAreaView
//         style={[sheet.matchParent, {backgroundColor: colors.primary.blue}]}
//         forceInset={{top: 'always'}}
//       >
//         <View style={sheet.matchParent}>
//           <MapHeader label="React Native Mapbox GL" />

//           <View style={sheet.matchParent}>s
//             <FlatList
//               style={styles.exampleList}
//               data={Examples}
//               keyExtractor={item => item.label}
//               renderItem={this.renderItem}
//             />
//           </View>

//           {this.renderActiveExample()}
//         </View>
//       </SafeAreaView>
