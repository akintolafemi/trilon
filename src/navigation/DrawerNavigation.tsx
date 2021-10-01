import React, {FunctionComponent} from 'react';
import { Icon as RNEIcon } from 'react-native-elements';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';
import {Colors, Fonts} from '../common';
import {createDrawerNavigator} from '@react-navigation/drawer';

//Dashboard Screens
import BottomTabNavigator from './BottomTabNavigator';
import TrilonLibrary from '../screens/TrilonLibrary';
import MapsScreen from '../screens/More/MapsScreen';

import {
  DrawerStackParamList,
  DrawerRenderProps,
  drawerRoutes,
} from './routes';

const Stack = createStackNavigator<DrawerStackParamList>();
const Drawer = createDrawerNavigator();

type Props = StackScreenProps<SavingsStackParamList, 'More'>;

export function renderScreen({
  name,
  component,
  options = {},
}: DrawerRenderProps) {
  return <Drawer.Screen name={name} key={name} component={component} options={options} />;
}

// drawerContent={(props) => <CustomDrawerContent {...props}/>}

const MoreNavigation: FunctionComponent<Props> = ({navigation, route}) => {
  return (
    <Drawer.Navigator
      //drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="DashboardTab"
      drawerType="slide"
      drawerContentOptions={{
        style: {backgroundColor: Colors.colorWhite, paddingTop: Fonts.h(50), paddingHorizontal: Fonts.w(10)},
        itemStyle: {},
        activeBackgroundColor: Colors.trilon,
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.darkText,
      }}
    >
      <Drawer.Screen
        name='DashboardTab'
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          gestureEnabled: false,
          drawerLabel: 'Home',
          drawerIcon: ({focused}) => (
            <RNEIcon name="home-outline" type='ionicon' iconStyle={[{fontSize: Fonts.h(20)}, {color: focused ? Colors.white : Colors.trilon}]} />
          )
        }}
      />
      <Drawer.Screen
        name='TrilonLibrary'
        component={TrilonLibrary}
        options={{
          headerShown: false,
          gestureEnabled: false,
          drawerLabel: 'Library',
          drawerIcon: ({focused}) => (
            <RNEIcon name="newspaper-outline" type='ionicon' iconStyle={[{fontSize: Fonts.h(20)}, {color: focused ? Colors.white : Colors.darkText}]} />
          )
        }}
      />
      <Drawer.Screen
        name='Maps'
        component={MapsScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          drawerLabel: 'Location',
          drawerIcon: ({focused}) => (
            <RNEIcon name="newspaper-outline" type='ionicon' iconStyle={[{fontSize: Fonts.h(20)}, {color: focused ? Colors.white : Colors.darkText}]} />
          )
        }}
      />
    </Drawer.Navigator>
  );
};

export default MoreNavigation;
