import React, {Component, FunctionComponent, useRef, useState} from 'react';
import {AppRegistry, SafeAreaView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts, GlobalStyles} from '../../common';
import {RootStackParamList} from '../../navigation/routes';
import {SocialIcon, Button as RNEButton, Icon as RNEIcon, Input as RNEInput} from 'react-native-elements';
import { Modalize } from 'react-native-modalize';
//import Modal from "react-native-simple-modal";
import OkModal from '../../components/OkModal';
type Props = StackScreenProps<RootStackParamList, 'OnboardMain'>;

const OnboardMain: FunctionComponent<Props> = ({navigation}) => {

  const modalizeRef = useRef<Modalize>(null);
  const alertRef = useRef<alertRef>(null);
  const [showOkModal, setShowOkModal] = useState<boolean>(false);
  const [modalView, setModalView] = useState<string>('login');

  function openLoginModal() {
//    setShowOkModal(true);
//    alertRef.current?.toggle();
    modalizeRef.current?.open();
  }

  function openPasswordModal() {
    setModalView('retrieve-pwd');
  }

  function closePasswordModal() {
    setModalView('login');
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
        <View style={{flex: 1, justifyContent: 'flex-end', padding: GlobalStyles.paddingArround}}>
          <Image
            style={{marginBottom: Fonts.h(10), height: Fonts.h(80), width: Fonts.w(80)}}
            source={require('../../assets/images/trilonlight.icon.png')}
          />
          <Text
            style={{color: Colors.white, fontSize: Fonts.h(20), fontWeight: 'bold',}}
          >Book an appointment for salon, spa, make-up and barbing</Text>
          <View style={{marginVertical: Fonts.h(40)}}>
            <RNEButton
              title='Connect with Google'
              icon={
                <RNEIcon
                  name="google"
                  type='font-awesome'
                  size={Fonts.h(15)}
                  containerStyle={{marginRight: Fonts.h(10)}}
                  color="white"
                />
              }
              buttonStyle={[styles.socialBtn, {backgroundColor: Colors.google}]}
            />
            <RNEButton
              title='Connect with Facebook'
              icon={
                <RNEIcon
                  name="facebook"
                  type='font-awesome'
                  size={15}
                  containerStyle={{marginRight: Fonts.h(10)}}
                  color="white"
                />
              }
              buttonStyle={[styles.socialBtn, {backgroundColor: Colors.facebook}]}
            />
          </View>
          <View
            style={{alignItems: 'center'}}
          >
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={openLoginModal}>
              <Text style={{color: Colors.white}}>Have an account?</Text>
              <Text style={{color: Colors.trilon, fontWeight: 'bold'}}> Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', marginTop: Fonts.h(5)}} onPress={() => navigation.navigate('Signup')}>
              <Text style={{color: Colors.white}}>Care to create</Text>
              <Text style={{color: Colors.trilonP, fontWeight: 'bold'}}> Account?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight={true}
          onClosed={() => {
            setModalView('login');
          }}
          HeaderComponent={
            modalView === 'login' ? (
              <View style={styles.modaltitleView}>
                <Text style={styles.modaltitle}>Welcome Back</Text>
                <Text style={styles.modalSubtitle}>Login to your account</Text>
              </View>
            ) : (
              <View style={styles.modaltitleView}>
                <Text style={styles.modaltitle}>Forgot Password</Text>
                <Text style={styles.modalSubtitle}>Please enter your email address, you will receive a code to create a new password via your email</Text>
              </View>
            )
          }
          modalStyle={{paddingTop: Fonts.h(40)}}
        >
          {modalView === 'login' ? (
            <KeyboardAvoidingView behavior="padding" style={{paddingHorizontal: Fonts.h(10)}}>
              <RNEInput
                placeholder='Username'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
              />
              <RNEInput
                placeholder='Password'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
              />
              <RNEButton
                title='Login'
                buttonStyle={[styles.socialBtn, {backgroundColor: Colors.trilon, height: Fonts.h(50), marginHorizontal: Fonts.w(10), marginTop: Fonts.h(0)}]}
              />
              <View
                style={{alignItems: 'center', marginTop: Fonts.h(10)}}
              >
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={openPasswordModal}>
                  <Text style={{color: Colors.trilon}}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginBottom: Fonts.h(100)}}></View>
            </KeyboardAvoidingView>
          ) : (
            <KeyboardAvoidingView behavior="padding" style={{paddingHorizontal: 10}}>
              <RNEInput
                placeholder='E-mail'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
              />
              <RNEButton
                title='Submit'
                buttonStyle={[styles.socialBtn, {backgroundColor: Colors.trilon, height: Fonts.h(50), marginHorizontal: Fonts.w(10), marginTop: Fonts.h(0)}]}
              />
              <View
                style={{alignItems: 'center', marginTop: Fonts.h(10)}}
              >
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={closePasswordModal}>
                  <Text style={{color: Colors.trilon}}>Back to login?</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginBottom: Fonts.h(100)}}></View>
            </KeyboardAvoidingView>
          )
          }
        </Modalize>
      </ImageBackground>
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

export default OnboardMain;
