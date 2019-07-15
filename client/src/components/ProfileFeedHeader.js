import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Video from 'react-native-video';
import ToggleSwitch from './ToggleSwitch';
const { width } = Dimensions.get('window');

const componentWidth = width;
const videoHeight = width * 0.6;

export default function ProfileFeedHeader(props) {
  const { user, toggleSwitch, switchValue, UserOfPost } = props;
  // Initial State
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [username, setUsername] = useState(null);
  const [sameUser, setSameUser] = useState(false);
  // Event Handlers
  useEffect(() => {
    if (UserOfPost) {
      setProfilePhoto(UserOfPost._value.userPhoto);
      setUsername(UserOfPost._value.username);
      if (UserOfPost._value.username === user.displayName) {
        setSameUser(true);
      }
    } else {
      setProfilePhoto(user.photoURL);
      setUsername(user.displayName);
      setSameUser(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewOne}>
        <Video
          source={require('../assets/videos/sample1.mp4')}
          ref={ref => {
            player = ref;
          }}
          repeat={true}
          style={styles.backgroundVideo}
          resizeMode={'cover'}
        />
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
            containerStyle={{
              position: 'absolute',
              right: 0,
              marginTop: 10,
            }}
          />
        </View>
        <View style={styles.viewFour}>
          <Text style={{ fontSize: 16 }}> Followers: </Text>
          <Text style={styles.followCount}>1,539</Text>
          <Text style={{ fontSize: 16, paddingLeft: 15 }}> Following: </Text>
          <Text style={styles.followCount}>2,781</Text>
        </View>
        {!sameUser && (
          <View style={{ width: '100%' }}>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
            <ToggleSwitch
              toggleSwitch={toggleSwitch}
              switchValue={switchValue}
            />
          </View>
        )}
        {sameUser && (
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.bioText}>
          This is a sample user bio where they can post their location,
          interests, and favorite dance teams etc.
        </Text>
      </View>
    </View>
  );
}

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
    justifyContent: 'flex-end',
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
});
