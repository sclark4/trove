import React, {useContext} from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import TreasuresScreen from '../screens/TreasuresScreen';
import MailScreen from '../screens/MailScreen';
import VaultScreen from '../screens/VaultScreen';
import StateContext from '../StateContext';
import NotificationScreen from '../screens/NotificationScreen';
const Tab = createBottomTabNavigator();

export default function Navigation(props) {
    const screenProps = useContext(StateContext);
    return (
      <StateContext.Provider value={screenProps}>
        <Tab.Navigator
        initialRouteName="Login"
        
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let icon;
              if (route.name === 'Settings') {
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
              return <Icon
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
          {/* <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}  /> */}
          {/* <Tab.Screen name="Login" component={NotificationScreen} options={{ headerShown: false }}  /> */}

          <Tab.Screen name="Treasures" component={TreasuresScreen} options={{ headerShown: false }}  />
          <Tab.Screen name="Vault" component={VaultScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="Mail" component={MailScreen} options={{ headerShown: false, tabBarBadge: 4 }}/>
          <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
        </Tab.Navigator>
        </StateContext.Provider>
      );
}