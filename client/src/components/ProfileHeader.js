import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import FollowSwitch from './FollowSwitch';
import YouTubeVideo from './VideoUploadComponents/YouTubeVideo';
import {
  generateThreadID,
  createOrVerifyThread,
  getMessageThreadKey,
} from '../actions/Messaging/messagingActions';
import { onFollowSwitchChange } from '../actions/userProfileActions';

const { width } = Dimensions.get('window');
const videoHeight = width * 0.6;

// profilekey is null if route is accessed by pressing profile icon on HomeScreen
const ProfileHeader = ({ user, userkey, profile, profilekey, navigation }) => {
  const clientName = user.username;
  const clientID = user.userID;
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
  } = profile;
  // Initial State
  const [followers, setFollowersCount] = useState(followersCount);
  // Event Handlers
  const handleFollowSwitchChange = value => {
    const counter = value ? followers + 1 : followers - 1;
    setFollowersCount(counter);
    onFollowSwitchChange(value, userkey, username, profilekey, clientName);
  };

  const onMessageButtonPress = async () => {
    const threadID = await generateThreadID(clientID, userID);
    const newThreadKey = await createOrVerifyThread(threadID);
    if (newThreadKey) {
      navigation.navigate('PrivateMessage', {
        threadKey: newThreadKey,
      });
    } else {
      // There is an existing messaging thread
      // Get the existing message thread key
      const key = await getMessageThreadKey(threadID);
      navigation.navigate('PrivateMessage', {
        threadKey: key,
      });
    }
  };

  const editButtonPress = () => {
    navigation.navigate('Settings');
  };

  const navigateToVideo = () => {
    if (username === clientName) {
      navigation.navigate('Video');
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.viewOne}>
          {youtubeURL ? (
            <YouTubeVideo
              key={userkey}
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
                backgroundColor: 'cyan',
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
            <Text style={{ fontSize: 16, paddingLeft: 15 }}> Following: </Text>
            <Text style={styles.followCount}>{followingCount}</Text>
          </View>
          {username != clientName ? (
            <View style={styles.viewFive}>
              <TouchableOpacity
                style={styles.messageButton}
                onPress={onMessageButtonPress}
              >
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
              <FollowSwitch
                handleFollowSwitchChange={handleFollowSwitchChange}
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
    </View>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.object.isRequired,
  userkey: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  userkey: state.auth.userkey,
  profile: state.profile.profile,
  profilekey: state.profile.profilekey,
  postsByProfile: state.post.postsByProfile,
});

export default connect(mapStateToProps)(withNavigation(ProfileHeader));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 14,
  },
  viewOne: {
    flex: 1,
    height: videoHeight,
    width,
  },
  viewTwo: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingRight: 10,
  },
  viewThree: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
  },
  viewFour: {
    marginTop: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    marginBottom: 7.5,
  },
  viewFive: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
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
  followCount: {
    fontSize: 16,
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
