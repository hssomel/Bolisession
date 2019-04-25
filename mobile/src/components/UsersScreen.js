import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UsersScreen extends React.Component {
  constructor() {
    super();
    this.testChatPress = this.testChatPress.bind(this);
  }

  testChatPress() {
    this.props.navigation.navigate('Messages');
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  // renderFooter = () => {
  //   if (!this.state.loading) return null;

  //   return (
  //     <View
  //       style={{
  //         paddingVertical: 20,
  //         borderTopWidth: 1,
  //         borderColor: "#CED0CE"
  //       }}
  //     >
  //       <ActivityIndicator animating size="large" />
  //     </View>
  //   );
  // };

  render() {
    const { users } = this.props.auth;
    return (
      // <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      <FlatList
        style={styles.listcontainer}
        data={users}
        renderItem={({ item }) => (
          <ListItem
            title={`${item.username}`}
            subtitle={item.usertype}
            leftAvatar={{
              rounded: true,
              source: { uri: 'http://www.gravatar.com/avatar/?d=identicon' },
            }}
            onPress={this.testChatPress}
            containerStyle={{ borderBottomWidth: 0 }}
          />
        )}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        // ListFooterComponent={this.renderFooter}
      />
      // </List>
    );
  }
}

UsersScreen.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UsersScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue',
    height: '100%',
    width: '100%',
  },
  listContainer: {
    width: '100%',
  },
  userContainer: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  name: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    borderRadius: 50,
    backgroundColor: '#fff',
    paddingVertical: 15,
    width: '75%',
  },
  buttonText: {
    color: 'steelblue',
    textAlign: 'center',
  },
});

// render() {
//   const { users } = this.props.auth;
//   return (
//     <FlatList
//       style={styles.listcontainer}
//       data={users}
//       renderItem={({ item }) => <Text>{`${item.username}`}</Text>}
//       keyExtractor={item => item._id}
//     />
//   );
// }
