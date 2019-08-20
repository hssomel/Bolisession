import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const BackIcon = props => {
  const { closeModal } = props;
  // Event Handlers
  const goBack = () => {
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Icon
        name="ios-arrow-back"
        size={30}
        color="#808080"
        style={{
          flex: 1,
        }}
        onPress={goBack}
      />
      <Icon
        name="md-search"
        size={30}
        color="#808080"
        style={{
          flex: 1,
        }}
      />
    </View>
  );
};

export default BackIcon;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: width * 0.1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 5,
  },
});
