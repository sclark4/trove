import * as React from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import TreasuresScreen from '../screens/TreasuresScreen';
import MailScreen from '../screens/MailScreen';
import VaultScreen from '../screens/VaultScreen';

const Tab = createBottomTabNavigator();

export default function Navigation(screenProps) {
  // const treasures = route.params.treasures
  // console.log(treasures)
  function Nav(props){
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
              color='#BEBEBE'
            /> ;
              }
              else if (route.name === 'Mail') {
                if (icon = focused){
                      return  <Icon
                      name='mailbox-open'
                      type='material-community'
                      size={26}
                      color='#BEBEBE'
                  /> ;}
                else{
                  return  <Icon
                      name='mailbox'
                      type='material-community'
                      size={26}
                      color='#BEBEBE'
                  /> ;
                }
              }
              // You can return any component that you like here!
              return  <Icon
              name={icon}
              color='#BEBEBE'
              type='font-awesome-5'
              size={26}
            /> ;
            },
            tabBarActiveTintColor: '#ff7fad',
            tabBarInactiveTintColor: '#BEBEBE',
          })}
        >
          {/* <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/> */}
          <Tab.Screen name="Treasures" component={TreasuresScreen(props)} options={{ headerShown: false }}  />
          <Tab.Screen name="Vault" component={VaultScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="Mail" component={MailScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
        </Tab.Navigator>
      );
    }
    return (Nav);
}