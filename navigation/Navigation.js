import * as React from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import TreasuresScreen from '../screens/TreasuresScreen';
import MailScreen from '../screens/MailScreen';
import VaultScreen from '../screens/VaultScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let icon;
  
              if (route.name === 'Home') {
                icon = focused
                  ? 'home'
                  : 'home';
              } else if (route.name === 'Settings') {
                icon = focused ? 
                'cog' : 
            'cog'
              }
              else if (route.name === 'Treasures') {
                icon = focused ? 
                'gem' : 
            'gem'
              }
              else if (route.name === 'Vault') {
                return  <Icon
              name='treasure-chest'
              type='material-community'
              size={26}
            /> ;
              }
              else if (route.name === 'Mail') {
                if (icon = focused){
                      return  <Icon
                      name='mailbox-open'
                      type='material-community'
                      size={26}
                  /> ;}
                else{
                  return  <Icon
                      name='mailbox'
                      type='material-community'
                      size={26}
                  /> ;
                }
              }
              // You can return any component that you like here!
              return  <Icon
              name={icon}
              type='font-awesome-5'
              size={26}
            /> ;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Treasures" component={TreasuresScreen} />
          <Tab.Screen name="Vault" component={VaultScreen} />
          <Tab.Screen name="Mail" component={MailScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
            //   <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={Home} />
    //     <Stack.Screen name="Notifications" component={Notifications} />
    //     <Stack.Screen name="Profile" component={Profile} />
    //     <Stack.Screen name="Settings" component={Settings} />
    // </Stack.Navigator>
    // </NavigationContainer>
      );
}