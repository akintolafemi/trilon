import { Icon as RNEIcon } from 'react-native-elements';
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

//Dashboard Screens
import BottomTabNavigator from './BottomTabNavigator';
import Dashboard from '../screens/Dashboard';


//Nearby screens
import Nearby from '../screens/Nearby';


//salon screens
import Salon from '../screens/Salon';
import ViewAll from '../screens/Salon/ViewAll';
import FilterSalons from '../screens/Salon/FilterSalons';


//specialist screens
import Specialist from '../screens/Specialist';


//appointment screens
import Book from '../screens/Appointment/Book';

//inbox screens
import Inbox from '../screens/Inbox';
import ChatScreen from '../screens/Inbox/ChatScreen';

//More Screens
import MoreNavigation from './DrawerNavigation';

import TermsOfUse from '../screens/More/TermsOfUse';

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
  Salon: undefined;
  ViewAll: undefined;
  FilterSalons: undefined;
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
  {
    name: 'TermsOfUse',
    component: TermsOfUse,
    options: {
      headerShown: true,
      title: ''
    }
  },
  {
    name: 'Salon',
    component: Salon,
    options: {
      headerShown: false,
    }
  },
  {
    name: 'Specialist',
    component: Specialist,
    options: {
      headerShown: false,
    }
  },
  {
    name: 'ChatScreen',
    component: ChatScreen,
    options: {
      headerShown: true,
      title: 'Chat',
    },
  },
  {
    name: 'BookAppointment',
    component: Book,
    options: {
      headerShown: false
    },
  },
  {
    name: 'ViewAll',
    component: ViewAll,
    options: {
      headerShown: true,
      title: '',
      headerBackTitleVisible: false,
      headerTitleStyle: {
      }
    },
  },
  {
    name: 'FilterSalons',
    component: FilterSalons,
    options: {
      headerShown: false,
    },
  },
//  {name: 'DashboardTab', component: BottomTabNavigator, options: {headerShown: false}},
  {name: 'Drawer', component: MoreNavigation, options: {headerShown: false, gestureEnabled: false}},
];

export const dashboardRoutes: Array<RenderProps> = [
  {
    name: 'Dashboard',
    component: Dashboard,
    options: {
      headerShown: false
    },
  },
];

export type DrawerStackParamList = {
  More: undefined;
  DashboardTab: undefined;
};

export type DrawerRenderProps = {
  name: keyof DrawerStackParamList;
  component: FunctionComponent<any>;
  options: StackNavigationOptions;
};


export const drawerRoutes: Array<DrawerRenderProps> = [
];

export const nearbyRoutes: Array<RenderProps> = [
  {
    name: 'Nearby',
    component: Nearby,
    options: {
      headerShown: false
    },
  },
];

export const inboxRoutes: Array<RenderProps> = [
  {
    name: 'Inbox',
    component: Inbox,
    options: {
      headerShown: true,
      title: 'Messages',
      headerBackTitleVisible: false,
      headerLeft: null,
      headerTitleStyle: {
        alignSelf: "center"
      }
    },
  },
];
