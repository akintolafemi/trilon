import React, {FunctionComponent} from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  SavingsRenderProps,
  savingsRoutes,
  DrawerStackParamList,
  DrawerRenderProps,
  drawerRoutes,
  SavingsStackParamList,
} from './routes';
import {SavingProvider} from 'src/contexts/savingContext';
import More from 'src/screens/more';
import HeadBackButton from 'src/components/HeadBackButton';

const Stack = createStackNavigator<DrawerStackParamList>();
const Drawer = createDrawerNavigator();
type Props = StackScreenProps<SavingsStackParamList, 'Savings'>;

export function renderScreen({
  name,
  component,
  options = {},
}: DrawerRenderProps) {
  return <Drawer.Screen name={name} key={name} component={component} />;
}

// drawerContent={(props) => <CustomDrawerContent {...props}/>}

const SavingsNavigation: FunctionComponent<Props> = ({navigation, route}) => {
  return (
    <SavingProvider>
      <Drawer.Navigator
        drawerType="front"
        initialRouteName="DashboardTab"
        drawerStyle={{width: '100%'}}
        overlayColor="transparent"
        screenOptions={{
          headerLeft: () => <HeadBackButton />,
        }}
        drawerContent={(props) => <More {...props} />}>
        {drawerRoutes.map((route) => {
          return renderScreen(route);
        })}
      </Drawer.Navigator>
    </SavingProvider>
  );
};

export default SavingsNavigation;
