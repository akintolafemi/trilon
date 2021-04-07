import React, {Component, FunctionComponent, useRef, useState} from 'react';
import {titleName} from '../../../app.json';
import {AppRegistry, SafeAreaView, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts, GlobalStyles} from '../../common';
import SwipeContainer from './SwipeContainer';
import {RootStackParamList} from '../../navigation/routes';
import {SocialIcon, Button as RNEButton, Icon as RNEIcon, Input as RNEInput} from 'react-native-elements';
import { Modalize } from 'react-native-modalize';

type Props = StackScreenProps<RootStackParamList, 'OnboardMain'>;

const OnboardMain: FunctionComponent<Props> = ({navigation}) => {

  const modalizeRef = useRef<Modalize>(null);
  const [modalView, setModalView] = useState<string>('login');

  function openLoginModal () {
    modalizeRef.current?.open();
  }

  function openPasswordModal () {
    setModalView('retrieve-pwd');
  }

  function closePasswordModal () {
    setModalView('login');
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
            style={{marginBottom: 10, height: 70, width: 70}}
            source={require('../../assets/images/trilonlight.icon.png')}
          />
          <Text
            style={{color: Colors.white, fontSize: 20, fontWeight: 'bold',}}
          >Book an appointment for salon, spa, make-up and barbing</Text>
          <View style={{marginVertical: 40}}>
            <RNEButton
              title='Connect with Google'
              icon={
                <RNEIcon
                  name="google"
                  type='font-awesome'
                  size={15}
                  containerStyle={{marginRight: 10}}
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
                  containerStyle={{marginRight: 10}}
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
            <TouchableOpacity style={{flexDirection: 'row', marginTop: 5}}>
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
          modalStyle={{paddingTop: 40}}
        >
          {modalView === 'login' ? (
            <KeyboardAvoidingView behavior="padding" style={{paddingHorizontal: 10}}>
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
                buttonStyle={[styles.socialBtn, {backgroundColor: Colors.trilon, height: 45, marginHorizontal: 10, marginTop: 0}]}
              />
              <View
                style={{alignItems: 'center', marginTop: 10}}
              >
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={openPasswordModal}>
                  <Text style={{color: Colors.trilon}}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginBottom: 100}}></View>
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
                buttonStyle={[styles.socialBtn, {backgroundColor: Colors.trilon, height: 45, marginHorizontal: 10, marginTop: 0}]}
              />
              <View
                style={{alignItems: 'center', marginTop: 10}}
              >
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={closePasswordModal}>
                  <Text style={{color: Colors.trilon}}>Back to login?</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginBottom: 100}}></View>
            </KeyboardAvoidingView>
          )
          }
        </Modalize>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  socialBtn: {
    borderRadius: 20,
    marginVertical: 10
  },
  socialBtnText: {
    fontSize: 13
  },
  inputContainerStyle: {borderRadius: 20, borderWidth: 1, paddingHorizontal: 20, height: 45},
  inputStyle: {fontSize: 12},
  modaltitleView: {alignItems: 'center', marginBottom: 40, paddingHorizontal: 20},
  modaltitle: {color: Colors.black, fontSize: 20, fontWeight: 'bold'},
  modalSubtitle: {color: Colors.dark, fontSize: 15, textAlign: 'center'},
});

export default OnboardMain;
