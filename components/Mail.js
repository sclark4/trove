import React, { useState, useEffect, useCallback } from "react";
import {Text, View, Image, Linking, Button, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Card, ListItem, Icon, Header } from 'react-native-elements'
import {styles} from '../style/styles';
import EditTreasureModal from './EditTreasureModal';
import ShareTreasureModal from './ShareTreasureModal';
import AddToVaultModal from './AddToVault';
import {useFonts} from 'expo-font';

const supportedURL = "https://cs.wellesley.edu/~cs317/";

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


export default function Mail(props) {

  const [loaded] = useFonts({
    Karla_Regular: require('../assets/fonts/Karla-Regular.ttf'),
    Karla_ExtraLight: require('../assets/fonts/Karla-ExtraLight.ttf'),
    Grandstander_Bold: require('../assets/fonts/Grandstander-Bold.ttf'),
    Grandstander_Medium: require('../assets/fonts/Grandstander-Medium.ttf'),
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
          <Icon name='arrow-left' color='#ffffff' type='font-awesome' size='20' />
        </Pressable>}
      centerComponent={{ text: props.route.params.mail.tid, style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900', fontFamily:'Grandstander_Bold' } }}
    //   rightComponent={<AddToVaultModal treasure={props.route.params.mail}/>}
      />
      {/* <Text style={styles.h1}>{route.params.title}</Text> */}
      <Image
            style={styles.regularTreasure}
            // source={require('../assets/diamond.png')}
            source={{uri:('https://cdn.pixabay.com/photo/2021/01/21/16/17/english-cocker-spaniel-5937757_1280.jpg')}}
          />
      <Text style={styles.h2, {fontFamily:'Karla_Regular'}}>Date Received: {props.route.params.mail.date.toString()}</Text>
      <Text style={styles.paragraph, {fontFamily:'Karla_Regular'}}>From: {props.route.params.mail.name}: "{props.route.params.mail.note}"</Text>
      <Text style={styles.paragraph, {fontFamily:'Karla_Regular'}}>Display rest of treasure here</Text>
    </View>
  );
}