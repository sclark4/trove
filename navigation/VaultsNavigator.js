import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import VaultScreen from '../screens/VaultScreen';
import Vault from '../components/Vault';
import SwipeList from '../components/SwipeList';

const Stack = createStackNavigator()

export default function VaultsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Vaults" component={VaultScreen} />
      <Stack.Screen name="Vault" component={Vault} />
      <Stack.Screen name="Swipe" component={SwipeList} />
    </Stack.Navigator>
  )
}