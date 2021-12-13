import React, { useState, useEffect } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Card, ListItem, Icon, Header } from 'react-native-elements'
import {styles} from '../style/styles';
import EditTreasureModal from './EditTreasureModal';
import ShareTreasureModal from './ShareTreasureModal';
import AddToVaultModal from './AddToVault';

export default function Treasure(props) {
  const deleteAndExit = () => {
    // setModalVisible(!modalVisible);
    props.route.params.delete();
    props.navigation.goBack()
  };
  return (
    <View style={styles.container}>
      <Header
      backgroundColor='#fff'
      leftComponent={
        <Pressable style={[styles.headerButton, styles.buttonOpen, {padding:6}]} 
        onPress={() => props.navigation.goBack()}> 
          <Icon name='arrow-left' color='#ffffff' type='font-awesome' size='20' />
        </Pressable>}
      centerComponent={{ text: props.route.params.treasure.title, style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}
      rightComponent={<AddToVaultModal treasure={props.route.params.treasure}/>}
      />
      {/* <Text style={styles.h1}>{route.params.title}</Text> */}
      <Image
            style={styles.regularTreasure}
            // source={require('../assets/diamond.png')}
            source={{uri:('https://cdn.pixabay.com/photo/2021/01/21/16/17/english-cocker-spaniel-5937757_1280.jpg')}}
          />
      <Text style={styles.h2}>Date: {props.route.params.treasure.date.toString()}</Text>
      <Text style={styles.paragraph}>Description: {props.route.params.treasure.description}</Text>
      <Text style={styles.paragraph}>Location: Science Center</Text>
      <Text style={styles.paragraph, styles.tag}>{props.route.params.treasure.tags.map(tag => '#'+tag+' ')} </Text>
      
      <EditTreasureModal treasure={props.route.params.treasure} delete = {deleteAndExit}/>
      <ShareTreasureModal treasure={props.route.params.treasure}/>
      
      
    </View>
  );
}