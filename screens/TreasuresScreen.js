import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import {styles} from '../style/styles';
import AddTreasureModal from '../components/AddTreasureModal';
import Treasure from '../components/Treasure';
import { NavigationActions } from 'react-navigation';
import { Card, Icon, Header } from 'react-native-elements'
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

export default function TreasuresScreen({navigation, route}) {
  const [selectedMail, setSelectedMail] = useState(null);
  // const ListItem = props => { 
  //   return (
  //     <TouchableOpacity
  //       onPress={() => navigation.navigate('TreasuresNav', 
  //       { screen: 'Treasure', params: { title: 'Oh Happy Day!!!' }})}
  //     >
  //       <View style={styles.listItem}>
  //         {/* <Image
  //           style={styles.smallImage}
  //           source={{uri: 'https://cs.wellesley.edu/~cs/ai2workshop/animals/'
  //                        + props.text + '.jpg'}}
  //         /> */}
  //         <Image
  //           style={styles.smallIcon}
  //           source={require('../assets/diamond.png')}
  //         />
  //         <Text style={styles.listItemText}>{props.text}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // }

  const CardItem = props => {
    return (
    <TouchableOpacity
    // onPress={() => navigation.navigate('TreasuresNav', { screen: 'Treasure', params: { title: 'Oh Happy Day!' }})}
    onPress={() => navigation.navigate('TreasuresNav', { screen: 'Treasure'})}>
{/* > */}
      
    <Card containerStyle={styles.treasureCard}>
  <Card.Title style={{margin: 10}}>{props.text}</Card.Title>
  {/* <Card.Divider/> */}
  <Card.Image style={styles.treasureThumbnail} source={{uri:('https://cdn.pixabay.com/photo/2021/01/21/16/17/english-cocker-spaniel-5937757_1280.jpg')}}>
  </Card.Image>
  <Text style={{margin: 10}}>
    {props.description} <Text style={{color:'blue'}}>#{props.tags} </Text>
      {/* Super cute picture of a dog I found on the internet <Text style={{color:'blue'}}>#dog </Text> */}
    </Text>
    {/* <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      title='VIEW NOW' /> */}
</Card>
</TouchableOpacity>)
  }
  console.log("route:",route,"!!!");
  return (
    <View>
      <Header
      backgroundColor='#fff'
      // leftComponent={<Button title='Add'></Button>}
  leftComponent={{ icon: 'menu', color: '#BEBEBE', iconStyle: { color: '#BEBEBE' } }}
  centerComponent={{ text: 'Treasures', style: { color: '#00CCFF' } }}
  rightComponent={{ icon: 'home', color: '#BEBEBE' }}
/>
    <View style={styles.container}>
      
      {/* <AddTreasureModal /> */}
      <View style={styles.listWrapper}>
        <Text>{route.params}</Text>
          <FlatList showsVerticalScrollIndicator={false}
          style={styles.list}
            data={animals}
            renderItem={ datum => <CardItem text={datum.title}></CardItem>} 
            keyExtractor={item => item} 
          />
        </View>
        </View>
    </View>

  );
}