import React, { useState, useContext } from "react";
import StateContext from '../StateContext';
import { Text, View, Image, Button, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Icon, Header } from 'react-native-elements'
import {styles} from '../style/styles';

export default function MailScreen(props) {
  const screenProps = useContext(StateContext);
  const [selectedMail, setSelectedMail] = useState('question');
  const ListItem = mail => { 
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('MailNav', { screen: 'mailItem', params: {mail: mail.text.item}})}>
        <View style={styles.mailItem}>
          <Image
            style={styles.smallImage}
            source={require('../assets/icon.png')}
          />
          <Text style={styles.paragraph}>Treasure Title: Oh Happy Day!</Text>
          <Text style={styles.paragraph}>From {mail.text.item.name}: "{mail.text.item.note}"</Text>
          <Text style={styles.paragraph}>Received:{mail.text.item.date}</Text>
          <View style={styles.container}>
          {(mail.text.item.accepted)?<AcceptButtons/>:<Icon size='20' name='check' type='font-awesome' color='#BEBEBE' />}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const AcceptButtons = () => { 
    return (
      <View>
        <Text style={{textAlign: 'center'}}>
      <Pressable onPress={screenProps.mailProps.acceptMail}>
        <Icon name='check' reverse size='20' type='font-awesome' color='#a5c6ff' />
        </Pressable>
        <Pressable onPress={screenProps.mailProps.rejectMail}>
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
            data={screenProps.mailProps.mail}
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