import React, {FunctionComponent} from 'react';
import {Image, Text, View, TouchableOpacity, ViewStyle, StyleProp, ImageStyle} from 'react-native';
import {Colors, Fonts} from '../common';
import {Icon as RNEIcon, Card as RNECard, Button as RNEButton} from 'react-native-elements';
import MapboxGL from "@react-native-mapbox-gl/maps";

import {MAPSTOKEN} from '../common/Constants';

MapboxGL.setAccessToken(MAPSTOKEN);

type Props = {
  containerStyle?: StyleProp<ViewStyle>
};

const SalonMapViewComponent: FunctionComponent<Props> = ({
  containerStyle,
}) => {
  return (
    <View style={[{width: Fonts.w(300), height: Fonts.h(300)}, containerStyle]}>
      <MapboxGL.MapView style={{flex: 1}} />
    </View>
  );
};

export default SalonMapViewComponent;
