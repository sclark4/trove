import React, { useState, useEffect } from "react";
import { Alert, Button, Modal, StyleSheet, Text, Pressable, View, TextInput, Keyboard,  TouchableWithoutFeedback, Image } from "react-native";
import { Icon } from 'react-native-elements';
import {styles} from '../style/styles';
const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
    );

export default function ShareTreasureModal(props) {
  // const [title, onChangeTitle] = React.useState(props.treasure.title);
    const [receiver, setReceiver] = React.useState();
    const [note, setNote] = React.useState();
    const [modalVisible, setModalVisible] = useState(false);
    const currentDate = (new Date()).toDateString();
    const currentUser = props.currentUser;
    const [id, setId] =  React.useState(9);

    const newMail = {'receiver': receiver, 
    'sender': currentUser,                     
    'date': currentDate,
    'note': note,
    'tid': props.treasure.id,
    'id': Date.now(),
    'accepted': false,
   };

   const shareAndClose = () => {
    if (receiver == null){
      alert('Please add a receipient to your mail')
    }
    else if (note == null){
      alert('Please add a note to your mail')
    }
    else {props.share(newMail);
    setModalVisible(!modalVisible);

    }
    setId(id+1);
  };

  return (
    
    <View style={styles.centeredView}>
        <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Send Treasure</Text>
      </Pressable>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        
        <View style={styles.centeredView}>
        <DismissKeyboard>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(false)}>
                <Icon name='times-circle' type='font-awesome' color='#ff7fad' size={30} />
            </Pressable>
            <Text style={styles.modalText}>Treasure to Send: {props.treasure.title}</Text>
            <Text style={styles.modalText}>Send to:</Text>
            <TextInput
        style={styles.input}
        onChangeText={setReceiver}
        autoCompleteType = 'email'
        keyboardType='email-address'
        textContentType='emailAddress'
        placeholder="✉️ | Email of recipient"
        multiline={true}
      />
            <Text style={styles.modalText}>Note:</Text>
            <TextInput
        style={styles.input}
        onChangeText={setNote}
        placeholder='Write a brief note'
        multiline={true}
      />
            <Pressable
              style={[styles.button, styles.buttonClose]}
    onPress={shareAndClose}>
              <Text style={styles.textStyle}>Send Treasure</Text>
            </Pressable>
          </View>
          </DismissKeyboard>
        </View>
      </Modal>
    </View>
    
  );
};