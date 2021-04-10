import React, {Component, FunctionComponent, useRef, useState} from 'react';
import {AppRegistry, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, StatusBar} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts, GlobalStyles} from '../../common';
import {RootStackParamList} from '../../navigation/routes';
import TitleLabel from '../../components/TitleLabel';
import {Input as RNEInput, Button as RNEButton} from 'react-native-elements';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import ErrorModal from '../../components/ErrorModal';
import OkModal from '../../components/OkModal';
import { DIAL_CODE } from '../../common/Constants';
//import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
//import Modal from "react-native-simple-modal";
type Props = StackScreenProps<RootStackParamList, 'VerifyMobile'>;
import {API} from '../../network';

const VerifyMobile: FunctionComponent<Props> = ({navigation}) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrormessage] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const captchaRef = useRef(null);

  async function handleVerify() {
    if (mobile === "") {
      setIsLoading(false);
      setErrormessage("Please enter mobile number");
      setShowErrorModal(true);
    }
    else if (mobile.length < 11 || mobile.length > 14) {
      setIsLoading(false);
      setErrormessage("Invalid mobile number");
      setShowErrorModal(true);
    }
    else {
      try {
        setIsLoading(true);
        let mobileX = mobile;
        if (mobileX.charAt(0) === '0') {
          mobileX = mobileX.substr(1, mobileX.length - 1);
          let dial_code = DIAL_CODE;
          mobileX = dial_code.concat(mobileX);
        }
        else if (mobileX.charAt(0) !== '+' && mobileX.charAt(0) !== '0') {
          mobileX = '+'.concat(mobileX);
        }
        console.log(mobileX);

        let numLock = mobile.substr(mobileX.length - 5, mobileX.length - 1);
        let confirm = await API.sendToken({mobile: mobileX});
        console.log(confirm);

        setIsLoading(false);
        if (confirm.responsecode === "00")
          navigation.navigate('EnterOtp', {mobile: mobileX, numLock: numLock});
        else {
          setIsLoading(false);
          setErrormessage(confirm.message);
          setShowErrorModal(true);
        }
      }
      catch(e){
        console.log(e);
        setIsLoading(false);
      }
    }
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
            value={mobile}
            onChangeText={text => setMobile(text)}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            keyboardType="phone-pad"
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
            loading={isLoading}
            onPress={handleVerify}
            buttonStyle={[styles.socialBtn, {backgroundColor: Colors.trilon, height: Fonts.h(50), marginHorizontal: Fonts.h(10), marginTop: Fonts.h(0)}]}
          />
        </View>
      </KeyboardAvoidingView>
      <ErrorModal
        message={errorMessage}
        showModal={showErrorModal}
        onConfirm={() => setShowErrorModal(false)}
      />
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
