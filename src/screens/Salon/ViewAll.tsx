import React, {Component, FunctionComponent, useRef, useState, useEffect} from 'react';
import {titleName} from '../../../app.json';

import {SafeAreaView, PermissionsAndroid, Platform, StyleSheet, Text, View, LogBox, ImageBackground, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {openDrawer} from '../../navigation/RootNavigation';
import {Colors, Fonts} from '../../common';
import {Header, Icon as RNEIcon, Card as RNECard, Input as RNEInput, Rating, Slider} from 'react-native-elements';
import TitleLabel from '../../components/TitleLabel';
import AlertModal from '../../components/AlertModal';
import ErrorModal from '../../components/ErrorModal';
import Line from '../../components/Line';
import OkModal from '../../components/OkModal';
import SalonViewListComponent from '../../components/SalonViewList';
import {TopServices} from '../../common/Constants';
import ScrollableContainer from '../../components/ScrollableContainer';
import {RootStackParamList} from '../../navigation/routes';
import { Modalize } from 'react-native-modalize';
import MultiSelectView from 'react-native-multiselect-view';
import {Picker as OPicker} from 'react-native-option-picker';

type Props = StackScreenProps<RootStackParamList, 'ViewAll'>;


const ViewAll: FunctionComponent<Props> = ({navigation, route}) => {

  const alertRef = useRef<alertRef>(null);
  const modalizeRef = useRef<Modalize>(null);
  const servicesSelectRef = useRef<Modalize>(null);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrormessage] = useState<string>('');
  const [showOkModal, setShowOkModal] = useState<boolean>(false);
  const [okMessage, setOkMessage] = useState<string>('');

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

  var servicesOptions = ['Hairstyle', 'Makeup', 'Dyeing', 'Spa', 'Manicure', 'Pedicure', 'Shaving'];
  var gendersOptions = [
    {
      id: '1', title: 'Men', selected: false
    },{
      id: '2', title: 'Women', selected: false
    },{
      id: '3', title: 'All', selected: false
    }
  ];
  var sortByOptions = [
    {
      id: '1', title: 'Most Popular', selected: false
    },{
      id: '2', title: 'Cost Low to High', selected: false
    },{
      id: '3', title: 'Cost High to Low', selected: false
    }
  ];


  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    navigation.setOptions({
      title: route.params.optionTitle,
      headerRight: () =>
        <TouchableOpacity style={{marginRight: Fonts.w(15)}} onPress={() => {
          modalizeRef.current?.open();
        }}>
          <RNEIcon name='filter' type='ionicon'  />
        </TouchableOpacity>
    });
  }, []);

  function handleServiceSelect(option) {

  }

  function handleGenderSelect(option) {

  }

  function handleDistanceChange(distance) {

  }

  function handleSortBySelect(sort) {

  }

  function handlePriceChange(price) {

  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent={true}
      />
      <ScrollableContainer style={{flex: 1}} noPadding={false}>
        <View>
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
        </View>
      </ScrollableContainer>
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight={false}
        onClosed={() => {

        }}
        HeaderComponent={
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Fonts.w(10)}}>
            <TouchableOpacity onPress={() => {
              modalizeRef.current?.close();
            }}>
              <Text style={{color: Colors.trilonO, fontWeight: 'bold', fontSize: Fonts.h(18)}}>Cancel</Text>
            </TouchableOpacity>
            <View>
              <Text style={{color: Colors.darkText, fontWeight: 'bold', fontSize: Fonts.h(18)}}>Filters</Text>
            </View>
            <TouchableOpacity>
              <Text style={{color: Colors.trilonO, fontWeight: 'bold', fontSize: Fonts.h(18)}}>Done</Text>
            </TouchableOpacity>
          </View>
        }
        modalStyle={{paddingTop: Fonts.h(20), marginTop: Fonts.h(0), borderTopLeftRadius: Fonts.w(0), borderTopRightRadius: Fonts.w(0)}}
      >
        <ScrollableContainer style={{flex: 1, paddingVertical: Fonts.h(10), paddingHorizontal: Fonts.w(10)}} noPadding={false}>
          <View style={styles.filterSection}>
            <TitleLabel
              title="Services"
              textStyle={{
                fontWeight: 'bold',
                fontSize: Fonts.h(15),
                color: Colors.darkText,
              }}
            />
            <MultiSelectView
              ref={servicesSelectRef}
              data={servicesOptions}
              activeIcon={null}
              inactiveIcon={null}
              activeContainerStyle={[styles.serviceStyles, {backgroundColor: Colors.trilonO, borderColor: Colors.trilonO}]}
              inactiveContainerStyle={[styles.serviceStyles, {backgroundColor: Colors.white, borderColor: Colors.whiteOpaq}]}
              activeTextStyle={[styles.serviceTextStyles, {color: Colors.white}]}
              inactiveTextStyle={[styles.serviceTextStyles, {color: Colors.darkText}]}
              onSelectionStatusChange={handleServiceSelect}
            />
          </View>
          <View style={styles.filterSection}>
            <TitleLabel
              title="Rating"
              textStyle={{
                fontWeight: 'bold',
                fontSize: Fonts.h(15),
                color: Colors.darkText,
              }}
            />
            <Rating
              type='custom'
              ratingCount={5}
              imageSize={22}
              showRating
              onFinishRating={() => {}}
              ratingColor={Colors.trilonO}
              ratingBackgroundColor={Colors.whiteOpaq}
              style={{alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', marginHorizontal: Fonts.w(20), marginVertical: Fonts.h(12)}}
              ratingTextColor={Colors.darkText}
            />
          </View>
          <View style={styles.filterSection}>
            <TitleLabel
              title="Gender"
              textStyle={{
                fontWeight: 'bold',
                fontSize: Fonts.h(15),
                color: Colors.darkText,
              }}
            />
            <OPicker
              data={gendersOptions}
              onPress={handleGenderSelect}
              style={{marginTop: Fonts.h(10), marginBottom: Fonts.h(15)}}
              selectedOptionStyle={[styles.serviceStyles, {backgroundColor: Colors.trilonO, borderColor: Colors.trilonO}]}
              optionStyle={[styles.serviceStyles, {backgroundColor: Colors.white, borderColor: Colors.whiteOpaq}]}
              selectedOptionTextStyle={[styles.serviceTextStyles, {color: Colors.white}]}
              optionTextStyle={[styles.serviceTextStyles, {color: Colors.darkText}]}
            />
          </View>
          <View style={styles.filterSection}>
            <TitleLabel
              title="Distance"
              textStyle={{
                fontWeight: 'bold',
                fontSize: Fonts.h(15),
                color: Colors.darkText,
              }}
            />
            <Text style={{alignSelf: 'flex-end', fontSize: Fonts.h(14), color: Colors.darkText}}>2.0km</Text>
            <Slider
              value={3}
              step={1}
              onValueChange={handleDistanceChange}
              maximumValue={100}
              minimumValue={1}
              thumbStyle={{backgroundColor: Colors.trilonO, width: Fonts.h(20), height: Fonts.h(20)}}
              trackStyle={{height: Fonts.h(5)}}
              minimumTrackTintColor={Colors.trilonO}
              style={{marginBottom: Fonts.h(15)}}
            />
          </View>
          <View style={styles.filterSection}>
            <TitleLabel
              title="Sort By"
              textStyle={{
                fontWeight: 'bold',
                fontSize: Fonts.h(15),
                color: Colors.darkText,
              }}
            />
            <OPicker
              data={sortByOptions}
              onPress={handleSortBySelect}
              style={{marginTop: Fonts.h(10), marginBottom: Fonts.h(15)}}
              selectedOptionStyle={[styles.serviceStyles, {backgroundColor: Colors.trilonO, borderColor: Colors.trilonO}]}
              optionStyle={[styles.serviceStyles, {backgroundColor: Colors.white, borderColor: Colors.whiteOpaq}]}
              selectedOptionTextStyle={[styles.serviceTextStyles, {color: Colors.white}]}
              optionTextStyle={[styles.serviceTextStyles, {color: Colors.darkText}]}
            />
          </View>
          <View style={styles.filterSection}>
            <TitleLabel
              title="Price"
              textStyle={{
                fontWeight: 'bold',
                fontSize: Fonts.h(15),
                color: Colors.darkText,
              }}
            />
            <Text style={{alignSelf: 'flex-end', fontSize: Fonts.h(14), color: Colors.darkText}}>N 10,000</Text>
            <Slider
              value={10000}
              step={500}
              onValueChange={handlePriceChange}
              maximumValue={100000}
              minimumValue={1000}
              thumbStyle={{backgroundColor: Colors.trilonO, width: Fonts.h(20), height: Fonts.h(20)}}
              trackStyle={{height: Fonts.h(5)}}
              minimumTrackTintColor={Colors.trilonO}
              style={{marginBottom: Fonts.h(40)}}
            />
          </View>
        </ScrollableContainer>
      </Modalize>
      <AlertModal
        ref={alertRef}
        closeOnTouchOutside={true}
        titleStyle={{
          fontSize: Fonts.h(20),
          fontWeight: 'bold',
          paddingBottom: Fonts.h(10),
          paddingTop: Fonts.h(20),
          color: Colors.dark,
          fontFamily: Fonts.AVERTA_SEMIBOLD,
        }}
        messageStyle={{
          textAlign: 'center',
          maxWidth: '90%',
          paddingBottom: Fonts.h(35),
        }}
        contentContainerStyle={{
          padding: Fonts.h(0),
          paddingTop: Fonts.h(30),
          borderRadius: Fonts.h(6),
          width: Fonts.h(300),
          top: '-10%',
        }}
        showConfirmButton={true}
        confirmButtonStyle={{
          backgroundColor: Colors.trilon,
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
        onConfirmPressed={() => {
          alertRef.current?.closeModal();
          handleLocationAllow()
        }}
      />
      <ErrorModal
        message={errorMessage}
        showModal={showErrorModal}
        onConfirm={() => setShowErrorModal(false)}
      />
      <OkModal
        message={okMessage}
        showModal={showOkModal}
        onConfirm={() => setShowOkModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterSection: {
    marginTop: Fonts.h(10)
  },
  serviceStyles: {borderRadius: Fonts.w(20), paddingVertical: Fonts.h(5), paddingHorizontal: Fonts.w(15), borderWidth: Fonts.w(1), marginVertical: Fonts.h(5)},
  serviceTextStyles: {fontSize: Fonts.h(14)}
});

export default ViewAll;
