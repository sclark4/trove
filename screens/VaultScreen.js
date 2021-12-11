import React, {useState} from 'react';
import { Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import {styles} from '../style/styles';
import { Card, ListItem, Icon, Header } from 'react-native-elements'
import AddVaultModal from '../components/AddVaultModal';
const animals = [
  'anole',
  'cat',
  'cow',
  'dog',
  'duck',
  'fish',
  'goat',
  'hamster',
  'horse',
  'mouse',
  'pig',
  'rabbit',
  'sheep',
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
    
    <View style={styles.container}>

      <Header
      containerStyle={styles.headerContainer}
      backgroundColor='#fff'
      // leftComponent={<Button title='Add'></Button>}
  leftComponent= {<AddVaultModal/>}
  centerComponent={{ text: 'Vault', style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}
  rightComponent={{ icon: 'home', color: '#BEBEBE' }}
/>
      <Button title='Create New Vault' onPress={() => alert("To Be Implemented")}/>
      <View style={styles.listWrapper}>
          <FlatList showsVerticalScrollIndicator={false}
          style={styles.list}
            data={animals}
            renderItem={ datum => <ListItem text={datum.item}></ListItem>} 
            keyExtractor={item => item} 
          />
        </View>
    </View>
  );
}