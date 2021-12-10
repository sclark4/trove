import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import {styles} from '../style/styles';
import AddTreasureModal from '../components/AddTreasureModal';
import Treasure from '../components/Treasure';
import { NavigationActions } from 'react-navigation';
import { Card, Icon, Header } from 'react-native-elements';

// export default function TreasuresScreen({navigation, route}) {
export default function TreasuresScreen(screenProps) {
  console.log("hi!",JSON.stringify(screenProps, null, 2), '0');
  console.log(screenProps, 'pls')
  function Screen(props){
    
  const TagItem = item => {
    return (<Text style={{color:'#a5c6ff'}}>#{item.text} </Text>)
  }

  const CardItem = item => {
    return (
    <TouchableOpacity
    // onPress={() => navigation.navigate('TreasuresNav', { screen: 'Treasure', params: { title: 'Oh Happy Day!' }})}
    onPress={() => screenProps.navigation.navigate('TreasuresNav', { screen: 'Treasure', params: {treasure: item.text.item}})}>
{/* > */}
      
    <Card containerStyle={styles.treasureCard}>
  <Card.Title style={{margin: 10}}>{item.text.item.title}</Card.Title>
  {/* <Card.Divider/> */}
  <Card.Image style={styles.treasureThumbnail} source={{uri:('https://cdn.pixabay.com/photo/2021/01/21/16/17/english-cocker-spaniel-5937757_1280.jpg')}}>
  </Card.Image>
  <Text style={{margin: 10}}>
    {item.text.item.description} <Text> {item.text.item.tags.map(tag => <TagItem text = {tag}/>)} </Text>
      {/* Super cute picture of a dog I found on the internet <Text style={{color:'blue'}}>#dog </Text> */}
    </Text>
    
    {/* <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='VIEW NOW' /> */}
</Card>
</TouchableOpacity>)
  }
  return (
    <View>
        <Header
      backgroundColor='#fff'
      leftComponent={<AddTreasureModal add={screenProps.route.params.addTreasure}/>}
  // leftComponent={{ icon: 'menu', color: '#BEBEBE', iconStyle: { color: '#BEBEBE' } }}
  centerComponent={{ text: 'Treasures', style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}
  rightComponent={{ icon: 'home', color: '#BEBEBE' }}/>
    <View style={styles.container}>
      <View style={styles.listWrapper}>
      {/* <Text>hi{JSON.stringify(props, null, 2)}</Text> */}
      {/* <Text>{JSON.stringify(screenProps.route.params.treasures, null, 2)}</Text> */}
          <FlatList showsVerticalScrollIndicator={false}
          style={styles.list}
            data={screenProps.route.params.treasures}
            renderItem={ datum => <CardItem id={datum.id} text={datum} title={datum.title} description={datum.description} tags={datum.tags}></CardItem>} 
            keyExtractor={id => id} />
        </View>
        </View>
    </View>
  );
}
return (Screen);
}