import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import AddTreasureModal from '../components/AddTreasureModal';
import EditTreasureModal from '../components/EditTreasureModal';
import ShareTreasureModal from '../components/ShareTreasureModal';
import Treasure from '../components/Treasure';
import MailScreen from '../screens/MailScreen';
import TreasuresScreen from '../screens/TreasuresScreen';

const Stack = createStackNavigator()

export default function TreasuresNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Treasures" component={TreasuresScreen} />
      <Stack.Screen name="Treasure" component={Treasure} />
      {/* <Stack.Screen name="AddTreasure" component={AddTreasureModal} />
      <Stack.Screen name="EditTreasure" component={EditTreasureModal} />
      <Stack.Screen name="ShareTreasure" component={ShareTreasureModal} /> */}
    </Stack.Navigator>
  )
}