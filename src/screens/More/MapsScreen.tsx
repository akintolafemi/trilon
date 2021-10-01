import React, {Component, FunctionComponent, useRef, useState, useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import {Colors, Fonts, GlobalStyles} from '../../common';
import Line from '../../components/Line';
import {RootStackParamList} from '../../navigation/routes';
import {StackScreenProps} from '@react-navigation/stack';
import ScrollableContainer from '../../components/ScrollableContainer';
import RNLocation from 'react-native-location';
import MapView from 'react-native-maps';
import MapboxGL from "@react-native-mapbox-gl/maps";
type Props = StackScreenProps<RootStackParamList, 'MapsScreen'>;

MapboxGL.setAccessToken("pk.eyJ1IjoiZm1qIiwiYSI6ImNrbmtubGRxbTA5cmMyeG1wemgwdGFpb2EifQ.DgAkZXuqr7gdEFAB4ig2GA");

const MapsScreen: FunctionComponent<Props> = ({navigation}) => {

  const [deviceLocation, setDeviceLocation] = useState({longitude: 0, latitude: 0});

  var locationSubscription;

  RNLocation.configure({
    distanceFilter: 5.0, // Meters
    desiredAccuracy: {
      ios: "best",
      android: "balancedPowerAccuracy"
    },
    // Android only
    androidProvider: "auto",
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
    // iOS Only
    activityType: "other",
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: "portrait",
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
  })

  async function getLocation() {
    await RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(granted => {
        if (granted) {
          console.log(granted);

          const unsubscribe = RNLocation.subscribeToLocationUpdates(locations => {
            setDeviceLocation(locations);
            console.log(deviceLocation);
            console.log(deviceLocation.latitude, deviceLocation.latitude);


          });

          // locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
          //   setDeviceLocation(locations);
          //
          //   /* Example location returned
          //   {
          //     speed: -1,
          //     longitude: -0.1337,
          //     latitude: 51.50998,
          //     accuracy: 5,
          //     heading: -1,
          //     altitude: 0,
          //     altitudeAccuracy: -1
          //     floor: 0
          //     timestamp: 1446007304457.029,
          //     fromMockProvider: false
          //   }
          //   */
          // })
        }
      })
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.globalScreenBg, {padding: Fonts.h(0), justifyContent: "center", alignItems: 'center'}]}>
      <View style={{height: '100%', width: '100%', backgroundColor: 'tomato'}}>
        <MapboxGL.MapView
          style={{flex: 1}}
        >
          <MapboxGL.MarkerView
            coordinate={[
              19.040236, 47.497955
            ]}
          />
        </MapboxGL.MapView>
      </View>
    </SafeAreaView>
  );
};

export default MapsScreen;
