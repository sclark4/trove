import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MailScreen from '../screens/MailScreen';
import Mail from '../components/Mail';
import StateContext from '../StateContext';

const Stack = createNativeStackNavigator()

export default function MailNavigator(props) {
  const screenProps = useContext(StateContext);
  return (
    <StateContext.Provider value={screenProps}>
    <Stack.Navigator>
      <Stack.Screen name="allMail" component={MailScreen} options={{headerShown: false}}/> 
      <Stack.Screen name="mailItem" component={Mail} options={{headerShown: false}} />
    </Stack.Navigator>
   </StateContext.Provider>
  );
}