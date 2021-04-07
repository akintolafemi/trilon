import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabRenderProps} from './routes';
import VectorIcon from 'src/components/VictorIcon';
import Dashboard from '../screens/dashboard';
import {openDrawer} from './RootNavigation';
import Transactions from 'src/screens/transactions';
import TransactionNavigation from './TransactionNavigation';
// import TransactionNavigatior from './TransactionNavigator';

const Tab = createBottomTabNavigator();

function renderTab({name, icon, component, index}: TabRenderProps) {
  return (
    <Tab.Screen
      name={name}
      key={index}
      component={component}
      options={{
        unmountOnBlur: true,

        tabBarIcon: ({focused, size}) => (
          <VectorIcon name={icon} size={size} focused={focused} label={name} />
        ),
      }}
      listeners={({navigation, route}) => ({
        tabPress: (e) => {
         
          if (route.name === 'More') {
            e.preventDefault();
            navigation.toggleDrawer();
          }
        },
      })}
    />
  );
}

export default function DashboardTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        
      }}
      screenOptions={{}}>
      {routes.map((item, index) => {
        return renderTab({...item, index});
      })}
    </Tab.Navigator>
  );
}

const routes: Array<TabRenderProps> = [
  {name: 'Home', icon: 'home', component: Dashboard},
  {name: 'Transaction', icon: 'schedule', component : TransactionNavigation},
  {name: 'More', icon: 'more', component: Dashboard},
];
