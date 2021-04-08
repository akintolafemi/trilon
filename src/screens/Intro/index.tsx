import React, {Component, FunctionComponent, useRef, useState, useEffect} from 'react';
import {titleName} from '../../../app.json';

import {SafeAreaView, StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableWithoutFeedback} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts} from '../../common';
import {RootStackParamList} from '../../navigation/routes';



const viewList = [
  {
    source: require('../../assets/images/splash1.jpg'),
    styles: {flex: 1, alignItems: 'center', },
    styles2: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    overlayStyles: {height: '100%', width: '100%', backgroundColor: Colors.black, opacity: 0.4, position: 'absolute'},
    titleStyles: {color: Colors.trilon, fontSize: 30, fontWeight: 'bold', },
    titleSMStyles: {color: Colors.white, fontSize: 14, fontWeight: 'normal', },
    textBottomStyles: {color: Colors.whiteOpaq, fontSize: 13}
  },
  {
    source: require('../../assets/images/splash2.jpg'),
    styles: {flex: 1, alignItems: 'center', },
    styles2: {flex: 1, alignItems: 'center', marginTop: 100},
    overlayStyles: {height: '100%', width: '100%', backgroundColor: Colors.black, opacity: 0.4, position: 'absolute'},
    titleStyles: {color: Colors.trilon, fontSize: 30, fontWeight: 'bold', },
    titleSMStyles: {color: Colors.white, fontSize: 14, fontWeight: 'normal', },
    textBottomStyles: {color: Colors.whiteOpaq, fontSize: 13}
  },
  {
    source: require('../../assets/images/splash3.jpg'),
    styles: {flex: 1, },
    styles2: {flex: 1, justifyContent: 'flex-end', marginBottom: 180, marginLeft: 20},
    overlayStyles: {height: '100%', width: '100%', backgroundColor: Colors.black, opacity: 0.4, position: 'absolute'},
    titleStyles: {color: Colors.trilon, fontSize: 30, fontWeight: 'bold', },
    titleSMStyles: {color: Colors.white, fontSize: 14, fontWeight: 'normal', },
    textBottomStyles: {color: Colors.whiteOpaq, fontSize: 13, alignSelf: 'center'}
  },
];

type Props = StackScreenProps<RootStackParamList, 'Intro'>;

const Intro: FunctionComponent<Props> = ({navigation, route}) => {
  const modalRef = useRef(null);
  const [selectedView, setSelectedView] = useState<number>(0);
  useEffect(() => {
    try {
    //  setSelectedView(viewList[randomX]);
      setSelectedView(viewList[route.params.selectedView]);

//      setSelectedView(viewList[2]);
    } catch (error) {
      console.log('random number error', error);
    }
  }, [route]);


  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor='transparent'
        translucent={true}
      />
      <ImageBackground
        source={selectedView.source}
        style={{flex: 1, resizeMode: "cover"}}
        imageStyle={{resizeMode: 'cover'}}
      >
        <View style={selectedView.overlayStyles}></View>
        <TouchableWithoutFeedback
          onPress={()=>{navigation.navigate('Onboard')}}
        >
          <View
            style={selectedView.styles}
          >
            <View style={selectedView.styles2}>
              <Image
                style={{marginBottom: 10, height: 70, width: 70}}
                source={require('../../assets/images/trilonlight.icon.png')}
              />
              <Text
                style={selectedView.titleStyles}
              >{titleName}</Text>
              <Text style={selectedView.titleSMStyles}>STYLE THAT FITS YOUR LIFESTYLE</Text>
            </View>
            <View
              style={{marginBottom: 20}}
            >
              <Text style={selectedView.textBottomStyles}>
                @copyright 2021
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Intro;
