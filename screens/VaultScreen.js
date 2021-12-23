import * as React from 'react';
import { useContext } from "react";
import { Text, View, Image, FlatList, TouchableOpacity, Pressable } from 'react-native';
import {styles} from '../style/styles';
import { Header } from 'react-native-elements'
import AddVaultModal from '../components/AddVaultModal';
import StateContext from '../StateContext';
import {useFonts} from 'expo-font';

export default function VaultScreen(props) {
  const Props = useContext(StateContext);
  const currentUser = Props.loginProps.loggedInUser;
  const screenProps = Props.vaultProps;

  const newItem = {'user': 'echoe2@wellesley.edu',                         
    'title': 'Summer Break :)',
    'id': 10
  };

  const ListItem = item => { 
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('VaultsNav', { screen: 'Vault', params: {vault: item.text.item }})}> 
        <View style={styles.listItem}>
          <Image
            style={styles.smallIcon}
            source={require('../assets/chest.png')}
          />
          <Text style={[styles.listItemText, {fontFamily:'Rubik1'} ]}>{item.text.item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const [loaded] = useFonts({
    Karla_Regular: require('../assets/fonts/Karla-Regular.ttf'),
    Karla_ExtraLight: require('../assets/fonts/Karla-ExtraLight.ttf'),
    Rubik1: require('../assets/fonts/Rubik-ExtraBold.ttf'),
    Rubik2: require('../assets/fonts/Rubik-Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View>
      <Header
      backgroundColor='#fff'
      leftComponent= {<AddVaultModal add={screenProps.addVault} currentUser ={currentUser} />}
      centerComponent={{ text: 'Vault', style: { color: '#a5c6ff', fontSize: 20, fontFamily:'Rubik1' } }}/>

      <View style={styles.listWrapper}>
        
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.list}
            data={screenProps.vaults}
            renderItem={ datum => <ListItem id={datum.id} text={datum} title={datum.title}></ListItem>} 
            keyExtractor={item => item.id} />

      </View>
    </View>
  );
}