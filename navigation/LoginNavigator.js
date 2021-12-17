import React, {useContext} from 'react';
import { Button } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen';
import StateContext from '../StateContext';

const Stack = createNativeStackNavigator()

export default function LoginNavigator(props) {
  const screenProps = useContext(StateContext);
  return (
    <StateContext.Provider value={screenProps}>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{
          headerShown: false}}/> 
    </Stack.Navigator>
   </StateContext.Provider>
  );

}