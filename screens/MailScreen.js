import React, { useState, useEffect } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Card, ListItem, Icon, Header } from 'react-native-elements'
import {styles} from '../style/styles';

const animals = 
[
  {'name': 'Abigail', 'note': 'Here you go!', 'accepted':false, 'date':'12/08/2021', 'tid':'1'},
  {'name': 'Bethany', 'note': 'For you!', 'accepted':true, 'date':'12/08/2021', 'tid':'2'},
  {'name': 'Catherine', 'note': 'I miss you friend!', 'accepted':false, 'date':'12/08/2021', 'tid':'3'},
  {'name': 'Deborah', 'note': 'What a great day', 'accepted':true, 'date':'12/08/2021', 'tid':'4'},
  {'name': 'Elizabeth', 'note': 'This one is just for you', 'accepted':false, 'date':'12/08/2021', 'tid':'5'},
  {'name': 'Frances', 'note': 'Here you go!', 'accepted':false, 'date':'12/08/2021', 'tid':'6'},
  {'name': 'Georgia', 'note': 'Happy memories from last summer', 'accepted':true, 'date':'12/08/2021', 'tid':'7'},
  {'name': 'Harriet', 'note': 'one of my favorite moments with you', 'accepted':true, 'date':'12/08/2021', 'tid':'8'}
];


export default function MailScreen({navigation}) {
  const [selectedMail, setSelectedMail] = useState('question');
  const ListItem = props => { 
    return (
      <TouchableOpacity
        onPress={() => setSelectedMail(props.text.item.title)}
      >
        <View style={styles.mailItem}>
          <Image
            style={styles.smallImage}
            source={{uri: 'https://cs.wellesley.edu/~cs/ai2workshop/animals/anole.jpg'}}
          />
          <Text style={styles.paragraph}>{props.text.item.name}</Text>
          <Text style={styles.paragraph}>{props.text.item.note}</Text>
          <Text style={styles.paragraph}>{props.text.item.date}</Text>

          {(props.text.item.accepted)?<AcceptButtons/>:<Icon size={50} name='check-circle-o' type='font-awesome' color='pink' />}
        </View>
      </TouchableOpacity>
    );
  }

  const AcceptButtons = () => { 
    return (
      <View>
      <Pressable onPress={() => alert("accept mail to be implemented")}>
        <Icon size={50} name='check' type='font-awesome' color='green' />
        </Pressable>
        <Pressable onPress={() => alert("are you sure you want to reject this mail? doing so will delete the message.")}>
        <Icon size={50} name='ban' type='font-awesome' color='red' />
        </Pressable>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
      backgroundColor='#fff'
  leftComponent={{ icon: 'menu', color: '#BEBEBE', iconStyle: { color: '#BEBEBE' } }}
  centerComponent={{ text: 'Mail', style: { color: '#00CCFF' } }}
  rightComponent={{ icon: 'home', color: '#BEBEBE' }}
/>
      <View style={styles.listWrapper}>
          <FlatList showsVerticalScrollIndicator={false}
          style={styles.list}
            data={animals}
            renderItem={ datum => <ListItem text={datum}></ListItem>} 
            keyExtractor={item => item.tid} 
          />
        </View>
      <Button
      title="Send a Treasure"
      onPress={() =>
        navigation.navigate('Treasures')
      }
    />
    </View>
  );
}