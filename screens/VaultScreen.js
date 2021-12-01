import React, {useState} from 'react';
import { Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import {styles} from '../style/styles';
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

export default function VaultScreen({navigation}) {
  const [selectedVault, setSelectedVault] = useState(null);
  const ListItem = props => { 
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('VaultsNav', { screen: 'Vault', params: { title: 'Oh Happy Day!' }})}
      > 
      {/* Update nav to go to single vault screen */}
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
      <Text>View All Vaults</Text>
      <Button title='Create New Vault'/>
      <Button title='Sort Filter'/>
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