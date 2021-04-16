import React, {Component, FunctionComponent, useRef, useState, useEffect} from 'react';
import {AppRegistry, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, StatusBar, ActivityIndicator} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts, GlobalStyles} from '../../common';
import OtpInput from '../../components/OtpInput';
import {RootStackParamList} from '../../navigation/routes';
import TitleLabel from '../../components/TitleLabel';
import {Input as RNEInput, Button as RNEButton} from 'react-native-elements';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import ErrorModal from '../../components/ErrorModal';
import OkModal from '../../components/OkModal';

//import Modal from "react-native-simple-modal";
type Props = StackScreenProps<RootStackParamList, 'EnterOtp'>;
import {API} from '../../network';

const EnterOtp: FunctionComponent<Props> = ({navigation, route}) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrormessage] = useState<string>('');
  const [showOkModal, setShowOkModal] = useState<boolean>(false);
  const [okMessage, setOkMessage] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [timerText, setTimerText] = useState<string>('');
  const [count, setCount] = useState<string>('');
  const [mobile] = useState<string>(route.params.mobile);

  useEffect(() => {
    startTimer();
  }, []);

  function startTimer() {
    if (timerText === "") {
      try {
        var date = new Date();
        var time = date.getMinutes() + 1;
        date.setMinutes(time);
        var countDownDate = new Date(date).getTime();
        var x = setInterval(function() {
          var now = new Date().getTime();
          var distance = countDownDate - now;
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimerText("Request new code in " + minutes + "m :" +seconds + "s");
          if (distance < 0) {
            clearInterval(x);
            setTimerText("");
          }
        }, 1000);

      } catch (error) {
        console.log(' error', error);
      }
    }
  }

  async function handleGetNewCode() {
    setIsLoading(true);
    let confirm = await API.sendToken({mobile: mobile});
    setOkMessage("New code sent");
    setIsLoading(false);
    setShowOkModal(true);
    startTimer();
  }

  async function handleSubmitCode(code) {
    try{
      setIsLoading(true);
      let response = await API.verifyToken({mobile: mobile, token: code});
      if (response.statuscode === 200) {
        if(response.responsecode === "00") {
          setTimerText("");
          setOkMessage("Mobile number verification was successful");
          setIsLoading(false);
          setShowOkModal(true);
          setCount('1');
        }
        else {
          setIsLoading(false);
          setErrormessage(response.responsemessage);
          setShowErrorModal(true);
        }
      }
      else {
        setIsLoading(false);
        setErrormessage(response.responsemessage);
        setShowErrorModal(true);
      }
    }
    catch(e){
      console.log(e);
      setIsLoading(false);
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
          title="Phone Verification"
          textStyle={{
            fontWeight: 'bold',
            fontSize: Fonts.h(35)
          }}
          containerStyle={{alignItems: 'center'}}
        />
        <View style={{marginTop: Fonts.h(20), marginHorizontal: Fonts.w(10)}}>
          <Text style={{marginBottom: Fonts.h(20), textAlign: 'center'}}>Verification code was sent to your mobile number endind in {route.params.numLock}</Text>
          <OtpInput
            boxCount={6}
            onChange={(code) => {
              if (code.length === 6) {
                handleSubmitCode(code);
              }
            }}
          />
          {isLoading ? (
            <ActivityIndicator color={Colors.trilon} size='small' style={{marginTop: Fonts.h(20)}}/>
          ) :
            null
          }
          {timerText != "" ? (
            <TouchableOpacity
              style={{alignSelf: 'center', marginTop: Fonts.h(20)}}
            >
              <Text style={{color: Colors.darkText, fontWeight: 'bold'}}>{timerText}</Text>
            </TouchableOpacity>
          ) :
            (
              <View style={{marginTop: Fonts.h(20), alignItems: 'center'}}>
                <Text style={{color: Colors.darkText, fontWeight: 'bold'}}>Didn't get code?</Text>
                <TouchableOpacity
                  onPress={handleGetNewCode}
                  style={{color: Colors.trilon}}
                >
                  <Text style={{color: Colors.trilon, fontWeight: 'bold'}}>Request new code</Text>
                </TouchableOpacity>
              </View>

            )
          }
        </View>
      </KeyboardAvoidingView>
      <ErrorModal
        message={errorMessage}
        showModal={showErrorModal}
        onConfirm={() => setShowErrorModal(false)}
      />
      <OkModal
        message={okMessage}
        showModal={showOkModal}
        onConfirm={() => {
          setShowOkModal(false);
          if (count === '1')
            navigation.navigate('DashboardTab');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  socialBtn: {
    borderRadius: Fonts.h(20),
    marginVertical: Fonts.h(10)
  },
});

export default EnterOtp;
