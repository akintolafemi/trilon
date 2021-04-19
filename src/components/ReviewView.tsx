import React, {FunctionComponent} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../common';
import { ListItem, Left, Body, Right, Thumbnail } from "native-base";
import RenderRatings from '../functions/RenderRatings';

type Props = {
  image?: string;
  name?: string;
  ratings?: number;
  time?: date;
  review?: string;
};

const ReviewViewComponent: FunctionComponent<Props> = ({
  image,
  name,
  ratings = 0,
  time = '',
  review = '',
}) => {
  return (
    <View style={{marginVertical: Fonts.h(7), paddingVertical: Fonts.h(5)}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: image}} style={{height: Fonts.h(60), width: Fonts.w(60), borderRadius: Fonts.h(60)}} />
          <View style={{marginLeft: Fonts.w(10)}}>
            <Text style={{fontWeight: 'bold', fontSize: Fonts.h(16), marginBottom: Fonts.h(5)}}>{name}</Text>
            <View style={{flexDirection: 'row'}}>
              <RenderRatings
                totalStars={ratings}
                colorOne={Colors.trilonO}
                colorTwo={Colors.dotcColor}
                size={Fonts.h(14)}
                margin={Fonts.w(1)}
              />
            </View>
          </View>
        </View>
        <Text style={{color: Colors.darkText, fontSize: Fonts.h(13)}}>{time}</Text>
      </View>
      <Text style={{marginTop: Fonts.h(4), fontWeight: '800'}}>{review}</Text>
    </View>
  );
};

export default ReviewViewComponent;
