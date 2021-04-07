import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';
import {
  SavingsRenderProps,
  savingsRoutes,
  SavingsStackParamList,
} from './routes';
import {SavingProvider} from 'src/contexts/savingContext';
import HeadBackButton from 'src/components/HeadBackButton';

const Stack = createStackNavigator<SavingsStackParamList>();

export function renderScreen({
  name,
  component,
  options = {},
}: SavingsRenderProps) {
  return (
    <Stack.Screen
      name={name}
      key={name}
      options={options}
      component={component}
    />
  );
}

const SavingsNavigation: FunctionComponent = () => {
  return (
    <SavingProvider>
      <Stack.Navigator initialRouteName="Savings" 
      screenOptions={{
        headerLeft: () => <HeadBackButton />,
      }}>
        {savingsRoutes.map((route) => {
          return renderScreen(route);
        })}
      </Stack.Navigator>
    </SavingProvider>
  );
};

export default SavingsNavigation;
