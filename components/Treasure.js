import React, { useState, useEffect, useCallback } from "react";
import {Text, View, Image, Linking, Button, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Card, ListItem, Icon, Header } from 'react-native-elements'
import {styles} from '../style/styles';
import EditTreasureModal from './EditTreasureModal';
import ShareTreasureModal from './ShareTreasureModal';
import AddToVaultModal from './AddToVaultModal';
import {useFonts} from 'expo-font';

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      alert(`Sorry, we are unable to open: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};


export default function Treasure(props) {
  const deleteAndExit = () => {
    props.route.params.delete(props.route.params.treasure.id);
    props.navigation.goBack()
  };
  const updateAndExit = (updated) => {
    props.route.params.update(updated);
    props.navigation.goBack()
  };
  const shareAndExit = (newMail) => {
    props.route.params.share(newMail);
    alert("Treasure successfully sent to: " + newMail.receiver);
  };
  const addAndExit = (updatedVault) => {
    props.route.params.add(updatedVault);
    alert("Treasure successfully sent to: " + updatedVault.title);
  };

  const [loaded] = useFonts({
    Karla_Regular: require('../assets/fonts/Karla-Regular.ttf'),
    Karla_ExtraLight: require('../assets/fonts/Karla-ExtraLight.ttf'),
    Rubik1: require('../assets/fonts/Rubik-ExtraBold.ttf'),
    Rubik2: require('../assets/fonts/Rubik-Medium.ttf'),
  });
  
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Header
      backgroundColor='#fff'
      leftComponent={
        <Pressable style={[styles.headerButton, styles.buttonOpen, {padding:6}]} 
        onPress={() => props.navigation.goBack()}> 
          <Icon name='arrow-left' color='#ffffff' type='font-awesome' size={20} />
        </Pressable>}
      centerComponent={{ text: props.route.params.treasure.title, style: { color: '#a5c6ff', fontSize: 15, fontWeight:'900', fontFamily:'Rubik1' } }}
      />
      {(props.route.params.treasure.image) ?<Image
            style={styles.regularTreasure}
            source={{uri:(props.route.params.treasure.image)}}
          /> :<></>}
      <Text style={styles.h2, {fontFamily:'Karla_Regular'}}>Author: {props.route.params.treasure.author}</Text>
      <Text style={styles.h2, {fontFamily:'Karla_Regular'}}>Date: {props.route.params.treasure.date}</Text>
      <Text style={styles.paragraph, {fontFamily:'Karla_Regular'}}>Description: {props.route.params.treasure.description}</Text>
      {/* <Text style={styles.paragraph, {fontFamily:'Karla_Regular'}, styles.tag}>{props.route.params.treasure.tags.map(tag => '#'+tag+' ')} </Text> */}
      {(props.route.params.treasure.link) ? 
      <OpenURLButton url={props.route.params.treasure.link}>{props.route.params.treasure.link}</OpenURLButton>
        :<></>
      }
      
      <EditTreasureModal treasure={props.route.params.treasure} id ={props.route.params.treasure.id} delete = {deleteAndExit} update = {updateAndExit}/>
      <ShareTreasureModal treasure={props.route.params.treasure} currentUser={props.route.params.currentUser} share = {shareAndExit}/>
      <AddToVaultModal treasure={props.route.params.treasure} id ={props.route.params.treasure.id} add = {addAndExit}/>
    </View>
  );
}