import AsyncStorage from "@react-native-community/async-storage";

export const storeData = async (key, value) => {
  /* note: async function - returns promise
    Args:
      key <string> - key used to reference data in local storage
      value <string> - value referenced by key in local storage
    Returns:
      wasSuccessful <boolean> - true if storage successful, false if storage failed
  */
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log(`Error while storing {${key}: ${value}} on Device`);
    console.log(err);
    return false;
  }
  return true;
};

export const readData = async key => {
  /* note: async function - returns promise
    Args:
      key <string> - key used to reference data in local storage
    Returns:
      data <string> - the stored data or null if not able to read data
  */
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    console.log(`Error while reading value for the key ${key} on Device`);
    console.log(err);
    return null;
  }
};

export const removeData = async key => {
  /* note: async function - returns promise
    Args:
      key <string> - key used to reference data in local storage
    Returns:
      wasSuccessful <boolean> - true if delete successful, false if delete failed
  */
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log(`Error while removing data with the key ${key} on Device`);
    console.log(err);
    return false;
  }
  return true;
};
