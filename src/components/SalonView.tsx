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

const SalonViewComponent: FunctionComponent<Props> = ({
  source,
  label,
  address,
  rating = '1.0',
  containerStyle,
  imageStyle,
  press
}) => {
  return (
    <RNECard containerStyle={[{width: Fonts.w(250), padding: Fonts.w(0), marginLeft: Fonts.w(0), marginTop: Fonts.w(5), borderRadius: Fonts.h(10)}, containerStyle]}>
      <RNECard.Image source={{uri: source}} style={[{borderTopLeftRadius: Fonts.h(10), borderTopRightRadius: Fonts.h(10)}, imageStyle]}/>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Fonts.w(15), paddingTop: Fonts.h(5)}}>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: Fonts.h(15)}}>{label}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RNEIcon name='star' type='ionicon' size={Fonts.h(14)} color={Colors.trilon} />
          <Text style={{fontSize: Fonts.h(14), fontWeight: '600'}}>{rating}</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: Fonts.w(15)}}>
        <Text style={{color: Colors.darkText, fontSize: Fonts.h(12)}}>{address}</Text>
      </View>
      <RNEButton
        title="View"
        onPress={press}
        titleStyle={{fontSize: Fonts.h(12)}}
        buttonStyle={{backgroundColor: Colors.trilon, alignSelf: 'flex-end', height: Fonts.h(30), paddingHorizontal: Fonts.w(20), marginTop: Fonts.h(5), marginBottom: Fonts.h(0), borderTopLeftRadius: Fonts.w(10), borderBottomRightRadius: Fonts.w(10)}}
      />
    </RNECard>
  );
};

export default SalonViewComponent;
