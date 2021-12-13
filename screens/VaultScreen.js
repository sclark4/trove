import React, {useState} from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import {styles} from '../style/styles';
import { Header } from 'react-native-elements'
import AddVaultModal from '../components/AddVaultModal';
const vaults = [
  'Senior Year at Wellesley',
  'Christmas',
  'Study Abroad',
  'East Side Schenanigans',
  'Summer 2019',
]

export default function VaultScreen({navigation, route}) {
  const [selectedVault, setSelectedVault] = useState(null);
  const ListItem = props => { 
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('VaultsNav', { screen: 'Vault', params: { title: 'Oh Happy Day!' }})}
      > 
        <View style={styles.listItem}>
          <Image
            style={styles.smallIcon}
            source={require('../assets/chest.png')}
          />
          <Text style={styles.listItemText}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    );
}

  return (
    <View>
      <Header
      backgroundColor='#fff'
      leftComponent= {<AddVaultModal/>}
      centerComponent={{ text: 'Vault', style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}/>

      <View style={styles.listWrapper}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.list}
            data={vaults}
            renderItem={ datum => <ListItem text={datum.item}></ListItem>} 
            keyExtractor={item => item} />
     
        </View>
    </View>
  );
}