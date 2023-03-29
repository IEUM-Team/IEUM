import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
// import Video from 'react-native-video';
import { Video } from 'expo-av';

const { DEVICE_WIDTH } = useDimension();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.background,
    // flex: 1,
    // alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default function BottleList(): JSX.Element {
  const beachVideo = require('../../assets/videos/beachblue.mp4');
  return (
    <View style={styles.container}>
      <Video
        source={beachVideo}
        rate={1.0}
        // volume={1.0}
        isMuted={true}
        // resizeMode='cover'
        shouldPlay
        isLooping={true}
        style={{ width: '100%', height: '100%' }}
      />
    </View>
    // <KeyboardAwareScrollView
    //   // style={styles.container}
    //   keyboardShouldPersistTaps='handled'
    //   contentContainerStyle={styles.container}
    // >
    //   <View style={{ width: DEVICE_WIDTH * 0.8 }}>

    //   </View>
    // </KeyboardAwareScrollView>
  );
}
