import React, {Component, FunctionComponent, useRef, useState, useEffect} from 'react';
import {titleName} from '../../../app.json';

import {SafeAreaView, PermissionsAndroid, Platform, StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {openDrawer} from '../../navigation/RootNavigation';
import {Colors, Fonts} from '../../common';
import {Header, Icon as RNEIcon, Card as RNECard, Input as RNEInput} from 'react-native-elements';
import TitleLabel from '../../components/TitleLabel';
import AlertModal from '../../components/AlertModal';
import ErrorModal from '../../components/ErrorModal';
import OkModal from '../../components/OkModal';
import TopServicesViewComponent from '../../components/TopServicesView';
import SalonViewComponent from '../../components/SalonView';
import {TopServices} from '../../common/Constants';
import ScrollableContainer from '../../components/ScrollableContainer';

type Props = StackScreenProps<DashboardParamList, 'Dashboard'>;

const generalOverlasy = {height: '100%', width: '100%', backgroundColor: Colors.black, opacity: 0.4, position: 'absolute', borderBottomLeftRadius: Fonts.w(40), borderBottomRightRadius: Fonts.w(40)};
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

const salonsImages = [
  {
    id: '1',
    source: require('../../assets/images/splash1.jpg'),
    label: 'Label X',
    rating: '3.5',
    address: 'Shop 123, Agbowo complex, Ibadan'
  },{
    id: '2',
    source: require('../../assets/images/splash2.jpg'),
    label: 'Label Y',
    rating: '4.0',
    address: 'Address number 2, state Zee...'
  },
];

const Dashboard: FunctionComponent<Props> = ({navigation, route}) => {
  const [dashboardImg, setDashboardImg] = useState<Object>(imageList[0]);
  const alertRef = useRef<alertRef>(null);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrormessage] = useState<string>('');
  const [showOkModal, setShowOkModal] = useState<boolean>(false);
  const [okMessage, setOkMessage] = useState<string>('');

  useEffect(() => {
    const randomX = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    setDashboardImg(imageList[randomX]);

    try{
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then((isLocationgranted) => {
          if (!isLocationgranted) {
          //  alertRef.current?.showModal({title: 'Enable your Location', message: 'Please allow your location to serve you better', icon: 'location-pin'})
          }
        })
    } catch (err) {
      console.warn(err);
    }
  }, []);

  async function handleLocationAllow() {
    if (Platform.OS === 'ios') {

    }
    else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Trilon.ng Location Permission",
            message: "Trilon.ng needs access to your location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setOkMessage("Trilon.ng can now access your location to serve you better");
          setShowOkModal(true);
        } else {
          setErrormessage("Location permission denied");
          setShowErrorModal(true);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={{}}>
        <ImageBackground
          source={dashboardImg.source}
          style={{height: Fonts.h(300), resizeMode: "cover"}}
          imageStyle={{resizeMode: 'cover', borderBottomLeftRadius: Fonts.w(40), borderBottomRightRadius: Fonts.w(40)}}
        >
          <View style={dashboardImg.overlayStyles}></View>
          <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            backgroundColor='transparent'
            translucent={true}
            leftComponent={
              <TouchableOpacity
                onPress={navigation.openDrawer}
              >
                <RNEIcon name="menu" color={Colors.white} size={Fonts.h(30)} />
              </TouchableOpacity>
            }
            containerStyle={{
              justifyContent: 'space-around',
              borderBottomWidth: Fonts.h(0)
            }}
          />
          <View style={{flex: 1, justifyContent: 'flex-end', marginHorizontal: Fonts.w(10)}}>
            <TitleLabel
              title="Find and book best services"
              textStyle={{
                fontWeight: 'bold',
                fontSize: Fonts.h(20),
                color: Colors.white,
                marginHorizontal: Fonts.w(10),
                marginBottom: Fonts.h(10)
              }}
            />
            <RNEInput
              leftIcon={{ type: 'ionicon', name: 'search-outline', color: Colors.darkText, size: Fonts.h(20) }}
              placeholder='Search salon, spa and barber'
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              returnKeyType="done"
              keyboardType="default"
              secureTextEntry={true}
            />
          </View>
        </ImageBackground>
      </View>
      <ScrollableContainer style={{flex: 1, marginBottom: Fonts.h(15)}} contentContainerStyle={{}} noPadding={true}>
        <View style={styles.sectionContainer}>
          <TitleLabel
            title="Available Categories"
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
          <FlatList
            data={TopServices}
            horizontal={true}
            renderItem={({ item }) => (
              <TopServicesViewComponent
                label={item.label}
                source={item.source}
                color={item.color}
                press={item.press}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.sectionContainer}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <TitleLabel
              title="Best Salon"
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
            <TouchableOpacity
              style={{color: Colors.darkText}}
            >
              <Text>View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={salonsImages}
            horizontal={true}
            renderItem={({ item }) => (
              <SalonViewComponent
                source={item.source}
                label={item.label}
                address={item.address}
                rating={item.rating}
                press={() => navigation.navigate('Salon', {salonId: item.id})}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
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
  sectionContainer: {paddingTop: Fonts.h(20), paddingHorizontal: Fonts.w(15)},
  inputContainerStyle: {borderRadius: Fonts.h(20), borderWidth: 1, paddingHorizontal: Fonts.h(20), height: Fonts.h(50), backgroundColor: Colors.triloneW},
  inputStyle: {fontSize: Fonts.h(15)},
});

export default Dashboard;
