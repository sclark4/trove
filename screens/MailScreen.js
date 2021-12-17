import React, { useState, useContext } from "react";
import StateContext from '../StateContext';
import { Alert, Text, View, Image, Button, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Icon, Header } from 'react-native-elements'
import {styles} from '../style/styles';

export default function MailScreen(props) {
  const screenProps = useContext(StateContext);
  const treasures = screenProps.treasuresProps.treasures;
  const dateSortedMail = [...screenProps.mailProps.mail].sort((a, b) => (new Date(b.date)-new Date(a.date)));

  const ListItem = mail => { 
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('MailNav', { screen: 'mailItem', params: {mail: mail.text.item, treasures: treasures}})}>
        <View style={styles.mailItem}>
          <Image
            style={styles.smallImage}
            source={require('../assets/icon.png')}
          />
          {/* <Text style={styles.paragraph}>Treasure Title: {((treasures.find(treasure => treasure.id !== mail.text.item.tid)).title)}</Text> */}
          {/* Buggy, treasure.id == mail.text.item.tid returns null for whatever reason  */}
          <Text style={styles.paragraph}>From {mail.text.item.sender}: "{mail.text.item.note}"</Text>
          <Text style={styles.paragraph}>Sent: {mail.text.item.date}</Text>
          <View style={styles.container}>
          {(mail.text.item.accepted)?<Icon size={20} name='check' type='font-awesome' color='#BEBEBE' />:<AcceptButtons item={mail.text.item}/>}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const AcceptButtons = (item) => { 
    //ALSO need functionality to add to treasure trove
    return (
      <View>
        <Text style={{textAlign: 'center'}}>
      <Pressable onPress={() => acceptAlert(item.item)}>
        <Icon name='check' reverse size={20} type='font-awesome' color='#a5c6ff' />
        </Pressable>
        <Pressable onPress={() => denyAlert(item.item.id)}>
        <Icon name='ban' reverse size={20} type='font-awesome' color='#f26b5b' />
        </Pressable>
        </Text>
      </View>
    );
  }
  // const acceptedMail = (mailItem) =>

  // return (
  // {'sender': mailItem.sender, 'note': mailItem.note, 'accepted':true, 'date':mailItem.date, 'tid':mailItem.tid, 'id':mailItem.id, 'receiver':mailItem.receiver,},
  //   );
  const denyAlert = (id) => 
  Alert.alert(
    "Deny Treasure?",
    "Are you sure you want to deny this treasure? This action is permanent and cannot be undone. The sender will not be notified if you deny their treasure.",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "Deny", onPress: () => screenProps.mailProps.rejectMail(id)}
    ]
  );

  const acceptAlert = (mailItem) =>
  Alert.alert(
    "Accept Treasure?",
    "Are you sure you want to acceot this treasure? This will add the treasure to your personal vault. The sender will not be notified if you accept their treasure.",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "Accept", onPress: () => screenProps.mailProps.acceptMail({'sender': mailItem.sender, 'note': mailItem.note, 'accepted':true, 'date':mailItem.date, 'tid':mailItem.tid, 'id':mailItem.id, 'receiver':mailItem.receiver})}
    ]
  );
  return (
    <View>
      <Header
      backgroundColor='#fff'
      centerComponent={{ text: 'Mail', style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}
      />
      <View style={styles.listWrapper}>
          <FlatList showsVerticalScrollIndicator={false}
            data={dateSortedMail}
            renderItem={ datum => <ListItem text={datum}></ListItem>} 
            keyExtractor={item => item.id} 
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