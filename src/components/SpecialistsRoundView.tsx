import React, {FunctionComponent} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../common';

type Props = {
  source?: string;
  label?: string;
  color?: string;
  press?: Function
};

const SpecialistsRoundViewComponent: FunctionComponent<Props> = ({
  source,
  name,
  press
}) => {
  return (
    <TouchableOpacity onPress={press} style={{padding: Fonts.w(5), alignItems: 'center'}}>
      <View style={{justifyContent: 'center', alignItems: 'center',  borderRadius: Fonts.h(70), borderWidth: Fonts.w(2), borderColor: Colors.trilonO, width: Fonts.h(70), height: Fonts.h(70)}}>
        <Image source={source} style={{width: '100%', height: '100%', borderRadius: Fonts.h(70), borderColor: Colors.white, borderWidth: Fonts.w(2)}} />
      </View>
      <View style={{marginTop: Fonts.h(5), alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: Fonts.h(12), color: Colors.darkText}}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SpecialistsRoundViewComponent;
