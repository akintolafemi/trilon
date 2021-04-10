import React, {Component, FunctionComponent, useRef, useState, useEffect} from 'react';
import {titleName} from '../../../app.json';

import {SafeAreaView, StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableWithoutFeedback} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts} from '../../common';


type Props = StackScreenProps<RootStackParamList, 'Landing'>;

const Landing: FunctionComponent<Props> = ({navigation, route}) => {
  useEffect(() => {
  }, [route]);


  return (
    <SafeAreaView style={{flex: 1}}>
    </SafeAreaView>
  );
};

export default Landing;
