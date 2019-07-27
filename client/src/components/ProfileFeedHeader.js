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
import YouTubeVideo from '../components/YouTubeVideo';

const { width } = Dimensions.get('window');

const componentWidth = width;
const videoHeight = width * 0.6;

function ProfileFeedHeader(props) {
  const {
    user,
    toggleSwitch,
    switchValue,
    postData,
    currentUser,
    postCreator,
    currentUserKey,
    postUserParentKey,
  } = props;
  // Initial State
  const [isLoaded, setIsLoaded] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [username, setUsername] = useState(null);
  const [sameUser, setSameUser] = useState(false);
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [bio, setBio] = useState(null);
  // Event Handlers
  const editButtonPress = () => {
    props.navigation.navigate('Bio', {
      currentUserKey: currentUserKey,
    });
  };

  const navigateToVideo = () => {
    if (sameUser) {
      props.navigation.navigate('Video', {
        user: user,
        currentUser: currentUser,
        currentUserKey: currentUserKey,
      });
    }
  };

  useEffect(() => {
    if (postData) {
      setProfilePhoto(postData._value.userPhoto);
      setUsername(postData._value.username);
      setFollowing(postCreator.followingCount);
      setFollowers(postCreator.followersCount);
      if (postCreator.bio) {
        setBio(postCreator.bio);
      }
      if (postData._value.username === user.displayName) {
        setSameUser(true);
      }
      setIsLoaded(true);
    } else {
      setProfilePhoto(user.photoURL);
      setUsername(user.displayName);
      setSameUser(true);
      setFollowing(currentUser.followingCount);
      setFollowers(currentUser.followersCount);
      if (currentUser.bio) {
        setBio(currentUser.bio);
      }
      setIsLoaded(true);
    }

    return () => {
      setIsLoaded(false);
    };
  }, []);

  return (
    <View>
      {isLoaded && (
        <View style={styles.container}>
          <View style={styles.viewOne}>
            {sameUser ? (
              <YouTubeVideo
                currentUserKey={currentUserKey}
                style={{ height: '100%', width: '100%' }}
                navigateToVideo={navigateToVideo}
              />
            ) : (
              <YouTubeVideo
                postUserParentKey={postUserParentKey}
                style={{ height: '100%', width: '100%' }}
                navigateToVideo={navigateToVideo}
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
              <Text style={styles.followCount}>{following}</Text>
            </View>
            {!sameUser ? (
              <View style={{ width: '100%' }}>
                <TouchableOpacity style={styles.messageButton}>
                  <Text style={styles.messageButtonText}>Message</Text>
                </TouchableOpacity>
                <ToggleSwitch
                  toggleSwitch={toggleSwitch}
                  switchValue={switchValue}
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
}
export default withNavigation(ProfileFeedHeader);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
    paddingBottom: 40,
  },
  viewOne: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: videoHeight,
    width: componentWidth,
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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
    flex: 1,
  },
  followCount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Roboto',
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
  editButton: {
    color: 'red',
    height: 30,
    width: '35%',
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
});
