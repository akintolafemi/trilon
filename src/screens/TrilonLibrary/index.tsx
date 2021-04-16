import React, {Component, FunctionComponent, useRef, useState, useEffect} from 'react';
import {titleName} from '../../../app.json';

import {SafeAreaView, PermissionsAndroid, Share, Linking, Platform, StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts} from '../../common';
import {Header, Icon as RNEIcon, Card as RNECard, Button as RNEButton} from 'react-native-elements';
import TitleLabel from '../../components/TitleLabel';
import AlertModal from '../../components/AlertModal';
import ErrorModal from '../../components/ErrorModal';
import OkModal from '../../components/OkModal';
import TopServicesViewComponent from '../../components/TopServicesView';
import GalleryViewComponent from '../../components/GalleryView';
import {TopServices} from '../../common/Constants';
import ScrollableContainer from '../../components/ScrollableContainer';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import {openDrawer} from '../../navigation/RootNavigation';
type Props = StackScreenProps<RootStackParamList, 'TrilonLibrary'>;

function renderStars(x) {
    let stars = [];
    let i;
    for (i = 0; i < x; i++) {
      stars.push(
        <RNEIcon key={i} name="star" type='ionicon' color={Colors.trilonO} size={Fonts.h(20)} iconStyle={{marginRight: Fonts.w(3)}} />
      );
    }
    let j = 5 - x;
    let k;
    for (k = 0; k < j; k++) {
      i++;
      stars.push(
        <RNEIcon key={i} name="star" type='ionicon' color={Colors.white} size={Fonts.h(20)} iconStyle={{marginRight: Fonts.w(3)}} />
      );
    }
    return stars
  }

const generalOverlasy = {height: '100%', width: '100%', backgroundColor: Colors.black, opacity: 0.4, position: 'absolute'};
const imageList = [
  {
    source: require('../../assets/images/dashboard-banner-1.jpg'),
    overlayStyles: [generalOverlasy, {opacity: 0.6}],
  },
  {
    source: require('../../assets/images/dashboard-banner-2.jpg'),
    overlayStyles: [generalOverlasy, {opacity: 0.6}],
  },
  {
    source: require('../../assets/images/dashboard-banner-3.jpg'),
    overlayStyles: [generalOverlasy, {opacity: 0.6}],
  },
  {
    source: require('../../assets/images/dashboard-banner-4.jpg'),
    overlayStyles: [generalOverlasy, {opacity: 0.7}],
  },
];

const galleryImages = [
  {
    source: require('../../assets/images/splash1.jpg'),
    label: 'Label X',
    rating: '3.5'
  },{
    source: require('../../assets/images/splash2.jpg'),
    label: 'Label Y',
    rating: '4.0'
  },
]

const TrilonLibrary: FunctionComponent<Props> = ({navigation, route}) => {
  const [dashboardImg, setTrilonLibraryImg] = useState<Object>(imageList[0]);
  const alertRef = useRef<alertRef>(null);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrormessage] = useState<string>('');
  const [showOkModal, setShowOkModal] = useState<boolean>(false);
  const [okMessage, setOkMessage] = useState<string>('');

  const [totalStars, setTotalStars] = useState<number>(4);

  const clickables = [
    {
      icon: 'globe-outline',
      label: 'Website',
      onPress: () => {
        Linking.openURL('https://idealswift.com');
      }
    },
    {
      icon: 'call-outline',
      label: 'Call',
      onPress: async () => {
        // if (Platform.OS === 'ios') {
        //   phoneNumber = 'telprompt:${1234567890}';
        // }
        // else {
        //   phoneNumber = 'tel:${1234567890}';
        // }
        await Linking.openURL('tel:+2348100131944');
      }
    },
    {
      icon: 'compass-outline',
      label: 'Direction',
      onPress: () => {
        openURLInBrowser('https://idealswift.com');
      }
    },
    {
      icon: 'share-outline',
      label: 'Share',
      onPress: async () => {
        try {
          const result = await Share.share({
            message:
              'Hello, I am inviting you to download the Trilon.ng unisex salon mobile app to enjoy premium salon related services.',
              title: 'Invite friends'
          }, {
            dialogTitle: 'Trilon.ng'
          });
          if (result.action === Share.sharedAction) {
            setOkMessage("Thank you for sharing Trilon.ng with your friend(s)");
            setShowOkModal(true);
            if (result.activityType) {
              // shared with activity type of result.activityType

            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            setErrormessage("Sharing action dismissed");
            setShowErrorModal(true);
          }
        } catch (error) {
          setErrormessage(error.message);
          setShowErrorModal(true);
        }
      }
    },
  ]

  useEffect(() => {
    const randomX = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    setTrilonLibraryImg(imageList[randomX]);
  }, [route]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <ScrollableContainer style={{flex: 1, marginBottom: Fonts.h(15)}} contentContainerStyle={{}} noPadding={true}>
        <ImageBackground
          source={dashboardImg.source}
          style={{height: Fonts.h(300), resizeMode: "cover"}}
          imageStyle={{resizeMode: 'cover'}}
        >
          <View style={dashboardImg.overlayStyles}></View>
          <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            backgroundColor='transparent'
            translucent={true}
            leftComponent={
              <TouchableOpacity onPress={openDrawer}>
                <RNEIcon name="arrow-back" type='ionicon' color={Colors.white} size={Fonts.h(30)} />
              </TouchableOpacity>
            }
            containerStyle={{
              justifyContent: 'space-around',
              borderBottomWidth: Fonts.h(0)
            }}
          />
          <View style={{flex: 1, justifyContent: 'flex-end', padding: Fonts.h(20)}}>
            <TitleLabel
              title="Trilon.ng Unisex Salon"
              textStyle={{
                fontWeight: 'bold',
                fontSize: Fonts.h(20),
                color: Colors.white
              }}
            />
            <Text style={styles.textBelow}>Shop 123, The Place Mall, Lekki Phase 1, Lagos.</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: Fonts.w(10), marginTop: Fonts.h(5)}}>
                  {renderStars(totalStars)}
                </View>
                <Text style={[styles.textBelow, {marginTop: Fonts.h(5)}]}>(512 Reviews)</Text>
              </View>
              <RNEButton
                type="outline"
                title="Open"
                buttonStyle={{borderColor: Colors.trilonG, borderWidth: Fonts.w(1), paddingVertical: Fonts.h(2)}}
                titleStyle={{fontSize: Fonts.h(12), color: Colors.trilonG}}
              />
            </View>
          </View>
        </ImageBackground>
        <View style={{flex: 1, padding: Fonts.h(20)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {clickables.map((click, index) => {
               return (
                 <TouchableOpacity
                   onPress={click.onPress}
                   key={index.toString()}
                   style={{alignItems: 'center'}}
                 >
                   <RNEIcon name={click.icon} type='ionicon' color={Colors.trilonO} size={Fonts.h(35)} />
                   <Text style={{color: Colors.darkText}}>{click.label}</Text>
                 </TouchableOpacity>
               );
            })}
          </View>
          <View style={styles.sectionContainer}>
            <TitleLabel
              title="Salon Specialists"
              textStyle={{
                fontWeight: 'bold',
                fontSize: Fonts.h(20),
                color: Colors.darkText
              }}
              containerStyle={{
                marginLeft: Fonts.w(5),
                marginTop: Fonts.h(10),
                marginBottom: Fonts.h(5)
              }}
            />
          </View>
        </View>
      </ScrollableContainer>
      <AlertModal
        ref={alertRef}
        closeOnTouchOutside={true}
        titleStyle={{
          fontSize: Fonts.h(20),
          fontWeight: 'bold',
          paddingBottom: Fonts.h(10),
          paddingTop: Fonts.h(20),
          color: Colors.dark,
          fontFamily: Fonts.AVERTA_SEMIBOLD,
        }}
        messageStyle={{
          textAlign: 'center',
          maxWidth: '90%',
          paddingBottom: Fonts.h(35),
        }}
        contentContainerStyle={{
          padding: Fonts.h(0),
          paddingTop: Fonts.h(30),
          borderRadius: Fonts.h(6),
          width: Fonts.h(300),
          top: '-10%',
        }}
        showConfirmButton={true}
        confirmButtonStyle={{
          backgroundColor: Colors.trilon,
          minWidth: '80%',
          borderRadius: Fonts.h(20),
          marginVertical: Fonts.h(20),
          height: 40,
          justifyContent: 'center'
        }}
        confirmText="Close"
        confirmButtonTextStyle={{
          textAlign: 'center',
          color: Colors.white,
          textAlignVertical: 'center',
        }}
        onConfirmPressed={() => {
          alertRef.current?.closeModal();
          handleLocationAllow()
        }}
      />
      <ErrorModal
        message={errorMessage}
        showModal={showErrorModal}
        onConfirm={() => setShowErrorModal(false)}
      />
      <OkModal
        message={okMessage}
        showModal={showOkModal}
        onConfirm={() => setShowOkModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {paddingTop: Fonts.h(10), paddingHorizontal: Fonts.w(15)},
  textBelow: {color: Colors.white, fontSize: Fonts.h(12), marginTop: Fonts.h(5), fontWeight: 'bold'},
});

export default TrilonLibrary;
