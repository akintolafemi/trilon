import React, {Component, FunctionComponent, useCallback, useRef, useState, useEffect} from 'react';

import {SafeAreaView, PermissionsAndroid, Share, Linking, Platform, StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts} from '../../common';
import {Header, Icon as RNEIcon, Card as RNECard, Button as RNEButton} from 'react-native-elements';
import {InboxParamList} from '../../navigation/BottomTabNavigator';
import { GiftedChat } from 'react-native-gifted-chat';

type Props = StackScreenProps<InboxParamList, 'ChatScreen'>;

const ChatScreen: FunctionComponent<Props> = ({navigation, route}) => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);

  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default ChatScreen;
