import React, {Component, FunctionComponent, useRef, useState} from 'react';

import {AppRegistry, SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Swiper from 'react-native-swiper';
import {Colors, Fonts} from '../../common';
import SwipeContainer from './SwipeContainer';
import {RootStackParamList} from '../../navigation/routes';


type Props = StackScreenProps<RootStackParamList, 'Onboard'>;

const Onboard: FunctionComponent<Props> = ({navigation}) => {
  const [swipperIndex, setSwipperIndex] = useState(0);

  const swipeList = [
    {
      source: require('../../assets/images/onboard.jpg'),
      subject: 'Find and Book Services',
      description: 'Find and book baber, beauty, salon and spa services anywhere, anytime',
      buttonTitle: 'Next',
      press: () => {setSwipperIndex(swipperIndex + 1)}
    },
    {
      source: require('../../assets/images/splash3.jpg'),
      subject: 'Wear the Look that Makes You Glow',
      description: 'Choose from your favourite salon, baber shop to rock your styles',
      buttonTitle: 'Next',
      press: () => {setSwipperIndex(swipperIndex + 1)}
    },
    {
      source: require('../../assets/images/get-started.jpg'),
      subject: 'Style that Fits your Lifestyle',
      description: 'Choose from our make-up special offers and packages that fit your lifestyle',
      buttonTitle: 'Get Started',
      press: () => {navigation.navigate('OnboardMain')}
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <Swiper
        style={{
          padding: 0,
        }}
        index={swipperIndex}
        loop={false}
        bounces
        horizontal
        dot={
          <View
            style={{
              width: Fonts.w(11),
              height: Fonts.h(5),
              borderRadius: Fonts.w(5),
              marginHorizontal: Fonts.w(2),
              backgroundColor: Colors.dotcColor,
            }}
          />
        }
        activeDot={
          <View
            style={{
              width: Fonts.w(11),
              height: Fonts.h(5),
              marginHorizontal: Fonts.w(2),
              borderRadius: Fonts.w(5),
              backgroundColor: Colors.trilon,
            }}
          />
        }>
        {[
          ...swipeList.map((s) => (
            <SwipeContainer
              key={s.subject}
              source={s.source}
              description={s.description}
              subject={s.subject}
              buttonTitle={s.buttonTitle}
              press={s.press}
            />
          )),
        ]}
      </Swiper>
    </SafeAreaView>
  );
};

export default Onboard;
