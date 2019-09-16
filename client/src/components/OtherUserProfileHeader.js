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
import ToggleSwitch from './ToggleSwitch';
import YouTubeVideo from './VideoUploadComponents/YouTubeVideo';
import {
  generateThreadID,
  createOrVerifyThread,
} from '../actions/messagingActions';

const { width } = Dimensions.get('window');
const videoHeight = width * 0.6;

const OtherUserProfileHeader = props => {
  const { otherUserData, otherUserKey, userKey, user } = props;
  // Initial State
  const [isLoaded, setIsLoaded] = useState(null);
  const [bio, setBio] = useState(null);
  const [videoExists, setVideoExists] = useState(null);
  const [following] = useState(otherUserData.followingCount);
  const [followers, setFollowersCount] = useState(otherUserData.followersCount);
  // Event Handlers
  const onMessageButtonPress = async item => {
    const threadID = await generateThreadID(user, otherUserData.userID);
    const newThreadKey = await createOrVerifyThread(threadID);
    if (newThreadKey) {
      props.navigation.navigate('PrivateMessage', {
        otherUserData,
        user,
        threadID,
        threadKey: newThreadKey,
      });
    } else {
      // There is an existing messaging thread
      props.navigation.navigate('PrivateMessage', {
        otherUserData,
        user,
        threadID,
      });
    }
  };

  useEffect(() => {
    if (otherUserData.bio) {
      setBio(otherUserData.bio);
    }
    if (otherUserData.youtubeURL) {
      setVideoExists(true);
    }
    setIsLoaded(true);

    return () => {
      setIsLoaded(false);
    };
  }, []);

  return (
    <View>
      {isLoaded && (
        <View style={styles.container}>
          <View style={styles.viewOne}>
            {videoExists ? (
              <YouTubeVideo
                key={otherUserKey}
                style={{ height: '100%', width: '100%' }}
                url={otherUserData.youtubeURL}
                startTime={otherUserData.startTime}
              />
            ) : (
              <Avatar
                size="large"
                icon={{ name: 'md-add-circle', type: 'ionicon', size: 72 }}
                containerStyle={{
                  height: '100%',
                  width: '100%',
                }}
              />
            )}
          </View>
          <View style={styles.viewTwo}>
            <View style={styles.viewThree}>
              <Text style={styles.username}>
                {'@' + otherUserData.username}
              </Text>
              <Avatar
                rounded
                size={100}
                source={{
                  uri: otherUserData.profilePhoto,
                }}
                containerStyle={styles.avatar}
              />
            </View>
            <View style={styles.viewFour}>
              <Text style={{ fontSize: 16 }}>Followers:</Text>
              <Text style={styles.followCount}>{followers}</Text>
              <Text style={{ fontSize: 16, paddingLeft: 15 }}>Following:</Text>
              <Text style={styles.followCount}>{following}</Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={styles.messageButton}
                onPress={onMessageButtonPress}
              >
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
              <ToggleSwitch
                otherUserData={otherUserData}
                otherUserKey={otherUserKey}
                userKey={userKey}
                user={user}
                followers={followers}
                setFollowersCount={setFollowersCount}
              />
            </View>
            <Text style={styles.bioText}>{bio}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
export default withNavigation(OtherUserProfileHeader);

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
  followCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Roboto',
    paddingLeft: 5,
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
});
