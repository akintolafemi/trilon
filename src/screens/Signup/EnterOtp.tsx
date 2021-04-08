import React, {Component, FunctionComponent, useRef, useState} from 'react';
import {AppRegistry, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, StatusBar} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts, GlobalStyles} from '../../common';
import OtpInput from '../../components/OtpInput';
import {RootStackParamList} from '../../navigation/routes';
import TitleLabel from '../../components/TitleLabel';
import {Input as RNEInput, Button as RNEButton} from 'react-native-elements';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
//import Modal from "react-native-simple-modal";
type Props = StackScreenProps<RootStackParamList, 'EnterOtp'>;

const EnterOtp: FunctionComponent<Props> = ({navigation}) => {

  return (
    <SafeAreaView style={[GlobalStyles.globalScreenBg, {justifyContent: 'center'}]}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent={true}
      />
      <KeyboardAvoidingView>
        <TitleLabel
          title="Phone Verification"
          textStyle={{
            fontWeight: 'bold',
            fontSize: Fonts.h(35)
          }}
          containerStyle={{alignItems: 'center'}}
        />
        <View style={{marginTop: Fonts.h(20), marginHorizontal: Fonts.w(30)}}>
          <OtpInput
            boxCount={4}
            onChange={(t) => {
              console.log(t);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
});

export default EnterOtp;
