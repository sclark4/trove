import * as React from 'react';
import { useContext } from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import {styles} from '../style/styles';
import { Header } from 'react-native-elements'
import AddVaultModal from '../components/AddVaultModal';
import StateContext from '../StateContext';
import {useFonts} from 'expo-font';

export default function VaultScreen(props) {
  const Props = useContext(StateContext);
  const screenProps = Props.vaultProps;

  const newItem = {'user': 'echoe2@wellesley.edu',                         
    'title': 'Summer Break :)',
    'id': 10
  };

  const ListItem = item => { 
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('VaultsNav', { screen: 'Vault', params: {vault: item.text.item, update: screenProps.updateVault, delete: screenProps.deleteVault }})}> 
        <View style={styles.listItem}>
          <Image
            style={styles.smallIcon}
            source={require('../assets/chest.png')}
          />
          <Text style={styles.listItemText}>{item.text.item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const [loaded] = useFonts({
    Karla_Regular: require('../assets/fonts/Karla-Regular.ttf'),
    Karla_ExtraLight: require('../assets/fonts/Karla-ExtraLight.ttf'),
    Grandstander_Bold: require('../assets/fonts/Grandstander-Bold.ttf'),
    Grandstander_Medium: require('../assets/fonts/Grandstander-Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View>
      <Header
      backgroundColor='#fff'
      leftComponent= {<AddVaultModal add={screenProps.addVault}/>}
      centerComponent={{ text: 'Vault', style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}/>

      <View style={styles.listWrapper}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.list}
            data={screenProps.vaults}
            renderItem={ datum => <ListItem id={datum.id} text={datum} title={datum.title}></ListItem>} 
            keyExtractor={item => item} />

        </View>
    </View>
  );
}