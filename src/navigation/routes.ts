import {StackNavigationOptions} from '@react-navigation/stack';
import {FunctionComponent} from 'react';

// routes screens
import App from '../screens/App';

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

export type RootStackParamList = {
  App: undefined;
};

export const routes: Array<RenderProps> = [
  {name: 'App', component: App, options: {headerShown: false}},
];
