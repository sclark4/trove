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

const testTreasures = 
[
 {'user': 'finz@gmail.com',
  'date': "12/05/2021",
  'title': 'Taza Chocolate',
  'tags': ['Food', 'chocolate'],
  'description': 'Want to join me for a Taza Chocolate tour next weekend?'
 },
 {'user': 'aardvark@gmail.com',                         
  'date': new Date(2021, 10, 29, 13, 12, 46, 1234), 
  'title': 'Taza Chocolate 2',
  'tags': ['Food', 'chocolate'], 
  'description': "I'm up for the chocolate tour!"
 }, 
 {'user': 'emerm@yahoo.com',                    
  'date': new Date(2021, 10, 29, 17, 33, 52, 1234), 
  'title': 'friday night',
  'tags': ['gatherings', 'friday'], 
  'description': 'Anyone want to play whist on Friday night?', 
 }, 
 {'user': 'ccameronk@gmail.com',                        
  'date': new Date(2021, 10, 30, 8, 7, 24, 1234), 
  'title': 'Chocolate',
  'tags': ['food', 'chocolate'],
  'description': '+1 for Taza'
 }, 
 {'user': 'flyer@gmail.com',                        
  'date': new Date(2021, 11, 1, 20, 9, 37, 1234), 
  'title': 'blue hills hiking',
  'tags': ['hiking', 'outdoors'],
  'description': "I know it's cold, but it's still a great time for a Blue Hills hike. Anyone want to join me on Sunday morning?"
 }, 
 {'user': 'emerm@yahoo.com',                    
  'date': new Date(2021, 11, 1, 20, 10, 14, 1234), 
  'title': 'forest nuts', 
  'tags': ['foraging', 'outdoors'],
  'description': 'Late fall is a great time to go foraging for forest nuts. Who wants to act like a squirrel with me?'
 }, 
 {'user': 'aa108@wellesley.edu',                         
  'date': new Date(2021, 11, 2, 9, 47, 18, 1234), 
  'title': 'thanksgiving', 
  'tags': ['food', 'pumpkin'],
  'description': "Thanksgiving may be over, but there are still so many pumpkin recipes to explore! I'll be making a pumpkin-based feast this weekend. Join me!"
 },
 {'user': 'ggecko@wellesley.edu',                         
  'date': new Date(2021, 11, 2, 10, 52, 31, 1234), 
  'title': 'pumpkin pie',
  'tags': ['food', 'pumpkin'], 
  'description': "I *love* pumpkin. Count me in!!!"
 },

];

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

  const TagItem = props => {
    return (<Text style={{color:'tomato'}}>#{props.text} </Text>)
  }

  const CardItem = props => {
    return (
    <TouchableOpacity
    // onPress={() => navigation.navigate('TreasuresNav', { screen: 'Treasure', params: { title: 'Oh Happy Day!' }})}
    onPress={() => navigation.navigate('TreasuresNav', { screen: 'Treasure', params: {treasure: props.text.item}})}>
{/* > */}
      
    <Card containerStyle={styles.treasureCard}>
  <Card.Title style={{margin: 10}}>{props.text.item.title}</Card.Title>
  {/* <Card.Divider/> */}
  <Card.Image style={styles.treasureThumbnail} source={{uri:('https://cdn.pixabay.com/photo/2021/01/21/16/17/english-cocker-spaniel-5937757_1280.jpg')}}>
  </Card.Image>
  <Text style={{margin: 10}}>
    {props.text.item.description} <Text> {props.text.item.tags.map(tag => <TagItem text = {tag}/>)} </Text>
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
      leftComponent={<AddTreasureModal />}
  // leftComponent={{ icon: 'menu', color: '#BEBEBE', iconStyle: { color: '#BEBEBE' } }}
  centerComponent={{ text: 'Treasures', style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}
  rightComponent={{ icon: 'home', color: '#BEBEBE' }}
/>
    <View style={styles.container}>
      
      <AddTreasureModal />
      <View style={styles.listWrapper}>
        {/* <Text>{route.params}</Text> */}
        <Text>Hi</Text>

          <FlatList showsVerticalScrollIndicator={false}
          style={styles.list}
            data={testTreasures}
            renderItem={ datum => <CardItem text={datum} title={datum.title} description={datum.description} tags={datum.tags}></CardItem>} 
            keyExtractor={item => item} 
          />
        </View>
        </View>
    </View>

  );
}