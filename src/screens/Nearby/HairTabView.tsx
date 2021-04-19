import React, {Component, FunctionComponent, useRef, useState, useEffect} from 'react';
import {titleName} from '../../../app.json';

import {SafeAreaView, LogBox, PermissionsAndroid, Platform, StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {openDrawer} from '../../navigation/RootNavigation';
import {Colors, Fonts} from '../../common';
import {Header, Icon as RNEIcon, Card as RNECard, Input as RNEInput, SearchBar} from 'react-native-elements';
import {List} from 'native-base';
import TitleLabel from '../../components/TitleLabel';
import AlertModal from '../../components/AlertModal';
import ErrorModal from '../../components/ErrorModal';
import OkModal from '../../components/OkModal';
import Line from '../../components/Line';
import SpecialistsRoundViewComponent from '../../components/SpecialistsRoundView';
import SalonViewComponent from '../../components/SalonView';
import SalonViewListComponent from '../../components/SalonViewList';
import {TopServices} from '../../common/Constants';
import ScrollableContainer from '../../components/ScrollableContainer';


type Props = StackScreenProps<NearbyParamList, 'HairTabView'>;


const HairTabView: FunctionComponent<Props> = ({navigation, route}) => {

  const [specialists, setSpecialists] = useState<array>([
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

  const salonsImages = [
    {
      id: '1',
      source: require('../../assets/images/splash1.jpg'),
      label: 'Label X',
      rating: '3.5',
      address: 'Shop 123, Agbowo complex, Ibadan'
    },{
      id: '2',
      source: require('../../assets/images/splash2.jpg'),
      label: 'Label Y',
      rating: '4.0',
      address: 'Address number 2, state Zee...'
    },
    {
      id: '3',
      source: require('../../assets/images/splash1.jpg'),
      label: 'Label X',
      rating: '3.5',
      address: 'Shop 123, Agbowo complex, Ibadan'
    },{
      id: '4',
      source: require('../../assets/images/splash2.jpg'),
      label: 'Label Y',
      rating: '4.0',
      address: 'Address number 2, state Zee...'
    },{
      id: '5',
      source: require('../../assets/images/splash1.jpg'),
      label: 'Label X',
      rating: '3.5',
      address: 'Shop 123, Agbowo complex, Ibadan'
    },{
      id: '6',
      source: require('../../assets/images/splash2.jpg'),
      label: 'Label Y',
      rating: '4.0',
      address: 'Address number 2, state Zee...'
    },
  ];

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
      <ScrollableContainer style={{flex: 1}} noPadding={false}>
        <TitleLabel
          title="Popular Specialists"
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
          data={specialists}
          horizontal={true}
          renderItem={({ item }) => (
            <SpecialistsRoundViewComponent
              source={item.source}
              name={item.name}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
        <TitleLabel
          title="Featured Salons"
          textStyle={{
            fontWeight: 'bold',
            fontSize: Fonts.h(20),
            color: Colors.darkText
          }}
          containerStyle={{
            marginLeft: Fonts.w(5),
            marginTop: Fonts.h(25),
            marginBottom: Fonts.h(10)
          }}
        />
        <FlatList
          data={salonsImages}
          horizontal={true}
          renderItem={({ item }) => (
            <SalonViewComponent
              source={item.source}
              label={item.label}
              address={item.address}
              rating={item.rating}
              press={() => navigation.navigate('Salon', {salonId: item.id})}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          style={{marginHorizontal: Fonts.w(10)}}
        />
        <TitleLabel
          title="Salons Nearby"
          textStyle={{
            fontWeight: 'bold',
            fontSize: Fonts.h(20),
            color: Colors.darkText
          }}
          containerStyle={{
            marginLeft: Fonts.w(5),
            marginTop: Fonts.h(25),
            marginBottom: Fonts.h(10)
          }}
        />
        <SafeAreaView>
          <FlatList
            data={salonsImages}
            renderItem={({ item }) => (
              <SalonViewListComponent
                source={item.source}
                label={item.label}
                address={item.address}
                rating={item.rating}
                press={() => navigation.navigate('Salon', {salonId: item.id})}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            style={{marginHorizontal: Fonts.w(10)}}
            ItemSeparatorComponent={ () => (
              <Line />
            )}
          />
        </SafeAreaView>
      </ScrollableContainer>
  );
};

const styles = StyleSheet.create({
});

export default HairTabView;
