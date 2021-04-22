import React, {Component, FunctionComponent, useRef, useState, useEffect} from 'react';
import {titleName} from '../../../app.json';

import {SafeAreaView, PermissionsAndroid, Share, Linking, Platform, StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts} from '../../common';
import {Header, Icon as RNEIcon, Card as RNECard, Button as RNEButton} from 'react-native-elements';
import TitleLabel from '../../components/TitleLabel';
import AlertModal from '../../components/AlertModal';
import ErrorModal from '../../components/ErrorModal';
import Line from '../../components/Line';
import OkModal from '../../components/OkModal';
import TopServicesViewComponent from '../../components/TopServicesView';
import GalleryViewComponent from '../../components/GalleryView';
import {TopServices} from '../../common/Constants';
import ScrollableContainer from '../../components/ScrollableContainer';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import {openDrawer} from '../../navigation/RootNavigation';
import {InboxParamList} from '../../navigation/BottomTabNavigator';
import SpecialistsRoundViewComponent from '../../components/SpecialistsRoundView';
import TimeAgo from '../../functions/TimeAgo';
import ChatListItem from './ChatListItem';

type Props = StackScreenProps<InboxParamList, 'Inbox'>;

const Inbox: FunctionComponent<Props> = ({navigation, route}) => {
  useEffect(() => {
  }, []);

  const [messages, setMessages] = useState<array>([
    {
      photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fmodern-avatars%2F600%2FmyAvatar10-512.png&f=1&nofb=1',
      name: 'John Doe',
      time: 'Mon Apr 19 2021 13:04:46',
      message: "One of the best salon in town..."
    },
    {
      photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fmodern-avatars%2F600%2FmyAvatar10-512.png&f=1&nofb=1',
      name: 'John Doe',
      time: 'Mon Apr 19 2021 14:04:46',
      message: "One of the best salon in town..."
    },
    {
      photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fmodern-avatars%2F600%2FmyAvatar10-512.png&f=1&nofb=1',
      name: 'John Doe',
      time: 'Mon Apr 19 2021 14:04:46',
      message: "One of the best salon in town..."
    }
  ]);

  const [onlineSpecialists, setOnlineSpecialists] = useState<array>([
    {
      source: require('../../assets/images/specialist-1.jpg'),
      name: 'John Max',
    },
    {
      source: require('../../assets/images/specialist-2.jpg'),
      name: 'Jessica Lyn',
    },
    {
      source: require('../../assets/images/specialist-1.jpg'),
      name: 'John Max',
    },
    {
      source: require('../../assets/images/specialist-2.jpg'),
      name: 'Jessica Lyn',
    },
    {
      source: require('../../assets/images/specialist-1.jpg'),
      name: 'John Max',
    },
    {
      source: require('../../assets/images/specialist-2.jpg'),
      name: 'Jessica Lyn',
    },
    {
      source: require('../../assets/images/specialist-1.jpg'),
      name: 'John Max',
    },
    {
      source: require('../../assets/images/specialist-2.jpg'),
      name: 'Jessica Lyn',
    },
  ]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <ScrollableContainer style={{flex: 1}} noPadding={false}>
        <TitleLabel
          title="Online Specialists"
          textStyle={{
            fontWeight: 'bold',
            fontSize: Fonts.h(20),
            color: Colors.darkText
          }}
          containerStyle={{
            marginLeft: Fonts.w(5),
            marginTop: Fonts.h(10),
            marginBottom: Fonts.h(10)
          }}
        />
        <FlatList
          data={onlineSpecialists}
          horizontal={true}
          renderItem={({ item }) => (
            <SpecialistsRoundViewComponent
              source={item.source}
              name={item.name}
              pressed={() => navigation.navigate('ChatScreen')}
              isOnline={true}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
        <Line />
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <ChatListItem
              image={item.photo}
              name={item.name}
              time={TimeAgo(item.time)}
              message={item.message}
              onPress={() => {
                navigation.navigate('ChatScreen')
              }}
            />
          )}
          style={{paddingHorizontal: Fonts.w(10)}}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ () => (
            <Line />
          )}
          style={{marginTop: Fonts.h(20)}}
        />
      </ScrollableContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default Inbox;
