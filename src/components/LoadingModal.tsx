import React, {
  forwardRef,
  ForwardRefRenderFunction,
  PureComponent,
} from 'react';
import {View, Modal, Text} from 'react-native';

import LottieView from 'lottie-react-native';
import {Colors, Fonts} from '../common';

export interface loderRef {
  toggle(): void;
}
const loader = require('../assets/lottie/loading-bubble.json');
const LoadingModal: ForwardRefRenderFunction<loderRef, {loading: boolean}> = ({
  loading,
}) => {
  return (
    <Modal
      transparent={true}
      statusBarTranslucent={true}
      visible={loading}
      onRequestClose={() => {}}
      animationType="fade">
      <View
        style={[
          {
            flex: 1,
            backgroundColor: '#ffffffff',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <LottieView
          style={{width: Fonts.w(100)}}
          source={loader}
          autoPlay
          loop
        />
        <Text style={{fontSize: Fonts.w(16), fontFamily: Fonts.AVERTA_REGULAR, color: Colors.trilon, marginTop: Fonts.h(30)}}>Trilon.ng....</Text>
      </View>
    </Modal>
  );
};

export default LoadingModal;
