import React, {Component, FunctionComponent, useRef, useState} from 'react';
import {AppRegistry, Platform, AsyncStorage, SafeAreaView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts, GlobalStyles} from '../../common';
import {RootStackParamList} from '../../navigation/routes';
import {SocialIcon, Button as RNEButton, Icon as RNEIcon, Input as RNEInput} from 'react-native-elements';
import { Modalize } from 'react-native-modalize';
//import Modal from "react-native-simple-modal";
import OkModal from '../../components/OkModal';
import ErrorModal from '../../components/ErrorModal';
type Props = StackScreenProps<RootStackParamList, 'Book'>;

import {API} from '../../network';


const Book: FunctionComponent<Props> = ({navigation}) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrormessage] = useState<string>('');
  const modalizeRef = useRef<Modalize>(null);
  const alertRef = useRef<alertRef>(null);
  const [showOkModal, setShowOkModal] = useState<boolean>(false);
  const [modalView, setModalView] = useState<string>('login');

  function openLoginModal() {
//    setShowOkModal(true);
//    alertRef.current?.toggle();
    modalizeRef.current?.open();
  }

  function closeOkModal() {
    setShowOkModal(false);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/login.jpg')}
        style={{flex: 1, resizeMode: "cover"}}
        imageStyle={{resizeMode: 'cover'}}
      >
        <View style={{height: '100%', width: '100%', backgroundColor: Colors.black, opacity: 0.4, position: 'absolute'}}></View>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight={true}
          onClosed={() => {
            setModalView('login');
          }}
          HeaderComponent={
            <View style={styles.modaltitleView}>
              <Text style={styles.modaltitle}>Welcome Back</Text>
              <Text style={styles.modalSubtitle}>Login to your account</Text>
            </View>
          }
          modalStyle={{paddingTop: Fonts.h(40)}}
        >
          <KeyboardAvoidingView behavior="padding" style={{paddingHorizontal: Fonts.h(10)}}>
            <RNEButton
              title='Login'
              loading={isLoading}
              buttonStyle={[styles.socialBtn, {backgroundColor: Colors.trilon, height: Fonts.h(50), marginHorizontal: Fonts.w(10), marginTop: Fonts.h(0)}]}
            />
            <View style={{marginBottom: Fonts.h(100)}}></View>
          </KeyboardAvoidingView>
        </Modalize>
      </ImageBackground>
      <ErrorModal
        message={errorMessage}
        showModal={showErrorModal}
        onConfirm={() => setShowErrorModal(false)}
      />
      <OkModal
        title='Welcome'
        message='Hello.... your message was received'
        showModal={showOkModal}
        onConfirm={closeOkModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  socialBtn: {
    borderRadius: Fonts.h(20),
    marginVertical: Fonts.h(10)
  },
  socialBtnText: {
    fontSize: Fonts.h(13)
  },
  inputContainerStyle: {borderRadius: Fonts.h(20), borderWidth: 1, paddingHorizontal: Fonts.h(20), height: Fonts.h(50), backgroundColor: Colors.triloneW},
  inputStyle: {fontSize: Fonts.h(15)},
  modaltitleView: {alignItems: 'center', marginBottom: Fonts.h(40), paddingHorizontal: Fonts.h(20)},
  modaltitle: {color: Colors.black, fontSize: Fonts.h(30), fontWeight: 'bold'},
  modalSubtitle: {color: Colors.dark, fontSize: Fonts.h(20), textAlign: 'center'},
});

export default Book;
