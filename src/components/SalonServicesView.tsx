import React, {FunctionComponent, useEffect, useState} from 'react';
import {Image, Text, View, LogBox, TouchableOpacity, ViewStyle, StyleProp, ImageStyle, FlatList} from 'react-native';
import {Colors, Fonts} from '../common';
import {Icon as RNEIcon, Card as RNECard, Button as RNEButton, ButtonGroup as RNEButtonGroup} from 'react-native-elements';
import TitleLabel from '../components/TitleLabel';
import ScrollableContainer from '../components/ScrollableContainer';
import TopServicesViewComponent from '../components/TopServicesView';
import {TopServices} from '../common/Constants';

type Props = {

};

const SalonServicesViewComponent: FunctionComponent<Props> = ({
  navigation,
}) => {

  const [selectedSegment, setSelectedSegment] = useState<number>(0);

  const segmentHeads = ['Services', 'Packages & Offers'];

  const [packages, setPackages] = useState<array>([
    {
      title: 'Bridal Beauty Make-up',
      offerTill: 'April 26, 2021',
      price: '50, 000',
      image: 'https://puzl-production.s3.amazonaws.com/files/uploads/files/001/773/191/medium/Bridal_Makeup_consultation.jpg?1585759148'
    },{
      title: 'Bridal Beauty Hair',
      offerTill: 'April 26, 2021',
      price: '120, 000',
      image: 'http://gvenny.com/images/bridal-hairstyles-for-black-brides/bridal-hairstyles-for-black-brides-73-6.jpg',
    },{
      title: 'Bridal Beauty Make-up',
      offerTill: 'April 26, 2021',
      price: '50, 000',
      image: 'https://puzl-production.s3.amazonaws.com/files/uploads/files/001/773/191/medium/Bridal_Makeup_consultation.jpg?1585759148'
    },{
      title: 'Bridal Beauty Hair',
      offerTill: 'April 26, 2021',
      price: '120, 000',
      image: 'http://gvenny.com/images/bridal-hairstyles-for-black-brides/bridal-hairstyles-for-black-brides-73-6.jpg',
    }
  ]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);


  function changeSegment (i) {
    setSelectedSegment(i);
  }

  return (
    <ScrollableContainer style={{paddingHorizontal: Fonts.w(10)}}>
      <RNEButtonGroup
        onPress={changeSegment}
        selectedIndex={selectedSegment}
        buttons={segmentHeads}
        containerStyle={{width: '100%', marginLeft: Fonts.w(0), borderRadius: Fonts.h(10), borderColor: Colors.trilonO}}
        selectedButtonStyle={{backgroundColor: Colors.trilonO}}
        textStyle={{color: Colors.trilonO}}
      />
      {selectedSegment === 0 ? (
        <View style={{marginTop: Fonts.h(10)}}>
          <FlatList
            data={TopServices}
            renderItem={({ item }) => (
              <TopServicesViewComponent
                label={item.label}
                source={item.source}
                color={item.color}
                isRow={true}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={{marginTop: Fonts.h(10)}}>
          <FlatList
            data={packages}
            renderItem={({ item }) => (
              <RNECard containerStyle={{width: '100%', marginLeft: Fonts.w(0), padding: Fonts.h(0), borderWidth: Fonts.w(0), marginBottom: Fonts.h(10), elevation: Fonts.h(0)}}>
                <RNECard.Image source={{uri: item.image}} style={{borderRadius: Fonts.h(10)}}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Fonts.h(5)}}>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: Fonts.h(18)}}>{item.title}</Text>
                  </View>
                  <TouchableOpacity style={{}}>
                    <Text style={{fontSize: Fonts.h(18), fontWeight: 'bold', color: Colors.trilonO}}>Book Now</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{fontSize: Fonts.h(13), color: Colors.darkText}}>Offer opened till {item.offerTill}</Text>
                  <Text style={{fontSize: Fonts.h(13), color: Colors.darkText}}>N{item.price}</Text>
                </View>
              </RNECard>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </ScrollableContainer>
  );
};

export default SalonServicesViewComponent;
