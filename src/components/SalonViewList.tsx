import React, {FunctionComponent} from 'react';
import {Image, Text, View, TouchableOpacity, ViewStyle, StyleProp, ImageStyle} from 'react-native';
import {Colors, Fonts} from '../common';
import {Icon as RNEIcon, Card as RNECard, Button as RNEButton} from 'react-native-elements';

type Props = {
  source?: string;
  label?: string;
  address?: string;
  rating?: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  press?: Function
};

const SalonViewListComponent: FunctionComponent<Props> = ({
  source,
  label,
  distance = '0km',
  address,
  rating = '1.0',
  openTime = '09:00AM - 09:00PM',
  containerStyle,
  imageStyle,
  press
}) => {
  return (
    <View style={{flexDirection: 'row', marginVertical: Fonts.h(7), paddingVertical: Fonts.h(5)}}>
      <Image source={source} style={{height: '100%', width: Fonts.w(130), borderRadius: Fonts.h(10)}}>
      </Image>
      <View style={{marginLeft: Fonts.w(10), flex: 1, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', color: Colors.black, fontSize: Fonts.h(15), marginBottom: Fonts.h(5)}}>{label}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RNEIcon name='location' type='ionicon' size={Fonts.h(11)} style={{ color: Colors.darkText }} />
            <Text style={{color: Colors.darkText, fontSize: Fonts.h(10), marginLeft: Fonts.w(2)}}>{distance}</Text>
          </View>
        </View>
        <Text style={{color: Colors.darkText, fontSize: Fonts.h(13), marginBottom: Fonts.h(5)}}>{address}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: Fonts.h(5)}}>
          <RNEIcon name='star' type='ionicon' size={Fonts.h(15)} color={Colors.trilonO} />
          <Text style={{color: Colors.darkText, marginLeft: Fonts.w(2)}}>{rating}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{color: Colors.trilonO, fontWeight: 'bold', fontSize: Fonts.h(13)}}>{openTime}</Text>
          <RNEButton
            title="View"
            titleStyle={{fontSize: Fonts.h(12)}}
            onPress={press}
            buttonStyle={{backgroundColor: Colors.trilonO, height: Fonts.h(30), paddingHorizontal: Fonts.w(20), marginTop: Fonts.h(5), marginBottom: Fonts.h(0)}}
          />
        </View>
      </View>
    </View>
  );
};

export default SalonViewListComponent;
