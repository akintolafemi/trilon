import React, {FunctionComponent} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../common';

type Props = {
  source?: string;
  label?: string;
  color?: string;
  press?: Function
};

const TopServicesViewComponent: FunctionComponent<Props> = ({
  source,
  label,
  color,
  press
}) => {
  return (
    <TouchableOpacity onPress={press} style={{padding: Fonts.w(5), alignItems: 'center'}}>
      <View style={{justifyContent: 'center', alignItems: 'center', borderRadius: Fonts.h(10), width: Fonts.h(70), height: Fonts.h(70), backgroundColor: color}}>
        <Image source={source} style={{width: '60%', height: '60%'}} />
      </View>
      <View style={{marginTop: Fonts.h(5), alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: Fonts.h(15)}}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TopServicesViewComponent;
