import {StackNavigationOptions} from '@react-navigation/stack';
import {FunctionComponent} from 'react';

// routes screens
import App from '../screens/App';
import Intro from '../screens/Intro';

//onboard and login screens
import Onboard from '../screens/Onboard';
import OnboardMain from '../screens/Onboard/OnboardMain';

//signup screens

import Signup from '../screens/Signup';
import VerifyMobile from '../screens/Signup/VerifyMobile';
import EnterOtp from '../screens/Signup/EnterOtp';

export type RenderProps = {
  name: keyof RootStackParamList;
  component: FunctionComponent<any>;
  options: StackNavigationOptions;
};

export type TabRenderProps = {
  // index?: number;
  // name: string;
  // icon: string;
  // component: FunctionComponent<any>;
};

export type DashboardTabParamList = {
  // Dashboard: undefined;
  // TransactionNavigation: undefined;
};

const randomX = Math.floor(Math.random() * (2 - 0 + 1) + 0);

export type RootStackParamList = {
  App: undefined;
  Intro: undefined;
  Signup: undefined;
};

export const routes: Array<RenderProps> = [
  {name: 'App', component: App, options: {headerShown: false}},
  {
    name: 'Intro',
    component: Intro,
    options: {
      headerShown: false
    },
    initialParams: {selectedView: randomX}
  },
  {
    name: 'Onboard',
    component: Onboard,
    options: {
      headerShown: false
    },
  },
  {
    name: 'OnboardMain',
    component: OnboardMain,
    options: {
      headerShown: false
    },
  },
  {
    name: 'Signup',
    component: Signup,
    options: {
      headerShown: true,
      title: ''
    },
  },
  {
    name: 'VerifyMobile',
    component: VerifyMobile,
    options: {
      headerShown: true,
      title: ''
    },
  },
  {
    name: 'EnterOtp',
    component: EnterOtp,
    options: {
      headerShown: true,
      title: ''
    },
  },
];
