import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const BackIcon = props => {
  const { closeModal, placeholder } = props;
  // Initial State

  const goBack = () => {
    closeModal();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: width * 0.95,
          height: '100%',
          backgroundColor: 'transparent',
        }}
      >
        <Icon
          name="md-arrow-round-back"
          size={26}
          color="#808080"
          style={{ flex: 1 }}
          onPress={goBack}
        />
        <Text
          style={{
            fontSize: 18,
            color: '#808080',
            position: 'absolute',
            left: 0,
            marginLeft: 30,
          }}
        >
          {placeholder}
        </Text>
        <Icon
          name="md-menu"
          size={26}
          color="#808080"
          style={{ flex: 1, position: 'absolute', right: 0, paddingRight: 5 }}
          onPress={goBack}
        />
      </View>
    </View>
  );
};

export default BackIcon;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
});
