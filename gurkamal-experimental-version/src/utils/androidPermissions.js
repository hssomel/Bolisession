import { PermissionsAndroid } from 'react-native';

const appName = 'Bolisession';

// ALL FUNCTIONS RETURN A BOOLEAN

// https://facebook.github.io/react-native/docs/permissionsandroid

// PermissionsAndroid provides access to Android M's new permissions model.
// The so-called "normal" permissions are granted by default when the
// application is installed as long as they appear in AndroidManifest.xml.
// However, "dangerous" permissions require a dialog prompt.
// You should use this module for those permissions.

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: `${appName} Camera Permission`,
        message: `${appName} needs access to your camera.`,
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
      return true;
    }
    console.log('Camera permission denied');
    return false;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const requestFineLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: `${appName} Location Permission`,
        message: `${appName} needs to access your current location.`,
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the ACCESS_FINE_LOCATION');
      return true;
    }
    console.log('ACCESS_FINE_LOCATION permission denied');
    return false;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const requestCoarseLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: `${appName} Location Permission`,
        message: `${appName} needs to access your current location.`,
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the ACCESS_COARSE_LOCATION');
      return true;
    }
    console.log('ACCESS_COARSE_LOCATION permission denied');
    return false;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export {
  requestCameraPermission,
  requestFineLocationPermission,
  requestCoarseLocationPermission,
};
