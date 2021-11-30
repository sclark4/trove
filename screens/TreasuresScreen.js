import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import {styles} from '../style/styles';
import AddTreasureModal from '../components/AddTreasureModal';
import Treasure from '../components/Treasure';
import { NavigationActions } from 'react-navigation';

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

export default function TreasuresScreen({navigation}) {
  const [selectedMail, setSelectedMail] = useState(null);
  const ListItem = props => { 
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('TreasuresNav', { screen: 'Treasure', params: { title: 'Oh Happy Day!' }})}
      >
        <View style={styles.listItem}>
          {/* <Image
            style={styles.smallImage}
            source={{uri: 'https://cs.wellesley.edu/~cs/ai2workshop/animals/'
                         + props.text + '.jpg'}}
          /> */}
          <Image
            style={styles.smallIcon}
            source={require('../assets/diamond.png')}
          />
          <Text style={styles.listItemText}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  const navigateAction = NavigationActions.navigate({
    routeName: 'Treasures',
    action: NavigationActions.navigate({
      routeName: 'Treasure',
      params: {title: 'Oh Happy Day!'},
    }),
  });

  return (
    <View style={styles.container}>
      <AddTreasureModal />
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