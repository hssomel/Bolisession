import React, { useEffect, useState } from 'react';
import { Modal, View, FlatList, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import BackIcon from './BackIcon';

const MapSearchModal = props => {
  const { modalOpen, setModalOpen, usersLocationData, setCoordinates } = props;
  // Inital State
  const [search, setSearch] = useState(null);
  const [usersData, setUsersData] = useState();
  const [isLoaded, setIsLoaded] = useState(null);
  // Event Handlers
  const logOnClear = () => {
    console.log('cleared!!');
  };

  const SearchFilterFunction = text => {
    setSearch(text);
    const newData = usersLocationData.filter(item => {
      //applying filter for the inserted text in search bar
      const itemData = item._value.username
        ? item._value.username.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setUsersData(newData);
  };

  const onAvatarPress = item => {
    const { latitude, longitude } = item.coordinates;
    const coordinates = {
      latitude,
      longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };
    setCoordinates(coordinates);
    setModalOpen(false);
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'white',
        }}
      />
    );
  };

  useEffect(() => {
    setUsersData(usersLocationData);
    setIsLoaded(true);
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalOpen}
      onRequestClose={() => setModalOpen(false)}
    >
      {isLoaded && (
        <View style={styles.outerModalContainer}>
          <SearchBar
            round
            // ref={search => setSearchRef(search)}
            searchIcon={<BackIcon setModalOpen={setModalOpen} />}
            onChangeText={text => SearchFilterFunction(text)}
            placeholder="Search Users, Teams, Competitions..."
            value={search}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchInputContainer}
            onClear={logOnClear}
          />
          <FlatList
            style={styles.listcontainer}
            data={usersData}
            renderItem={({ item }) => (
              <ListItem
                title={`${item._value.username}`}
                titleStyle={{ fontSize: 17, color: '#808080' }}
                leftAvatar={{
                  rounded: true,
                  source: { uri: item._value.profilePhoto },
                  size: 60,
                  marginLeft: 5,
                }}
                onPress={() => onAvatarPress(item._value)}
                containerStyle={{
                  borderBottomWidth: 0,
                  paddingVertical: 7.5,
                }}
              />
            )}
            keyExtractor={item => item.key}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>
      )}
    </Modal>
  );
};

export default MapSearchModal;

const styles = StyleSheet.create({
  outerModalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  listContainer: {
    width: '100%',
  },
  searchBarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 0,
    borderTopColor: 'white',
    borderBottomColor: 'white',
    marginBottom: 5,
    paddingHorizontal: 0,
    backgroundColor: 'white',
    elevation: 2,
  },
  searchInputContainer: {
    backgroundColor: 'white',
    borderRadius: 0,
  },
});
