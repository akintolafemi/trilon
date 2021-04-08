import React, {Component, FunctionComponent, useRef, useState} from 'react';
import {AppRegistry, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, StatusBar} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts, GlobalStyles} from '../../common';
import {RootStackParamList} from '../../navigation/routes';
import TitleLabel from '../../components/TitleLabel';
import {Input as RNEInput, Button as RNEButton} from 'react-native-elements';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
//import Modal from "react-native-simple-modal";
type Props = StackScreenProps<RootStackParamList, 'SignUp'>;

const Signup: FunctionComponent<Props> = ({navigation}) => {

  function handleSignUp() {
      navigation.navigate('VerifyMobile');
  }

  return (
    <SafeAreaView style={[GlobalStyles.globalScreenBg, {marginTop: Fonts.h(-30)}]}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent={true}
      />
      <KeyboardAvoidingView>
        <TitleLabel
          title="Create an Account"
          textStyle={{
            fontWeight: 'bold',
            fontSize: Fonts.h(35)
          }}
          containerStyle={{alignItems: 'center'}}
        />
        <View style={{marginTop: Fonts.h(20)}}>
          <RNEInput
            placeholder='Username'
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
          />
          <RNEInput
            placeholder='Email'
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
          />
          <RNEInput
            placeholder='Phone Number'
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
          />
          <RNEInput
            placeholder='Date of Birth'
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
          />
          <RNEInput
            placeholder='Password'
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
          />
          <RNEInput
            placeholder='Confirm Password'
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
          />
          <RNEButton
            title='Sign Up'
            onPress={handleSignUp}
            buttonStyle={[styles.socialBtn, {backgroundColor: Colors.trilon, height: Fonts.h(50), marginHorizontal: Fonts.h(10), marginTop: Fonts.h(0)}]}
          />
          <View
            style={{alignItems: 'center', marginTop: Fonts.h(20)}}
          >
            <View style={{flexDirection: 'row'}}>
              <Text>By clicking on </Text><Text style={{fontWeight: 'bold'}}>sign up,</Text><Text> you agree to the following </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => openURLInBrowser('https://idealswift.com')}><Text style={{fontWeight: 'bold'}}>terms and conditions</Text></TouchableOpacity><Text> without reservations</Text>
            </View>
            <TouchableOpacity style={{flexDirection: 'row', marginTop: Fonts.h(10)}} onPress={() => navigation.navigate('Onboard')}>
              <Text style={{color: Colors.dark}}>Have an account?</Text>
              <Text style={{color: Colors.trilon, fontWeight: 'bold'}}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {borderRadius: Fonts.h(20), borderWidth: Fonts.h(1), paddingHorizontal: Fonts.h(20), height: Fonts.h(50), backgroundColor: Colors.triloneW},
  inputStyle: {fontSize: Fonts.h(15)},
  socialBtn: {
    borderRadius: Fonts.h(20),
    marginVertical: Fonts.h(10)
  },
});

export default Signup;
