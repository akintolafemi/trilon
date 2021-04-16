import React, {useState, FunctionComponent, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {RenderProps, RootStackParamList} from './routes';
import {PAGE_COUNT} from '../common/Constants';
import {routes} from './routes';
import {DrawerActions} from '@react-navigation/native';
import { Colors } from '../common';

export const navigationRef: any = React.createRef();

export function openDrawer() {
  navigationRef.current?.dispatch(DrawerActions.openDrawer());
}

export function navigate(name: any, params: any) {
  navigationRef.current?.navigate(name, params);
}

const Stack = createStackNavigator<RootStackParamList>();

export function renderScreen({name, component, options = {}, initialParams = {}}: RenderProps) {
  return (
    <Stack.Screen
      name={name}
      key={name}
      options={options}
      component={component}
      initialParams={initialParams}
    />
  );
}

const RootNavigation: FunctionComponent = () => {
  const [pageCount, setPageCount] = useState<string | undefined | null>(null);
  useEffect(() => {
    try {
      AsyncStorage.getItem(PAGE_COUNT).then((cn) => setPageCount(cn));
    } catch (error) {
      console.log('Count read error', error);
    }
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        //headerLeft: () => <HeadBackButton />,
        headerStyle: {
          backgroundColor: Colors.white,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      initialRouteName={pageCount === '2' ? 'OnboardMain' : 'Intro'}>
      {routes.map((route) => {
        return renderScreen(route);
      })}
    </Stack.Navigator>
  );
};

export default RootNavigation;
