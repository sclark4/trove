import React, { useState, useEffect } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Card, ListItem, Icon, Header } from 'react-native-elements';
import {styles} from '../style/styles';
import EditTreasureModal from './EditTreasureModal';
import ShareTreasureModal from './ShareTreasureModal';
import AddToVaultModal from "./AddToVault";


export default function Vault({navigation,route}) {
  return (
    <View style={styles.container}>
      <Header
      backgroundColor='#fff'
      // leftComponent={<Button title='Add'></Button>}
  leftComponent={<AddToVaultModal/>}
  centerComponent={{ text: route.params.title, style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}
  rightComponent={<Pressable style={[styles.button, styles.buttonOpen]} 
  onPress={() => navigation.goBack()}> 
  <Text style={styles.textStyle}>back</Text>
  </Pressable>}
/>
      <Text style={styles.h2}>Date Created Here</Text>
      <Text style={styles.paragraph}>Description Here </Text>
      <Text style={styles.paragraph}>Contents Here</Text>
      <Image style={styles.smallIcon} source={require('../assets/chest.png')} />
      {/* <EditTreasureModal /> */}
      {/* <ShareTreasureModal /> */}
        {/* <Pressable style={[styles.button, styles.buttonOpen]} 
        onPress={() => navigation.navigate('VaultsNav',{screen:'Swipe'})}> 
        <Text style={styles.textStyle}>SwipeList</Text>
        </Pressable> */}
    </View>
  );
}