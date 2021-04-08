import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {onChange} from 'react-native-reanimated';
import {Colors, Fonts} from '../common';

const OtpInput = ({onChange, label, boxCount = 5}: {onChange?: (t: string) => void, label? : string, boxCount?: 4 | 5 }) => {
  let refs :any[ ];
  refs=[];
  let i =0;
   while(i < boxCount){
     refs.push(useRef<TextInput>(null));
     i++;
   }
    // useRef<TextInput>(null),
    // useRef<TextInput>(null),
    // useRef<TextInput>(null),
    // useRef<TextInput>(null),
    // boxCount? (boxCount === 4 ?  null :useRef<TextInput>(null)) : null

  const [otp, setOtp] = useState<Array<string>>(
    Array<string>(refs.length).fill(''),
  );

  const handleOtpChange = useCallback(
    (otp: string[]) => {
      if (onChange) {
        const otpV = otp.join('');
        onChange(otpV);
      }
    },
    [onChange],
  );

  function handleOnChange(e: string, index: number) {
    const updateOtp = [...otp];
    updateOtp[index] = e[0] || '';
    setOtp(updateOtp);
    handleOtpChange(updateOtp);
    if (index < refs.length + 1 && e) {
      const newIndex = index + 1;
      if (refs[newIndex]) {
        refs[newIndex].current?.focus();
      }
    }
  }

  function handleOnKeyPress(
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) {
    if (e.nativeEvent.key === 'Backspace') {
      if (index > 0 && otp[index].length === 0) {
        const newIndex = index - 1;
        refs[newIndex].current?.focus();
      }
    }
  }

  function renderBox(ref: React.RefObject<TextInput>, index: number) {
    const value = otp[index];
    return (
      <TouchableWithoutFeedback key={index} onPress={() => refs[index].current?.focus()}>
        <View
          key={index}
          style={{
            height: Fonts.w(50),
            width: Fonts.w(50),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: Colors.darkText,
            backgroundColor: Colors.white,
            borderRadius: Fonts.w(50),
          }}>
          <TextInput
            ref={ref}
            value={value}
            keyboardType="number-pad"
            style={{width: Fonts.w(20), textAlign: 'center'}}
            allowFontScaling={false}
            maxLength={1}
            selectionColor={Colors.trilon}
            selectTextOnFocus
            onKeyPress={(e) => handleOnKeyPress(e, index)}
            onChangeText={(t) => handleOnChange(t, index)}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View
      style={{

      }}
      >
      <Text
        style={{
          fontFamily: Fonts.AVERTA_SEMIBOLD,
          fontSize: Fonts.w(14),
          color: Colors.dark,
          alignSelf: 'center',
          marginBottom: 20,
        }}>
        {label? label : "Enter your OTP code here" }
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: Fonts.h(18),
        }}>
        {refs.map((ref, index) => renderBox(ref, index))}
      </View>
    </View>
  );
};

export default OtpInput;
