import React from 'react';
import { Button } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack'
import AddTreasureModal from '../components/AddTreasureModal';
import EditTreasureModal from '../components/EditTreasureModal';
import ShareTreasureModal from '../components/ShareTreasureModal';
import Treasure from '../components/Treasure';
import MailScreen from '../screens/MailScreen';
import TreasuresScreen from '../screens/TreasuresScreen';

const Stack = createNativeStackNavigator()

export default function TreasuresNavigator(treasuresProps) {
  // console.log("hi",JSON.stringify(treasuresProps, null, 2), "123");
  function screen(props){
  // navigation.setParams({
  //   query: 'someText',
  // });
  return (
    <Stack.Navigator>
      <Stack.Screen name="Treasures" component={TreasuresScreen(props)} options={{
          headerShown: false}}/> 
      <Stack.Screen name="Treasure" component={Treasure} options={{headerShown: false}} />
      {/* initialParams = {route.params.treasures[0]} */}
      {/* <Stack.Screen name="AddTreasure" component={AddTreasureModal} />
      <Stack.Screen name="EditTreasure" component={EditTreasureModal} />
      <Stack.Screen name="ShareTreasure" component={ShareTreasureModal} /> */}
    </Stack.Navigator>
  );
    }
    return (screen);
}