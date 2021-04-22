import React, {FunctionComponent} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../common';

type Props = {
  image?: string;
  name?: string;
  message?: string;
  time?: date;
  onPress?: Function;
};

const ChatListItem: FunctionComponent<Props> = ({
  image,
  name,
  message = '',
  time = '',
  onPress = () => {}
}) => {
  return (
    <View style={{marginVertical: Fonts.h(7), paddingVertical: Fonts.h(5)}}>
      <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={onPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: image}} style={{height: Fonts.h(60), width: Fonts.w(60), borderRadius: Fonts.h(60)}} />
          <View style={{marginLeft: Fonts.w(10)}}>
            <Text style={{fontWeight: 'bold', fontSize: Fonts.h(16), marginBottom: Fonts.h(5)}}>{name}</Text>
            <Text style={{fontWeight: '800', color: Colors.darkText}}>{message}</Text>
          </View>
        </View>
        <Text style={{color: Colors.darkText, fontSize: Fonts.h(13)}}>{time}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatListItem;
