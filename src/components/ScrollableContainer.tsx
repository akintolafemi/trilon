import React, {FunctionComponent} from 'react';
import {Platform, StyleProp, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, Fonts} from '../common';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  noPadding?: boolean;
  stickyHeaderIndices?: Array<number>
};
const ScrollableContainer: FunctionComponent<Props> = ({
  children,
  style = {},
  noPadding = false,
  containerStyle= {},
  stickyHeaderIndices
}) => {
  return (
    <KeyboardAwareScrollView
      style={[{backgroundColor: Colors.white}, style]}
      contentContainerStyle={[noPadding ? {} : {padding: Fonts.w(10)}, containerStyle]}
      alwaysBounceHorizontal={false}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={stickyHeaderIndices}
      extraScrollHeight={Platform.OS === 'ios' ? 50 : 0}
      enableOnAndroid={true}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default ScrollableContainer;
