import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import LoadingIndicator from './LoadingIndicator';
import FollowSwitch from './FollowSwitch';
import YouTubeVideo from './VideoUploadComponents/YouTubeVideo';
import {
  generateThreadID,
  createOrVerifyThread,
  getMessageThreadKey,
} from '../actions/Messaging/messagingActions';
import {
  increaseFollowingList,
  decreaseFollowingList,
  increaseFollowerList,
  decreaseFollowersList,
} from '../actions/userProfileActions';

const { width } = Dimensions.get('window');
const videoHeight = width * 0.6;

const ProfileHeader = props => {
  const { user, profileData, userKey, otherUserKey } = props;
  // Destructuring props
  const {
    username,
    youtubeURL,
    profilePhoto,
    startTime,
    followersCount,
    followingCount,
    bio,
    userID,
  } = profileData;
  // Initial State
  const [isLoaded, setIsLoaded] = useState(null);
  const [followers, setFollowersCount] = useState(followersCount);
  // Event Handlers
  const toggleFollowSwitch = value => {
    let counter;
    if (!value) {
      decreaseFollowingList(userKey, username);
      decreaseFollowersList(otherUserKey, user.displayName);
      counter = followers - 1;
    } else {
      increaseFollowingList(userKey, username);
      increaseFollowerList(otherUserKey, user.displayName);
      counter = followers + 1;
    }
    setFollowersCount(counter);
  };

  const onMessageButtonPress = async () => {
    const threadID = await generateThreadID(user, userID);
    const newThreadKey = await createOrVerifyThread(threadID);
    if (newThreadKey) {
      props.navigation.navigate('PrivateMessage', {
        user,
        threadKey: newThreadKey,
      });
    } else {
      // There is an existing messaging thread
      // Get the existing message thread key
      const key = await getMessageThreadKey(threadID);
      props.navigation.navigate('PrivateMessage', {
        user,
        threadKey: key,
      });
    }
  };

  const editButtonPress = () => {
    props.navigation.navigate('Settings');
  };

  const navigateToVideo = () => {
    // Video route only accessible if client is viewing own profile
    if (!otherUserKey) {
      props.navigation.navigate('Video', {
        user,
        currentUser: profileData,
        userKey,
      });
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);

  return (
    <View>
      {!isLoaded && <LoadingIndicator />}
      {isLoaded && (
        <View style={styles.container}>
          <View style={styles.viewOne}>
            {youtubeURL ? (
              <YouTubeVideo
                key={userKey}
                style={{ height: '100%', width: '100%' }}
                url={youtubeURL}
                startTime={startTime}
              />
            ) : (
              <Avatar
                size="large"
                icon={{ name: 'md-add-circle', type: 'ionicon', size: 72 }}
                containerStyle={{
                  height: '100%',
                  width: '100%',
                }}
                onPress={navigateToVideo}
              />
            )}
          </View>
          <View style={styles.viewTwo}>
            <View style={styles.viewThree}>
              <Text style={styles.username}>{'@' + username}</Text>
              <Avatar
                rounded
                size={100}
                source={{
                  uri: profilePhoto,
                }}
                containerStyle={styles.avatar}
              />
            </View>
            <View style={styles.viewFour}>
              <Text style={{ fontSize: 16 }}> Followers: </Text>
              <Text style={styles.followCount}>{followers}</Text>
              <Text style={{ fontSize: 16, paddingLeft: 15 }}>Following:</Text>
              <Text style={styles.followCount}>{followingCount}</Text>
            </View>
            {otherUserKey ? (
              <View style={styles.viewFive}>
                <TouchableOpacity
                  style={styles.messageButton}
                  onPress={onMessageButtonPress}
                >
                  <Text style={styles.messageButtonText}>Message</Text>
                </TouchableOpacity>
                <FollowSwitch
                  otherUserKey={otherUserKey}
                  userKey={userKey}
                  user={user}
                  followers={followers}
                  setFollowersCount={setFollowersCount}
                  username={username}
                  toggleFollowSwitch={toggleFollowSwitch}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.editButton}
                onPress={editButtonPress}
              >
                <Text style={styles.editText}>Edit Profile</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.bioText}>{bio}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default withNavigation(ProfileHeader);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 14,
  },
  viewOne: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: videoHeight,
    width: '100%',
    flex: 1,
  },
  viewTwo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 3,
    paddingLeft: 15,
    paddingRight: 10,
    height: '100%',
    width: '100%',
  },
  viewThree: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  username: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    position: 'absolute',
    left: 0,
    fontWeight: 'bold',
  },
  viewFour: {
    marginTop: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  viewFive: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  followCount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Roboto',
  },
  editButton: {
    color: 'red',
    height: 30,
    width: '35%',
    backgroundColor: 'orangered',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12.5,
    borderRadius: 15,
    marginBottom: 10,
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  bioText: {
    color: 'black',
    fontSize: 16,
    paddingRight: 10,
  },
  avatar: {
    position: 'absolute',
    right: 0,
    marginTop: 10,
  },
  messageButton: {
    color: 'red',
    height: 30,
    width: '30%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12.5,
    borderRadius: 15,
    marginBottom: 15,
  },
  messageButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
});
