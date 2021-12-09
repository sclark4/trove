import React, { useState, useEffect } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Card, ListItem, Icon, Header } from 'react-native-elements'
import {styles} from '../style/styles';
import EditTreasureModal from './EditTreasureModal';
import ShareTreasureModal from './ShareTreasureModal';
import AddToVaultModal from './AddToVault';

export default function Treasure({navigation,route}) {
  const title = route.params.title;
  // console.log(treasure, '21');
  return (
    <View style={styles.container}>
      <Header
      backgroundColor='#fff'
      // leftComponent={<Button title='Add'></Button>}
  leftComponent={{ icon: 'menu', color: '#BEBEBE', iconStyle: { color: '#BEBEBE' } }}
  centerComponent={{ text: route.params.treasure.title, style: { color: '#00CCFF' } }}
  rightComponent={{ icon: 'home', color: '#BEBEBE' }}
/>
<Pressable style={[styles.button, styles.buttonOpen]} 
        onPress={() => navigation.goBack()}> 
        <Text style={styles.textStyle}>Go Back</Text>
        </Pressable>
      {/* <Text style={styles.h1}>{route.params.title}</Text> */}
      <Image
            style={styles.regularTreasure}
            // source={require('../assets/diamond.png')}
            source={{uri:('https://cdn.pixabay.com/photo/2021/01/21/16/17/english-cocker-spaniel-5937757_1280.jpg')}}
          />
      <Text style={styles.h2}>Date: {route.params.treasure.date.toString()}</Text>
      <Text style={styles.paragraph}>Description: {route.params.treasure.description}</Text>
      <Text style={styles.paragraph}>Location: n/a</Text>
      <Text style={styles.paragraph}>Tags: {route.params.treasure.tags.map(tag => '#'+tag+' ')} </Text>
      
      <EditTreasureModal treasure={route.params.treasure}/>
      <ShareTreasureModal treasure={route.params.treasure}/>
      <AddToVaultModal treasure={route.params.treasure}/>
      
    </View>
  );
}