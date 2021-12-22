import React, { useState, useEffect, useCallback } from "react";
import {Text, View, Image, Linking, Button, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Card, ListItem, Icon, Header } from 'react-native-elements'
import {styles} from '../style/styles';
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
  
  const treasure = props.route.params.treasures.find(treasure => treasure.id == props.route.params.mail.tid)
const TagItem = item => {
    return (<Text style={{fontFamily:'Karla_Regular'}, styles.tag}>#{item.text} </Text>)
  }
  const CardItem = item => {
    return (
      <View style={styles.treasureContainer}>
      <Card containerStyle={styles.treasureCard}>
      <Card.Title style={{margin: 10, fontFamily:'Grandstander_Bold'}}>{item.text.title}</Card.Title>
      {(item.text.image)?
      <Card.Image style={styles.treasureThumbnail} 
      // source={(item.text.item.image != "")?{uri:item.text.item.image}:{uri:('https://cdn.pixabay.com/photo/2021/01/21/16/17/english-cocker-spaniel-5937757_1280.jpg')}}>
      source={{uri:(item.text.image)}}>
      </Card.Image>
      :<></>}
      {(item.text.link) ? 
      <OpenURLButton url={item.text.link}>{item.text.link}</OpenURLButton>
        :<></>
      }
      <Text style={{margin: 10, fontFamily:'Karla_Regular'}}>
        {item.text.description}
        {/* <Text> {item.text.tags.map(tag => <TagItem text = {tag}/>)} </Text> */}
        </Text>
  </Card>
</View>)
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
      centerComponent={{ text: 'from '+ props.route.params.mail.sender, style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900', fontFamily:'Grandstander_Bold' } }}
      />
      <CardItem text={treasure} ></CardItem>
      <Text style={styles.h2, {fontFamily:'Karla_Regular'}}>Date Sent: {props.route.params.mail.date.toString()}</Text>
      <Text style={styles.paragraph, {fontFamily:'Karla_Regular'}}>Status: {props.route.params.mail.accepted?'Accepted':'Not Accepted'}</Text>
    </View>
  );
}