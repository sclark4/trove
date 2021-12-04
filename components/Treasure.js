import React, { useState, useEffect } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { Card, ListItem, Icon, Header } from 'react-native-elements'
import {styles} from '../style/styles';
import EditTreasureModal from './EditTreasureModal';
import ShareTreasureModal from './ShareTreasureModal';

export default function Treasure({navigation,route}) {
  console.log(route.params, '1');
  const title = route.params.title;
  // console.log(treasure, '21');
  return (
    <View style={styles.container}>
      <Header
      backgroundColor='#fff'
      // leftComponent={<Button title='Add'></Button>}
  leftComponent={{ icon: 'menu', color: '#BEBEBE', iconStyle: { color: '#BEBEBE' } }}
  centerComponent={{ text: route.params.title, style: { color: '#00CCFF' } }}
  rightComponent={{ icon: 'home', color: '#BEBEBE' }}
/>
      {/* <Text style={styles.h1}>{route.params.title}</Text> */}
      <Text style={styles.h2}>Date: {route.params.date}</Text>
      <Text style={styles.paragraph}>Description: {route.params.description}</Text>
      <Text style={styles.paragraph}>Location: n/a</Text>
      <Text style={styles.paragraph}>Tags: {route.params.tags} </Text>
      <Image
            style={styles.smallIcon}
            source={require('../assets/diamond.png')}
          />
      <EditTreasureModal treasure={route.params}/>
      <ShareTreasureModal />
      <Button title='go back' 
        onPress={() => navigation.goBack()}/>
    </View>
  );
}