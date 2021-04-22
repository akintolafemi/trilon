import React, {Component, FunctionComponent, useRef, useState, useEffect} from 'react';
import {titleName} from '../../../app.json';

import {SafeAreaView, PermissionsAndroid, Platform, StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts} from '../../common';
import {Header, Icon as RNEIcon, Card as RNECard, Input as RNEInput, SearchBar} from 'react-native-elements';
import TitleLabel from '../../components/TitleLabel';
import AlertModal from '../../components/AlertModal';
import ErrorModal from '../../components/ErrorModal';
import Line from '../../components/Line';
import OkModal from '../../components/OkModal';
import ScrollableContainer from '../../components/ScrollableContainer';
import {RootStackParamList} from '../../navigation/routes';

type Props = StackScreenProps<RootStackParamList, 'FilterSalons'>;


const FilterSalons: FunctionComponent<Props> = ({navigation, route}) => {

  const alertRef = useRef<alertRef>(null);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrormessage] = useState<string>('');
  const [showOkModal, setShowOkModal] = useState<boolean>(false);
  const [okMessage, setOkMessage] = useState<string>('');


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

export default FilterSalons;
