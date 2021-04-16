import React, {Component, FunctionComponent, useRef, useState} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, StatusBar} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors, Fonts, GlobalStyles} from '../../common';
import {RootStackParamList} from '../../navigation/routes';
import TitleLabel from '../../components/TitleLabel';
import {Input as RNEInput, Button as RNEButton} from 'react-native-elements';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import ErrorModal from '../../components/ErrorModal';
import OkModal from '../../components/OkModal';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from '../../components/DatePicker';
//import Modal from "react-native-simple-modal";
type Props = StackScreenProps<RootStackParamList, 'SignUp'>;

import {API} from '../../network';
import FX from '../../functions';

const Signup: FunctionComponent<Props> = ({navigation}) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrormessage] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmpassword] = useState<string>('');

  async function handleSignUp() {
    let validateEmail = await FX.validateEmail(email);
    //let validateDob = await FX.validateDob(dob);
    //let validatePassword = await FX.validatePassword(password);
    if (fullname === "") {
      setErrormessage("Create a username");
      setShowErrorModal(true);
    }
    else if (email === ""){
      setErrormessage("Enter your email address");
      setShowErrorModal(true);
    }
    else if (!validateEmail){
      setErrormessage("Invalid email address");
      setShowErrorModal(true);
    }
    else if (dob === ""){
      setErrormessage("Enter date of birth");
      setShowErrorModal(true);
    }
    // else if (!validateDob){
    //   setErrormessage("Invalid date");
    //   setShowErrorModal(true);
    // }
    else if (password === ""){
      setErrormessage("You need a password to secure your account");
      setShowErrorModal(true);
    }
    else if (password !== confirmPassword){
      setErrormessage("Passwords do not match");
      setShowErrorModal(true);
    }
    else {
      try {
        setIsLoading(true);
        let regObj = {
          email: email,
          password: password,
          fullname: fullname,
          dob: dob
        };
        let registerResponse = await API.registerUser(regObj);
        console.log(registerResponse);
        if(registerResponse.user) {
          const profile = await API.getUserProfile();
          if (profile !== null) {
            await AsyncStorage.setItem('trilon_users_profiles', JSON.stringify(profile));
          }
          await AsyncStorage.setItem('registerResponse', JSON.stringify(registerResponse));
          setIsLoading(false);
          navigation.navigate('VerifyMobile');
        }
        else {
          setIsLoading(false);
          setErrormessage(registerResponse);
          setShowErrorModal(true);
        }
      }
      catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }
  }

  return (
    <SafeAreaView style={[GlobalStyles.globalScreenBg, {marginTop: Fonts.h(-30), justifyContent: 'center'}]}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent={true}
      />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
            placeholder='Full Name'
            value={fullname}
            onChangeText={text => setFullname(text)}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            returnKeyType="next"
            keyboardType="default"
          />
          <RNEInput
            placeholder='Email'
            value={email}
            onChangeText={text => setEmail(text)}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            returnKeyType="next"
            keyboardType="email-address"
          />
          <DatePicker
            value={dob}
            onChange={t => setDob(t)}
            maxDate={new Date()}
            containerStyle={[styles.inputContainerStyle, {marginBottom: 20, marginHorizontal: 10}]}
            textStyle={styles.inputStyle}
          />
          <RNEInput
            placeholder='Password'
            value={password}
            onChangeText={text => setPassword(text)}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            returnKeyType="next"
            keyboardType="default"
            secureTextEntry={true}
          />
          <RNEInput
            placeholder='Confirm Password'
            value={confirmPassword}
            onChangeText={text => setConfirmpassword(text)}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            returnKeyType="next"
            keyboardType="default"
            secureTextEntry={true}
          />
          <RNEButton
            title='Sign Up'
            loading={isLoading}
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
              <TouchableOpacity
                onPress={() => {
                  //openURLInBrowser('https://idealswift.com');
                  navigation.navigate('TermsOfUse');
                }}
              >
              <Text style={{fontWeight: 'bold'}}>terms and conditions</Text></TouchableOpacity><Text> without reservations</Text>
            </View>
            <TouchableOpacity style={{flexDirection: 'row', marginTop: Fonts.h(10)}} onPress={() => navigation.navigate('OnboardMain')}>
              <Text style={{color: Colors.dark}}>Have an account?</Text>
              <Text style={{color: Colors.trilon, fontWeight: 'bold'}}> Sign In</Text>
            </TouchableOpacity>
          </View>
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

export default Signup;
