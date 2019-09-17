import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, Header, ListItem, Overlay } from 'react-native-elements';

const styles = StyleSheet.create({});

export default function CountrySelector(props) {
  const {
    setFlag,
    countryData,
    setCountry,
    setPopupVisibility,
    popupVisibility,
    flagCollection,
  } = props;

  const keyExtractor = (item, index) => index.toString();
  const renderCountry = ({ item }) => (
    <ListItem
      bottomDivider
      leftAvatar={{
        size: 'small',
        rounded: true,
        source: flagCollection[item.alpha2Code],
      }}
      title={item.name}
      rightTitle={`+${item.callingCode}`}
      onPress={() => {
        setFlag(flagCollection[item.alpha2Code]);
        setCountry(item);
        setPopupVisibility(false);
      }}
    />
  );

  return (
    <Overlay
      fullScreen
      onBackdropPress={() => setPopupVisibility(false)}
      isVisible={popupVisibility}
    >
      <>
        <Header
          centerComponent={<Text style={{ fontSize: 18 }}>Select Country</Text>}
          backgroundColor="white"
        />
        <FlatList
          data={countryData}
          keyExtractor={keyExtractor}
          renderItem={renderCountry}
        />
      </>
    </Overlay>
  );
}
