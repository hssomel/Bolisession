import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function Post(props) {
  const {
    // tweet,
    // name,
    // handle,
    // time,
    // retweeted,
    // liked,
    // picture,
    navigation,
    // thekey,
    // isReply,
  } = props;

  const handleTestPress = () => {
    props.navigation.navigate('Map');
  };

  return (
    <TouchableHighlight onPress={handleTestPress}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.photoContainer}>
            <View style={styles.innerPhotoContainer}>
              <TouchableOpacity onPress={handleTestPress}>
                <Image
                  source={require('../assets/images/dhol.png')}
                  style={styles.photo}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.info}>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>
                John Doe
                <Text style={styles.userHandleAndTime}>@KDTrey35 1hr</Text>
              </Text>
            </View>
            <View style={styles.tweetTextContainer}>
              <Text style={styles.tweetText}>
                Random tweet that user will output
              </Text>
            </View>
            <View style={styles.tweetActionsContainer}>
              <TouchableOpacity style={styles.commentButton}>
                <EvilIcons
                  name={'comment'}
                  style={styles.commentButtonIcon}
                  size={25}
                  color={'rgb(136, 153, 166)'}
                />
                <Text style={styles.commentsCount}>20</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleTestPress}
                style={styles.retweetButton}
              >
                <EvilIcons
                  name={'retweet'}
                  size={25}
                  color={'rgb(136, 153, 166)'}
                />
                <Text
                  style={[
                    styles.retweetButtonIcon,
                    {
                      color: 'rgb(136, 153, 166)',
                      fontWeight: 'bold',
                    },
                  ]}
                >
                  retweets
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleTestPress}
                style={styles.likeButton}
              >
                <EvilIcons
                  name={'heart'}
                  size={25}
                  color={'rgb(136, 153, 166)'}
                />
                <Text
                  style={[
                    styles.likeButtonIcon,
                    {
                      color: 'rgb(136, 153, 166)',
                      fontWeight: '300',
                    },
                  ]}
                >
                  20
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <SimpleLineIcons
                  name={'share'}
                  size={16}
                  color={'rgb(136, 153, 166)'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    flexDirection: 'column',
    backgroundColor: '#1b2836',
  },
  isReplyContainer: {
    flex: 1,
    borderColor: 'green',
    flexDirection: 'row',
    borderWidth: 0,
    height: 20,
    marginTop: 5,
  },
  innerContainer: {
    flex: 1,
    borderColor: 'green',
    flexDirection: 'row',
    borderWidth: 0,
    height: 'auto',
  },
  photoContainer: {
    flex: 0.23,
    borderColor: 'yellow',
    flexDirection: 'column',
    borderWidth: 0,
  },
  innerPhotoContainer: { height: 100, alignItems: 'center' },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 15,
  },
  info: {
    flex: 0.77,
    borderColor: 'yellow',
    flexDirection: 'column',
    borderWidth: 0,
  },
  userDetails: {
    flex: 1,
    borderColor: 'blue',
    borderWidth: 0,
    marginBottom: 5,
  },
  userName: { color: 'white', fontWeight: 'bold' },
  userHandleAndTime: {
    color: 'rgb(136, 153, 166)',
    marginLeft: 5,
  },
  tweetTextContainer: { flex: 1, borderColor: 'blue', borderWidth: 0 },
  tweetText: { color: 'white', paddingRight: 10 },
  tweetActionsContainer: {
    flex: 1,
    borderColor: 'blue',
    borderWidth: 0,
    marginTop: 5,
    flexDirection: 'row',
    paddingBottom: 5,
  },
  commentButton: {
    paddingLeft: 0,
    flex: 0.25,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 0,
  },
  commentButtonIcon: {
    margin: 0,
    marginLeft: -4,
    borderColor: 'red',
    borderWidth: 0,
  },
  commentsCount: {
    position: 'absolute',
    left: 27,
    color: 'rgb(136, 153, 166)',
    marginLeft: -4,
  },
  retweetButton: {
    padding: 5,
    flex: 0.25,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 0,
  },
  retweetButtonIcon: {
    position: 'absolute',
    left: 27,
    marginLeft: 3,
  },
  likeButton: {
    padding: 5,
    flex: 0.25,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 0,
  },
  likeButtonIcon: {
    position: 'absolute',
    left: 27,
    marginLeft: 3,
  },
  shareButton: {
    padding: 5,
    flex: 0.25,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 0,
  },
});

//   Tweet.propTypes = {
//     retweeted: PropTypes.string.isRequired,
//   };
//   Tweet.defaultProps = {
//     name: 'Anonymous',
//     tweet: 'A tweet',
//     retweeted: false,
//     liked: false,
//   };
