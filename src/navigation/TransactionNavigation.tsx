import React, { FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HeadBackButton from 'src/components/HeadBackButton';
import { transactionRoutes, TransactionStackParamList } from './routes';
import Transactions from 'src/screens/transactions';
import TransactionDetail from 'src/screens/transactions/transactionDetail';

const Stack = createStackNavigator<TransactionStackParamList>();

const TransactionNavigation: FunctionComponent = () => {
    return (
            <Stack.Navigator initialRouteName="Transactions"
                screenOptions={{
                    headerLeft: () => <HeadBackButton />,
                }}>
                {/* {transactionRoutes.map((route) => {
                    console.log(route, 'added Transaction route');
                    return (<Stack.Screen name={route.name}
                        key={route.name}
                        options={route.options}
                        component={route.component} />)
                })} */}
                <Stack.Screen name={"Transactions"} component={Transactions} />
                <Stack.Screen name={"TransactionDetail"} component={TransactionDetail} />
            </Stack.Navigator>
    );
}

export default TransactionNavigation;