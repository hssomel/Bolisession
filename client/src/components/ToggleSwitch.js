import React, { useState, useEffect } from 'react';
import { View, Text, Switch } from 'react-native';

export default function ToggleSwitch(props) {
  const { toggleSwitch, switchValue } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      }}
    >
      <Switch
        onValueChange={toggleSwitch}
        value={switchValue}
        thumbColor={'orangered'}
      />
      <Text style={{ fontSize: 18, color: 'orangered', fontWeight: 'bold' }}>
        Follow
      </Text>
    </View>
  );
}
