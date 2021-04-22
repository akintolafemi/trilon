import React, {Component, FunctionComponent, useRef, useState, useEffect} from 'react';
import {titleName} from '../../../app.json';

import {SafeAreaView, PermissionsAndroid, Platform, StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {openDrawer} from '../../navigation/RootNavigation';
import {Colors, Fonts} from '../../common';
import {Header, Icon as RNEIcon, Card as RNECard, Input as RNEInput, SearchBar} from 'react-native-elements';
import TitleLabel from '../../components/TitleLabel';
import AlertModal from '../../components/AlertModal';
import ErrorModal from '../../components/ErrorModal';
import OkModal from '../../components/OkModal';
import TopServicesViewComponent from '../../components/TopServicesView';
import SalonViewComponent from '../../components/SalonView';
import {TopServices} from '../../common/Constants';
import ScrollableContainer from '../../components/ScrollableContainer';
import {NearbyParamList} from '../../navigation/BottomTabNavigator';

import HairTabView from './HairTabView';

import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';

type Props = StackScreenProps<NearbyParamList, 'Nearby'>;


const Nearby: FunctionComponent<Props> = ({navigation, route}) => {
  const alertRef = useRef<alertRef>(null);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrormessage] = useState<string>('');
  const [showOkModal, setShowOkModal] = useState<boolean>(false);
  const [okMessage, setOkMessage] = useState<string>('');

  useEffect(() => {
    try{
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then((isLocationgranted) => {
          if (!isLocationgranted) {
            //alertRef.current?.showModal({title: 'Enable your Location', message: 'Please allow your location to serve you better', icon: 'location-pin'})
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
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent={true}
      />
      <View style={{flex: 1, paddingTop: Fonts.h(50), paddingBottom: Fonts.h(10)}}>
        <View style={{paddingHorizontal: Fonts.w(15)}}>
          <Text style={{color: Colors.darkText, fontSize: Fonts.h(12)}}>Your location</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: Fonts.h(2)}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RNEIcon name="location" type='ionicon' color={Colors.trilonO} size={Fonts.h(15)} />
              <Text style={{fontWeight: 'bold', marginHorizontal: Fonts.w(5)}}>Agbowo, Ibadan</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RNEIcon name="paper-plane-outline" type='ionicon' color={Colors.trilonO} size={Fonts.h(15)} />
              <Text style={{fontWeight: 'bold', marginHorizontal: Fonts.w(5), color: Colors.trilonO}}>CHANGE</Text>
            </View>
          </View>
          <SearchBar
            placeholder="Search for salon, services..."
            showLoading={true}
            containerStyle={{backgroundColor: 'transparent', borderTopWidth: Fonts.w(0), borderBottomWidth: Fonts.h(0), padding: Fonts.h(0), marginTop: Fonts.h(10),}}
            inputContainerStyle={{backgroundColor: Colors.inputBg, borderRadius: Fonts.w(10), height: Fonts.h(45)}}
            inputStyle={{}}
          />
        </View>
        <View style={{flex: 1, marginTop: Fonts.h(25)}}>
          <Tabs
            uppercase={false} // true/false | default=true | labels are uppercase
            showTextLabel={true} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
            // iconPosition // leading, top | default=leading
            style={{ backgroundColor: Colors.white, }} // works the same as AppBar in react-native-paper
            // dark={false} // works the same as AppBar in react-native-paper
            theme={{// works the same as AppBar in react-native-paper
              colors: {
                primary: Colors.dark
              },
            }}
            mode="scrollable" // fixed, scrollable | default=fixed
            showLeadingSpace={false}
          >
            <TabScreen label="Hairstyle">
              <HairTabView navigation={navigation} />
            </TabScreen>
            <TabScreen label="Facial">
              <HairTabView navigation={navigation} />
            </TabScreen>
            <TabScreen label="Trimming" >
              <HairTabView navigation={navigation} />
            </TabScreen>
            <TabScreen label="Shaving" >
              <HairTabView navigation={navigation} />
            </TabScreen>
            <TabScreen label="Pedicure" >
              <HairTabView navigation={navigation} />
            </TabScreen>
          </Tabs>
        </View>
      </View>
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

export default Nearby;
