import React, {FunctionComponent} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../common';
import RenderRatings from '../functions/RenderRatings';
import { Rating, AirbnbRating, Input as RNEInput, Button as RNEButton } from 'react-native-elements';
import Line from './Line';

type Props = {
  image?: string;
  rated?: Function;
  onReviewInput?: Function;
  reviewText?: string;
  pressSave?: Function;
};

const WriteReviewComponent: FunctionComponent<Props> = ({
  image = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fmodern-avatars%2F600%2FmyAvatar10-512.png&f=1&nofb=1',
  rated = () => {},
  onReviewInput = () => {},
  reviewText,
  pressSave,
}) => {
  return (
    <View style={{marginTop: Fonts.h(10)}}>
      <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: Fonts.w(10)}}>
        <Image source={{uri: image}} style={{height: Fonts.h(50), width: Fonts.w(50), borderRadius: Fonts.h(50)}} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: Fonts.w(10), flex: 1}}>
          <Text style={{color: Colors.darkText}}>Write your review</Text>
          <Rating
            type='custom'
            ratingCount={5}
            imageSize={18}
            onFinishRating={rated}
            ratingColor={Colors.trilonO}
            ratingBackgroundColor={Colors.dotcColor}
          />
        </View>
      </View>
      <View style={{marginVertical: Fonts.h(10), paddingHorizontal: Fonts.w(10)}}>
        <RNEInput
          placeholder='Leave your comment'
          containerStyle={{paddingHorizontal: 0}}
          inputContainerStyle={{borderRadius: Fonts.h(30), borderWidth: 1, marginBottom: Fonts.h(-15), paddingHorizontal: Fonts.h(10), height: Fonts.h(45), backgroundColor: Colors.triloneW}}
          inputStyle={{fontSize: Fonts.h(15)}}
          value={reviewText}
          onChangeText={onReviewInput}
          returnKeyType="done"
          keyboardType="default"
        />
        <RNEButton
          title="Post"
          onPress={pressSave}
          titleStyle={{fontSize: Fonts.h(12)}}
          buttonStyle={{backgroundColor: Colors.trilonO, height: Fonts.h(40), paddingHorizontal: Fonts.w(20), borderRadius: Fonts.h(20), alignSelf: 'flex-end'}}
        />
      </View>
      <Line />
    </View>
  );
};

export default WriteReviewComponent;
