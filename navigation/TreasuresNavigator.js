import React, {useContext} from 'react';
import { Button } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack'
import AddTreasureModal from '../components/AddTreasureModal';
import EditTreasureModal from '../components/EditTreasureModal';
import ShareTreasureModal from '../components/ShareTreasureModal';
import Treasure from '../components/Treasure';
import MailScreen from '../screens/MailScreen';
import TreasuresScreen from '../screens/TreasuresScreen';
import StateContext from '../StateContext';

const Stack = createNativeStackNavigator()

export default function TreasuresNavigator(props) {
  const screenProps = useContext(StateContext);
  // console.log("hi",JSON.stringify(treasuresProps, null, 2), "123");
  // function screen(props){
  // navigation.setParams({
  //   query: 'someText',
  // });
  return (
    <StateContext.Provider value={screenProps}>
    <Stack.Navigator>
      <Stack.Screen name="Treasures" component={TreasuresScreen} options={{
          headerShown: false}}/> 
      <Stack.Screen name="Treasure" component={Treasure} options={{headerShown: false}} />
      {/* initialParams = {route.params.treasures[0]} */}
      {/* <Stack.Screen name="AddTreasure" component={AddTreasureModal} />
      <Stack.Screen name="EditTreasure" component={EditTreasureModal} />
      <Stack.Screen name="ShareTreasure" component={ShareTreasureModal} /> */}
    </Stack.Navigator>
   </StateContext.Provider>
  );
    // }
    // return (screen);
}