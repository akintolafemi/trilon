import {StackNavigationOptions} from '@react-navigation/stack';
import {FunctionComponent} from 'react';

// routes screens
import App from '../screens/App';
import Intro from '../screens/Intro';
import Onboard from '../screens/Onboard';
import OnboardMain from '../screens/Onboard/OnboardMain';

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
];
