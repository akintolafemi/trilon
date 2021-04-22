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
import Line from '../../components/Line';
import OkModal from '../../components/OkModal';
import SalonViewListComponent from '../../components/SalonViewList';
import {TopServices} from '../../common/Constants';
import ScrollableContainer from '../../components/ScrollableContainer';
import {NearbyParamList} from '../../navigation/BottomTabNavigator';

type Props = StackScreenProps<NearbyParamList, 'ViewAll'>;


const ViewAll: FunctionComponent<Props> = ({navigation, route}) => {

  navigation.setOptions({
    title: route.params.optionTitle,
    headerRight: () =>
      <TouchableOpacity style={{marginRight: Fonts.w(15)}} onPress={() => navigation.navigate('FilterSalons')}>
        <RNEIcon name='filter' type='ionicon'  />
      </TouchableOpacity>
  });

  const alertRef = useRef<alertRef>(null);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrormessage] = useState<string>('');
  const [showOkModal, setShowOkModal] = useState<boolean>(false);
  const [okMessage, setOkMessage] = useState<string>('');

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
    {
      id: '3',
      source: require('../../assets/images/splash1.jpg'),
      label: 'Label X',
      rating: '3.5',
      address: 'Shop 123, Agbowo complex, Ibadan'
    },{
      id: '4',
      source: require('../../assets/images/splash2.jpg'),
      label: 'Label Y',
      rating: '4.0',
      address: 'Address number 2, state Zee...'
    },{
      id: '5',
      source: require('../../assets/images/splash1.jpg'),
      label: 'Label X',
      rating: '3.5',
      address: 'Shop 123, Agbowo complex, Ibadan'
    },{
      id: '6',
      source: require('../../assets/images/splash2.jpg'),
      label: 'Label Y',
      rating: '4.0',
      address: 'Address number 2, state Zee...'
    },
  ];

  useEffect(() => {
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent={true}
      />
      <ScrollableContainer style={{flex: 1}} noPadding={false}>
        <View>
          <FlatList
            data={salonsImages}
            renderItem={({ item }) => (
              <SalonViewListComponent
                source={item.source}
                label={item.label}
                address={item.address}
                rating={item.rating}
                press={() => navigation.navigate('Salon', {salonId: item.id})}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            style={{marginHorizontal: Fonts.w(10)}}
            ItemSeparatorComponent={ () => (
              <Line />
            )}
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
});

export default ViewAll;
