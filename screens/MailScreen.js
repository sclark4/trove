import React, { useState, useEffect } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { Card, ListItem, Icon, Header } from 'react-native-elements'
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

export default function MailScreen({navigation}) {
  const [selectedMail, setSelectedMail] = useState('question');
  const ListItem = props => { 
    return (
      <TouchableOpacity
        onPress={() => setSelectedMail(props.text)}
      >
        <View style={styles.listItem}>
          <Image
            style={styles.smallImage}
            source={{uri: 'https://cs.wellesley.edu/~cs/ai2workshop/animals/'
                         + props.text + '.jpg'}}
          />
          <Text style={styles.listItemText}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Header
      backgroundColor='#fff'
  leftComponent={{ icon: 'menu', color: '#BEBEBE', iconStyle: { color: '#BEBEBE' } }}
  centerComponent={{ text: 'Mail', style: { color: '#00CCFF' } }}
  rightComponent={{ icon: 'home', color: '#BEBEBE' }}
/>
      <Text>All Exchanges</Text>
      <View style={styles.listWrapper}>
          <FlatList showsVerticalScrollIndicator={false}
          style={styles.list}
            data={animals}
            renderItem={ datum => <ListItem text={datum.item}></ListItem>} 
            keyExtractor={item => item} 
          />
        </View>
      <Button
      title="Send a Treasure"
      onPress={() =>
        navigation.navigate('Treasures')
      }
    />
    </View>
  );
}