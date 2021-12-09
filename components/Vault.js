import React, { useState, useEffect } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Card, ListItem, Icon, Header } from 'react-native-elements';
import {styles} from '../style/styles';
import EditTreasureModal from './EditTreasureModal';
import ShareTreasureModal from './ShareTreasureModal';

export default function Vault({navigation,route}) {
  return (
    <View style={styles.container}>
      <Header
      backgroundColor='#fff'
      // leftComponent={<Button title='Add'></Button>}
  leftComponent={{ icon: 'menu', color: '#BEBEBE', iconStyle: { color: '#BEBEBE' } }}
  centerComponent={{ text: route.params.title, style: { color: '#00CCFF' } }}
  rightComponent={{ icon: 'home', color: '#BEBEBE' }}
/>
      <Text style={styles.h1}>{route.params.title}</Text>
      <Text style={styles.h2}>Date Created:</Text>
      <Text style={styles.paragraph}>Description: </Text>
      <Text style={styles.paragraph}>Swipe through contents</Text>
      <Image style={styles.smallIcon} source={require('../assets/chest.png')} />
      {/* <EditTreasureModal /> */}
      {/* <ShareTreasureModal /> */}
      <Pressable style={[styles.button, styles.buttonOpen]} 
        onPress={() => navigation.goBack()}> 
        <Text style={styles.textStyle}>Go Back</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.buttonOpen]} 
        onPress={() => navigation.navigate('VaultsNav',{screen:'Swipe'})}> 
        <Text style={styles.textStyle}>SwipeList</Text>
        </Pressable>
    </View>
  );
}