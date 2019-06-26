import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';

class testScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [1, 2, 3],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true,
      },
      () => {
        this.makeRemoteRequest();
      },
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.makeRemoteRequest();
      },
    );
  };

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

  render() {
    return (
      <View style={{ justifyContent: 'flex-start' }}>
        <FlatList
          data={this.props.tweets}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <View style={styles.tweet}>
              <TouchableHighlight
                onPress={this._profileClick.bind(this, item.user)}
                underlayColor="white"
                activeOpacity={0.75}
              >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Thumbnail source={{ uri: item.user.avatar }} />
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Text
                      style={{
                        paddingLeft: 15,
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                    >
                      {item.user.name}
                    </Text>

                    <Text
                      style={{
                        paddingLeft: 15,
                        color: '#aaa',
                        fontSize: 16,
                      }}
                    >
                      {'@' + item.user.username}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
              <Text style={styles.tweetText}>{item.tweetContent}</Text>
              <View style={styles.tweetFooter}>
                <View style={styles.footerIcons}>
                  <Button
                    transparent
                    dark
                    onPress={this._tweetDetails.bind(this, item)}
                  >
                    <Icon name="ios-text-outline" />
                    <Text style={styles.badgeCount}>{item.replies}</Text>
                  </Button>
                </View>
                <View style={styles.footerIcons}>
                  <Button transparent dark>
                    <Icon name="ios-repeat" />
                    <Text style={styles.badgeCount}>{item.retweets}</Text>
                  </Button>
                </View>
                <View style={styles.footerIcons}>
                  <Button transparent dark>
                    <Icon name="ios-heart-outline" />
                    <Text style={styles.badgeCount}>{item.likes}</Text>
                  </Button>
                </View>
                <View style={styles.footerIcons}>
                  <Button transparent dark>
                    <Icon name="ios-mail-outline" />
                  </Button>
                </View>
              </View>
            </View>
          )}
        />
        {this.state.newTweetModalOpen ? null : (
          <Fab
            position="bottomRight"
            style={{ backgroundColor: '#4286f4', zIndex: -1 }}
            onPress={this.openModal.bind(this)}
            ref={'FAB'}
          >
            <Icon name="md-create" />
          </Fab>
        )}
      </View>
    );
  }
}

export default testScreen;
