import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default function EditProfileScreen(props) {
  // Initial State
  // Added test comment
  const [userKey] = useState(props.navigation.getParam('userKey', null));
  const [user] = useState(props.navigation.getParam('user', null));
  // Event Handlers

  const handleModalButton1 = () => {
    props.navigation.navigate('Bio', {
      userKey,
      user,
    });
  };

  const handleModalButton2 = () => {
    props.navigation.navigate('AccountType', {
      user,
    });
  };

  const handleModalButton3 = () => {
    props.navigation.navigate('Video', {
      userKey,
    });
  };

  return (
    <View>
      <Button
        onPress={handleModalButton1}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        title="Edit Bio"
        titleStyle={{ color: 'orangered' }}
      />
      <Button
        onPress={handleModalButton2}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        title="Edit Account Type"
        titleStyle={{ color: 'orangered' }}
      />
      <Button
        onPress={handleModalButton3}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        title="Edit Profile Video"
        titleStyle={{ color: 'orangered' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  buttonContainer: {
    marginTop: '15%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 50,
    width: '85%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'orangered',
    backgroundColor: 'transparent',
  },
});
