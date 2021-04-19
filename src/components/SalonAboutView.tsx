import React, {FunctionComponent, useEffect, useState} from 'react';
import {Image, Text, View, TouchableOpacity, Linking, ViewStyle, Share, StyleSheet, StyleProp, ImageStyle, FlatList} from 'react-native';
import {Colors, Fonts} from '../common';
import {Icon as RNEIcon, Card as RNECard, Button as RNEButton} from 'react-native-elements';
import TitleLabel from '../components/TitleLabel';
import ScrollableContainer from '../components/ScrollableContainer';
import SalonMapViewComponent from '../components/SalonMapView';
import SpecialistsRoundViewComponent from '../components/SpecialistsRoundView';


type Props = {
  id?: number | string;
  about?: string;
  address?: string;
  distance?: string;
  photos?: array;
  openWeekDay?: string;
  closeWeekDay?: string;
  openWeekendDay?: string;
  closeWeekendDay?: string;
};

const SalonAboutViewComponent: FunctionComponent<Props> = ({
  id,
  about,
  address,
  distance,
  photos = ['https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png',],
  openWeekDay = '08:00AM',
  closeWeekDay = '08:00PM',
  openWeekendDay = '09:00AM',
  closeWeekendDay = '09:00PM',
}) => {

  const [errorMessage, setErrormessage] = useState<string>('');
  const [okMessage, setOkMessage] = useState<string>('');

  const [totalStars, setTotalStars] = useState<number>(4);
  const [specialists, setSpecialists] = useState<array>([
    {
      source: require('../assets/images/specialist-1.jpg'),
      name: 'John Max',
      alias: 'Manicure'
    },
    {
      source: require('../assets/images/specialist-2.jpg'),
      name: 'Jessica Lyn',
      alias: 'Pedicure'
    },
    {
      source: require('../assets/images/specialist-1.jpg'),
      name: 'John Max',
      alias: 'Facial'
    },
    {
      source: require('../assets/images/specialist-2.jpg'),
      name: 'Jessica Lyn',
      alias: 'Barbing'
    },
    {
      source: require('../assets/images/specialist-1.jpg'),
      name: 'John Max',
      alias: 'Manicure'
    },
    {
      source: require('../assets/images/specialist-2.jpg'),
      name: 'Jessica Lyn',
      alias: 'Spa'
    },
    {
      source: require('../assets/images/specialist-1.jpg'),
      name: 'John Max',
      alias: 'Manicure'
    },
    {
      source: require('../assets/images/specialist-2.jpg'),
      name: 'Jessica Lyn',
      alias: 'Salon'
    },
  ]);

  const [showFull, setShowFull] = useState<boolean>(false);

  const clickables = [
    {
      icon: 'globe-outline',
      label: 'Website',
      onPress: () => {
        Linking.openURL('https://idealswift.com');
      }
    },
    {
      icon: 'call-outline',
      label: 'Call',
      onPress: async () => {
        // if (Platform.OS === 'ios') {
        //   phoneNumber = 'telprompt:${1234567890}';
        // }
        // else {
        //   phoneNumber = 'tel:${1234567890}';
        // }
        await Linking.openURL('tel:+2348100131944');
      }
    },
    {
      icon: 'compass-outline',
      label: 'Direction',
      onPress: async () => {
        await Linking.openURL('https://idealswift.com');
      }
    },
    {
      icon: 'share-outline',
      label: 'Share',
      onPress: async () => {
        try {
          const result = await Share.share({
            message:
              'Hello, I am inviting you to download the Trilon.ng unisex salon mobile app to enjoy premium salon related services.',
              title: 'Invite friends'
          }, {
            dialogTitle: 'Trilon.ng'
          });
          if (result.action === Share.sharedAction) {
            setOkMessage("Thank you for sharing Trilon.ng with your friend(s)");
            setShowOkModal(true);
            if (result.activityType) {
              // shared with activity type of result.activityType

            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            setErrormessage("Sharing action dismissed");
            setShowErrorModal(true);
          }
        } catch (error) {
          setErrormessage(error.message);
          setShowErrorModal(true);
        }
      }
    },
  ]

  useEffect(() => {

  }, []);

  const aboutShort = about.substring(0, 100);
  const aboutShort2 = about.substring(101, about.length - 1);

  return (
    <ScrollableContainer style={{paddingHorizontal: Fonts.w(10)}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {clickables.map((click, index) => {
           return (
             <TouchableOpacity
               onPress={click.onPress}
               key={index.toString()}
               style={{alignItems: 'center'}}
             >
               <RNEIcon name={click.icon} type='ionicon' color={Colors.trilonO} size={Fonts.h(35)} />
               <Text style={{color: Colors.darkText}}>{click.label}</Text>
             </TouchableOpacity>
           );
        })}
      </View>
      <View style={styles.sectionContainer}>
        <TitleLabel
          title="Popular Specialists"
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
          data={specialists}
          horizontal={true}
          renderItem={({ item }) => (
            <SpecialistsRoundViewComponent
              source={item.source}
              name={item.name}
              alias={item.alias}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{marginTop: Fonts.h(25)}}>
        {!showFull ? (
          <Text>{aboutShort}...</Text>
        ) :
          (
            <Text>{about}</Text>
          )
        }
        {!showFull ? (
          <TouchableOpacity onPress={() => setShowFull(true)}><Text style={{color: Colors.trilonO}}>show more</Text></TouchableOpacity>
        ) : null
        }
      </View>
      <View style={{marginTop: Fonts.h(25)}}>
        <TitleLabel
          title="Opening Hours"
          textStyle={{
            fontWeight: 'bold',
            fontSize: Fonts.h(15),
            color: Colors.black
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: Fonts.h(10)}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RNEIcon name='ellipse' type='ionicon' size={Fonts.h(10)} color={Colors.trilon} />
            <Text style={{marginLeft: Fonts.w(5)}}>Monday - Friday</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>{openWeekDay} - {closeWeekDay}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: Fonts.h(5)}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RNEIcon name='ellipse' type='ionicon' size={Fonts.h(10)} color={Colors.trilon} />
            <Text style={{marginLeft: Fonts.w(5)}}>Saturday - sunday</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>{openWeekendDay} - {closeWeekendDay}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Fonts.h(25)}}>
          <View>
            <TitleLabel
              title="Address"
              textStyle={{
                fontWeight: 'bold',
                fontSize: Fonts.h(15),
                color: Colors.black
              }}
            />
            <Text style={{marginTop: Fonts.h(5), color: Colors.darkText}}>{address}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Fonts.h(5)}}>
              <RNEIcon name="paper-plane" type='ionicon' color={Colors.trilonO} size={Fonts.h(15)} />
              <Text style={{fontWeight: 'bold', marginHorizontal: Fonts.w(5), color: Colors.trilonO}}>Get Direction - {distance}</Text>
            </View>
          </View>
          {/*}<SalonMapViewComponent />*/}
        </View>
        <View style={{marginTop: Fonts.h(25), marginLeft: Fonts.w(-5)}}>
          <TitleLabel
            title="Photos"
            textStyle={{
              fontWeight: 'bold',
              fontSize: Fonts.h(15),
              color: Colors.black,
              marginLeft: Fonts.w(5)
            }}
          />
          <FlatList
            data={photos}
            horizontal={true}
            renderItem={({ photo, index }) => (
              <TouchableOpacity style={{marginTop: Fonts.h(5)}}>
                <Image
                  source={{
                    uri: photos[index]
                  }}
                  style={{height: Fonts.h(70), margin: Fonts.w(5), width: Fonts.w(70), borderRadius: Fonts.h(10)}}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(photo, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{marginTop: Fonts.h(25)}}>
          <RNEButton
            title="Book"
            titleStyle={{fontSize: Fonts.h(12)}}
            buttonStyle={{backgroundColor: Colors.trilonO, height: Fonts.h(40), paddingHorizontal: Fonts.w(20), borderRadius: Fonts.h(20)}}
          />
        </View>
      </View>
    </ScrollableContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {paddingTop: Fonts.h(10)},
  textBelow: {color: Colors.white, fontSize: Fonts.h(12), marginTop: Fonts.h(5), fontWeight: 'bold'},
});

export default SalonAboutViewComponent;
