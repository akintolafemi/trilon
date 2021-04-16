import { Icon as RNEIcon } from 'react-native-elements';
import VectorIcon from '../components/VictorIcon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {Colors, Fonts} from '../common';
import {dashboardRoutes, nearbyRoutes} from './routes';

export type BottomTabParamList = {
  Dashboard: undefined;
  Nearby: undefined;
};

export type DashboardParamList = {
  Dashboard: undefined;
};

export type NearbyParamList = {
  Nearby: undefined;
  HairTabView: undefined;
}

function renderScreen({name, component, options = {}}: RenderProps) {
  return (
    <DashboardStack.Screen
      name={name}
      key={name}
      options={options}
      component={component}
    />
  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="DashboardNavigator"
      tabBarOptions={{
        activeTintColor: Colors.trilon,
        tabStyle: {
          backgroundColor: Colors.white,
          paddingVertical: Fonts.h(5),
        }
      }}
    >
      <BottomTab.Screen
        name="DashboardNavigator"
        component={DashboardNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="NearbyNavigator"
        component={NearbyNavigator}
        options={{
          title: 'Nearby',
          tabBarIcon: ({ color }) => <TabBarIcon name="location-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="InboxNavigator"
        component={DashboardNavigator}
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <TabBarIcon name="chatbox-ellipses-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="AppointmentNavigator"
        component={DashboardNavigator}
        options={{
          title: 'Appointments',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-outline" color={color} />,
        }}
      />
      {/*}<BottomTab.Screen
        name="ProfileNavigator"
        component={DashboardNavigator}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={color} />,
        }}
      />*/}
      <BottomTab.Screen
        name="MoreNavigator"
        component={DashboardNavigator}
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => <TabBarIcon name="grid-outline" color={color} />,
        }}
        listeners={({navigation, route}) => ({
          tabPress: (e) => {

            if (route.name === 'MoreNavigator') {
              e.preventDefault();
              navigation.toggleDrawer();
              //alert("Menu clicked");
            }
          },
        })}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <RNEIcon type='ionicon' size={25} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const DashboardStack = createStackNavigator<DashboardParamList>();

function DashboardNavigator() {
  return (
    <DashboardStack.Navigator>
      {dashboardRoutes.map((route) => {
        return renderScreen(route);
      })}
    </DashboardStack.Navigator>
  );
}

const NearbyStack = createStackNavigator<NearbyParamList>();

function NearbyNavigator() {
  return (
    <NearbyStack.Navigator>
      {nearbyRoutes.map((route) => {
        return renderScreen(route);
      })}
    </NearbyStack.Navigator>
  );
}
