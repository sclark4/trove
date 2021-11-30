
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './navigation/Navigation';
import TreasuresNavigator from './navigation/TreasuresNavigator'
import HomeScreen from './screens/HomeScreen';
import VaultScreen from './screens/VaultScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Navigation />
    // </NavigationContainer>
    <NavigationContainer>
    <Stack.Navigator>
    {/* {isLoggedIn ? (
          <Stack.Screen name="Main" component={Main} />
        ) : (
          <>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Registration} /> 
          </>
        )} */}
      <Stack.Screen name="Main" component={Navigation} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TreasuresNav" component={TreasuresNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="Vault" component={VaultScreen} />
      {/* <Stack.Screen name="ShareTreasure" component={ShareTreasureModal} /> */}
    </Stack.Navigator>
  </NavigationContainer>

  );
}