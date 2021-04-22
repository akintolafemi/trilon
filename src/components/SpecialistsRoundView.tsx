import React, {FunctionComponent} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../common';
import {Icon as RNEIcon} from 'react-native-elements';

type Props = {
  source?: string;
  name?: string;
  alias?: string;
  pressed?: Function;
  isOnline?: boolean;
};

const SpecialistsRoundViewComponent: FunctionComponent<Props> = ({
  source,
  name,
  alias,
  pressed,
  isOnline = false,
}) => {
  return (
    <TouchableOpacity onPress={pressed} style={{padding: Fonts.w(5), alignItems: 'center'}}>
      <View style={{justifyContent: 'center', alignItems: 'center',  borderRadius: Fonts.h(70), borderWidth: Fonts.w(2), borderColor: Colors.trilonO, width: Fonts.h(70), height: Fonts.h(70)}}>
        <Image source={source} style={{width: '100%', height: '100%', borderRadius: Fonts.h(70), borderColor: Colors.white, borderWidth: Fonts.w(2)}} />
        {isOnline ? (
          <RNEIcon name='ellipse' type='ionicon' size={Fonts.h(15)} color={Colors.trilonG} containerStyle={{position: 'absolute', bottom: Fonts.h(0), right: Fonts.w(0)}} iconStyle={{borderColor: Colors.white, borderWidth: Fonts.h(1), borderRadius: Fonts.h(15)}} />
        ) : null
        }
      </View>
      <View style={{marginTop: Fonts.h(5), alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: Fonts.h(12), color: Colors.darkText}}>{name}</Text>
        <Text style={{fontWeight: '200', fontSize: Fonts.h(10), color: Colors.darkText}}>{alias}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SpecialistsRoundViewComponent;
