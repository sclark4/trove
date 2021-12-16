import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VaultScreen from '../screens/VaultScreen';
import Vault from '../components/Vault';
import SwipeList from '../components/SwipeList';
import AddVaultModal from '../components/AddVaultModal';

const Stack = createNativeStackNavigator()

export default function VaultsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Vaults" component={VaultScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Vault" component={Vault} options={{headerShown: false}}/>
      <Stack.Screen name="Swipe" component={SwipeList} />
    </Stack.Navigator>
  )
}