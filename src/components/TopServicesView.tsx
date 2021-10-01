import React, {FunctionComponent} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../common';

type Props = {
  source?: string;
  label?: string;
  color?: string;
  press?: Function;
  isRow?: boolean;
};

const TopServicesViewComponent: FunctionComponent<Props> = ({
  source,
  label,
  color,
  press,
  isRow = false,
}) => {
  return (
    !isRow ? (
      <TouchableOpacity onPress={press} style={{padding: Fonts.w(5), alignItems: 'center'}}>
        <View style={{justifyContent: 'center', alignItems: 'center', borderRadius: Fonts.h(10), width: Fonts.h(70), height: Fonts.h(70), backgroundColor: color}}>
          <Image source={{uri: source}} style={{width: '60%', height: '60%'}} />
        </View>
        <View style={{marginTop: Fonts.h(5), alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: Fonts.h(15)}}>{label}</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: Fonts.h(10)}}>
        <View style={{justifyContent: 'center', alignItems: 'center', borderRadius: Fonts.h(10), width: Fonts.h(60), height: Fonts.h(60), backgroundColor: color, marginRight: Fonts.w(10)}}>
          <Image source={source} style={{width: '60%', height: '60%'}} />
        </View>
        <Text style={{fontWeight: 'bold', fontSize: Fonts.h(15)}}>{label}</Text>
      </View>
    )
  );
};

export default TopServicesViewComponent;
