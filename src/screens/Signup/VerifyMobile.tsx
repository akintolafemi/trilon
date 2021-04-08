import React, {Component, FunctionComponent, useRef, useState} from 'react';
import {AppRegistry, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, StatusBar} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts, GlobalStyles} from '../../common';
import {RootStackParamList} from '../../navigation/routes';
import TitleLabel from '../../components/TitleLabel';
import {Input as RNEInput, Button as RNEButton} from 'react-native-elements';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
//import Modal from "react-native-simple-modal";
type Props = StackScreenProps<RootStackParamList, 'VerifyMobile'>;

const VerifyMobile: FunctionComponent<Props> = ({navigation}) => {

  function handleVerify() {
      navigation.navigate('EnterOtp');
  }

  return (
    <SafeAreaView style={[GlobalStyles.globalScreenBg, {justifyContent: 'center'}]}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent={true}
      />
      <KeyboardAvoidingView>
        <TitleLabel
          title="Verify your Phone Number"
          textStyle={{
            fontWeight: 'bold',
            fontSize: Fonts.h(35),
            textAlign: 'center'
          }}
          containerStyle={{alignItems: 'center'}}
        />
        <View style={{marginTop: Fonts.h(20)}}>
          <Text style={{marginBottom: Fonts.h(30), textAlign: 'center'}}>We will send an SMS verification token to your mobile number</Text>
          <RNEInput
            placeholder='Phone Number'
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
          />
          {/*}<IntlPhoneInput
            lang="EN"
            defaultCountry="NG"
            placeholder="Mobile"
            containerStyle={styles.inputContainerStyle}
            dialCodeTextStyle={styles.inputStyle}
            phoneInputStyle={styles.inputStyle}
            flagStyle={styles.flagStyle}
          />*/}
          <RNEButton
            title='Continue'
            onPress={handleVerify}
            buttonStyle={[styles.socialBtn, {backgroundColor: Colors.trilon, height: Fonts.h(50), marginHorizontal: Fonts.h(10), marginTop: Fonts.h(0)}]}
          />
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

export default VerifyMobile;
