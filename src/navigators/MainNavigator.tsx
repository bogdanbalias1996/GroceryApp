import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {GroceryListScreen} from '../screens';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'GroceryListScreen'} component={GroceryListScreen} />
    </Stack.Navigator>
  );
};
