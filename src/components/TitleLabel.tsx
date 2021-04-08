import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { View, Text, StyleProp, TextStyle, ViewStyle } from 'react-native';

import Colors from '../constants/Colors';

const TitleLabel = ({
  title,
  textStyle,
  barStyle,
  containerStyle
}: {
  title?: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{title}</Text>
      <View style={barStyle}></View>
    </View>

  );
};
export default TitleLabel;
