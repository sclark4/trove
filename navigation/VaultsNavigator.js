import React, {useContext} from 'react';
import { Button } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VaultScreen from '../screens/VaultScreen';
import Vault from '../components/Vault';
import SwipeList from '../components/SwipeList';
import StateContext from '../StateContext';
import AddVaultModal from '../components/AddVaultModal';

const Stack = createNativeStackNavigator()

export default function VaultsNavigator(props) {
  const screenProps = useContext(StateContext);
  return (
    <StateContext.Provider value={screenProps}>
    <Stack.Navigator>
      <Stack.Screen name="Vaults" component={VaultScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Vault" component={Vault} options={{headerShown: false}}/>
      {/* <Stack.Screen name="Swipe" component={SwipeList} /> */}
    </Stack.Navigator>
    </StateContext.Provider>
  );
}