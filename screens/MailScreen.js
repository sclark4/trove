import React, { useState } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Icon, Header } from 'react-native-elements'
import {styles} from '../style/styles';

const mailData = 
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
            source={require('../assets/icon.png')}
          />
          <Text>
          <Text style={styles.paragraph}>From {props.text.item.name}: </Text>
          <Text style={styles.paragraph}>"{props.text.item.note}"</Text>
          </Text>
          <Text style={styles.paragraph}>Received:{props.text.item.date}</Text>
          <View style={styles.container}>
          {(props.text.item.accepted)?<AcceptButtons/>:<Icon size='20' name='check' type='font-awesome' color='#BEBEBE' />}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const AcceptButtons = () => { 
    return (
      <View>
        <Text style={{textAlign: 'center'}}>
      <Pressable onPress={() => alert("accept mail to be implemented")}>
        <Icon name='check' reverse size='20' type='font-awesome' color='#a5c6ff' />
        </Pressable>
        <Pressable onPress={() => alert("are you sure you want to reject this mail? doing so will delete the message.")}>
        <Icon name='ban' reverse size='20' type='font-awesome' color='#f26b5b' />
        </Pressable>
        </Text>
        </View>
    );
  }

  return (
    <View>
      <Header
      backgroundColor='#fff'
      centerComponent={{ text: 'Mail', style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}
      />
      <View style={styles.listWrapper}>
          <FlatList showsVerticalScrollIndicator={false}
            data={mailData}
            renderItem={ datum => <ListItem text={datum}></ListItem>} 
            keyExtractor={item => item.tid} 
          />
        </View>
      <Button
      title="Send a Treasure"
      onPress={() =>
        navigation.navigate('Treasures')}
    />
    </View>
  );
}