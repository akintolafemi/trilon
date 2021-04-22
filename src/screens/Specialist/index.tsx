import React, {Component, FunctionComponent, useRef, useState, useEffect} from 'react';
import {titleName} from '../../../app.json';

import {SafeAreaView, PermissionsAndroid, Share, Linking, Platform, StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors, Fonts} from '../../common';
import {Header, Icon as RNEIcon, Card as RNECard, Button as RNEButton, Avatar} from 'react-native-elements';
import TitleLabel from '../../components/TitleLabel';
import AlertModal from '../../components/AlertModal';
import ErrorModal from '../../components/ErrorModal';
import OkModal from '../../components/OkModal';
import TopServicesViewComponent from '../../components/TopServicesView';
import GalleryViewComponent from '../../components/GalleryView';
import {TopServices} from '../../common/Constants';
import ScrollableContainer from '../../components/ScrollableContainer';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import SpecialistsRoundViewComponent from '../../components/SpecialistsRoundView';
import SpecialistViewComponent from '../../components/SpecialistView';
import SalonServicesViewComponent from '../../components/SalonServicesView';
import MasonryList from "react-native-masonry-list";
import {openDrawer} from '../../navigation/RootNavigation';
import ReviewViewComponent from '../../components/ReviewView';
import RenderRatings from '../../functions/RenderRatings';
import Line from '../../components/Line';
import TimeAgo from '../../functions/TimeAgo';
import WriteReviewComponent from '../../components/WriteReview';

import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';


type Props = StackScreenProps<RootStackParamList, 'Specialist'>;

const generalOverlasy = {height: '100%', width: '100%', backgroundColor: Colors.black, opacity: 0.4, position: 'absolute'};
const imageList = [
  {
    source: require('../../assets/images/dashboard-banner-1.jpg'),
    overlayStyles: [generalOverlasy, {opacity: 0.6}],
  },
  {
    source: require('../../assets/images/dashboard-banner-2.jpg'),
    overlayStyles: [generalOverlasy, {opacity: 0.6}],
  },
  {
    source: require('../../assets/images/dashboard-banner-3.jpg'),
    overlayStyles: [generalOverlasy, {opacity: 0.6}],
  },
  {
    source: require('../../assets/images/dashboard-banner-4.jpg'),
    overlayStyles: [generalOverlasy, {opacity: 0.7}],
  },
];

const galleryImages = [
  {
    source: require('../../assets/images/splash1.jpg'),
    label: 'Label X',
    rating: '3.5'
  },{
    source: require('../../assets/images/splash2.jpg'),
    label: 'Label Y',
    rating: '4.0'
  },
]

const Specialist: FunctionComponent<Props> = ({navigation, route}) => {
  const [dashboardImg, setSalonImg] = useState<Object>(imageList[0]);
  const alertRef = useRef<alertRef>(null);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrormessage] = useState<string>('');
  const [showOkModal, setShowOkModal] = useState<boolean>(false);
  const [okMessage, setOkMessage] = useState<string>('');
  const [totalStars, setTotalStars] = useState<number>(4);

  const [reviews, setReviews] = useState<array>([
    {
      photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fmodern-avatars%2F600%2FmyAvatar10-512.png&f=1&nofb=1',
      name: 'John Doe',
      ratings: 4,
      time: 'Mon Apr 19 2021 13:04:46',
      review: "One of the best salon in town, try it and you'd be glad you did."
    },
    {
      photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fmodern-avatars%2F600%2FmyAvatar10-512.png&f=1&nofb=1',
      name: 'John Doe',
      ratings: 2,
      time: 'Mon Apr 19 2021 14:04:46',
      review: "One of the best salon in town, try it and you'd be glad you did."
    },
    {
      photo: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fmodern-avatars%2F600%2FmyAvatar10-512.png&f=1&nofb=1',
      name: 'John Doe',
      ratings: 3,
      time: 'Mon Apr 19 2021 14:04:46',
      review: "One of the best salon in town, try it and you'd be glad you did."
    }
  ]);

  useEffect(() => {
    const randomX = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    setSalonImg(imageList[randomX]);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={{flex: 1, paddingBottom: Fonts.h(10)}}>
        <ImageBackground
          source={dashboardImg.source}
          style={{height: Fonts.h(230), resizeMode: "cover"}}
          imageStyle={{resizeMode: 'cover'}}
        >
          <View style={dashboardImg.overlayStyles}></View>
          <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" // or directly
            backgroundColor='transparent'
            translucent={true}
            leftComponent={
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <RNEIcon name="arrow-back" type='ionicon' color={Colors.white} size={Fonts.h(30)} />
              </TouchableOpacity>
            }
            containerStyle={{
              justifyContent: 'space-around',
              borderBottomWidth: Fonts.h(0)
            }}
          />
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: Fonts.h(20)}}>
            <View>
              <TitleLabel
                title="John Doe"
                textStyle={{
                  fontWeight: 'bold',
                  fontSize: Fonts.h(20),
                  color: Colors.white
                }}
              />
              <Text style={styles.textBelow}>Barber at Trilon.ng</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginRight: Fonts.w(10), marginTop: Fonts.h(5)}}>
                    <RenderRatings
                      totalStars={totalStars}
                      colorOne={Colors.trilonO}
                      colorTwo={Colors.white}
                      size={Fonts.h(20)}
                      margin={Fonts.w(3)}
                    />
                  </View>
                  <Text style={[styles.textBelow, {marginTop: Fonts.h(5)}]}>(512 Reviews)</Text>
                </View>
              </View>
            </View>
            <Avatar
              size={Fonts.h(100)}
              rounded
              source={{
                uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fmodern-avatars%2F600%2FmyAvatar10-512.png&f=1&nofb=1',
              }}
            />
          </View>
        </ImageBackground>
        <View style={{flex: 1, paddingTop: Fonts.h(20)}}>
          <Tabs
            uppercase={false} // true/false | default=true | labels are uppercase
            showTextLabel={true} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
            // iconPosition // leading, top | default=leading
            style={{ backgroundColor: Colors.white, }} // works the same as AppBar in react-native-paper
            // dark={false} // works the same as AppBar in react-native-paper
            theme={{// works the same as AppBar in react-native-paper
              colors: {
                primary: Colors.dark
              },
            }}
            mode="scrollable" // fixed, scrollable | default=fixed
            showLeadingSpace={true}
          >
            <TabScreen label="Basic Info">
              <SpecialistViewComponent
                navigation={navigation}
                businessname="Trilon.ng"
                about="A salon is a gathering of people held by an inspiring host. During the gathering they amuse one another and increase their knowledge through conversation. These gatherings often consciously followed Horace\'s definition of the aims of poetry, either to please or to educate"
                address="Shop 123, Agbowo complex, Ibadan, Nigeria."
                distance="1.0 km"
              />
            </TabScreen>
            <TabScreen label="Portfolio">
              <ScrollableContainer style={{paddingHorizontal: Fonts.w(10)}}>
                <MasonryList
                    images={[
                        // Version *3.0.0 update (or greater versions):
                        // Can be used with different image object fieldnames.
                        // Ex. source, source.uri, uri, URI, url, URL
                        { uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg" },
                        // IMPORTANT: It is REQUIRED for LOCAL IMAGES
                        // to include a dimensions field with the
                        // actual width and height of the image or
                        // it will throw an error.
                        // { source: require("yourApp/image.png"),
                        //     dimensions: { width: 1080, height: 1920 }
                        // },
                        // "width" & "height" is an alternative to the dimensions
                        // field that will also be acceptable.
                        // { source: require("yourApp/image.png"),
                        //     width: 1080,
                        //     height: 1920 },
                        { source: { uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg" } },
                        { uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg",
                            // Optional: Adding a dimensions field with
                            // the actual width and height for REMOTE IMAGES
                            // will help improve performance.
                            dimensions: { width: 1080, height: 1920 } },
                        { URI: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg",
                            // Version *2.0.0 update (or greater versions):
                            // Optional: Does not require an id for each
                            // image object, but is for best practices and
                            // can be better for performance with the API.
                            id: "blpccx4cn" },
                        { url: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg" },
                        { URL: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg" },
                    ]}
                    // Version *5.7.0 update
                    // onEndReached={() => {
                    //     // add more images when scroll reaches end
                    // }}
                />
              </ScrollableContainer>
            </TabScreen>
            <TabScreen label="Review">
              <ScrollableContainer style={{}}>
                <View>
                  <WriteReviewComponent
                    pressSave={() => {

                    }}
                  />
                </View>
                <TitleLabel
                  title="All reviews (3)"
                  textStyle={{
                    fontSize: Fonts.h(15),
                    color: Colors.darkText,
                    paddingHorizontal: Fonts.w(10),
                    marginVertical: Fonts.h(10)
                  }}
                />
                <FlatList
                  data={reviews}
                  renderItem={({ item }) => (
                    <ReviewViewComponent
                      image={item.photo}
                      name={item.name}
                      ratings={item.ratings}
                      time={TimeAgo(item.time)}
                      review={item.review}
                    />
                  )}
                  style={{paddingHorizontal: Fonts.w(10)}}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={ () => (
                    <Line />
                  )}
                />
              </ScrollableContainer>
            </TabScreen>
          </Tabs>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {paddingTop: Fonts.h(10), paddingHorizontal: Fonts.w(10)},
  textBelow: {color: Colors.white, fontSize: Fonts.h(12), marginTop: Fonts.h(5), fontWeight: 'bold'},
});

export default Specialist;
