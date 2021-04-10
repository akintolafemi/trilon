import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {Fonts, Colors} from '../common'
import AlertModal from './AlertModal';

const thumbImg = require('../assets/icons/sad-face.png');

const ErrorModal = ({
  title = 'Error!',
  message,
  image = thumbImg,
  showModal,
  onConfirm,
}: {
  title?: string;
  message: string;
  image?: ImageSourcePropType;
  showModal: boolean;
  onConfirm: () => void;
}) => {
  return (
    <AlertModal
      closeOnTouchOutside={false}
      show={showModal}
      image={image}
      title={title}
      titleStyle={{
        fontSize: Fonts.h(20),
        fontWeight: 'bold',
        paddingBottom: Fonts.h(10),
        paddingTop: Fonts.h(20),
        fontFamily: Fonts.AVERTA_BOLD,
      }}
      message={message}
      messageStyle={{
        textAlign: 'center',
        maxWidth: '90%',
        paddingBottom: Fonts.h(0),
      }}
      contentContainerStyle={{
        padding: Fonts.h(0),
        paddingTop: Fonts.h(30),
        borderRadius: Fonts.h(10),
        width: Fonts.h(300),
        top: '-16%',
      }}
      showConfirmButton={true}
      confirmButtonStyle={{
        backgroundColor: Colors.dark,
        minWidth: '80%',
        borderRadius: Fonts.h(20),
        marginVertical: Fonts.h(20),
        height: 40,
        justifyContent: 'center'
      }}
      confirmText="Close"
      confirmButtonTextStyle={{
        textAlign: 'center',
        color: Colors.white,
        textAlignVertical: 'center',
      }}
      onConfirmPressed={onConfirm}
    />
  );
};
export default ErrorModal;
