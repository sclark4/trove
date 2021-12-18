import React, { useState, useEffect } from "react";
import { Alert, Button, Modal,Text, Pressable, View, TextInput, Keyboard,  TouchableWithoutFeedback, Image } from "react-native";
import { Icon } from 'react-native-elements';
import {styles} from '../style/styles';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
    );

export default function EditSettingsModal(props) {
    const [username, setUsername] = React.useState(props.account.username);
    const [birthday, setBirthday] = React.useState(props.account.birthday);

    const [modalVisible, setModalVisible] = useState(false);

    const updatedItem = {
      'username': username,                       
      'id': props.account.id,
      'password': props.account.password,
      'birthday': birthday
    };

    const updateAndClose = () => {
      if (username == null){
        alert('Please add a username to your account')
      } else if (birthday == null){
        alert('Please add a birthday to your account')
      } else {
        props.update(updatedItem);
        setModalVisible(!modalVisible);
        alert("Successfully updated account")
      }
    };

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Delete Account?",
      "Are you sure you want to delete this account? This action is permanent and cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: setModalVisible(!modalVisible),
          style: "cancel"
        },
        { text: "Delete", onPress: () => {setModalVisible(!modalVisible); props.delete()}}
      ]
    );

  return (
    
    <View style={styles.centeredView}>
        <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Edit Account</Text>
      </Pressable>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        
        <View style={styles.centeredView}>
        <DismissKeyboard>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(false)}>
                <Icon name='times-circle' type='font-awesome' color='#ff7fad' size={30} />
            </Pressable>
            <Text style={styles.modalText}>Username:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
            />
            <Text style={styles.modalText}>Birthday:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setBirthday}
              value={birthday}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={updateAndClose}>
              <Text style={styles.textStyle}>Update Account</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={createTwoButtonAlert}>
              <Text style={styles.textStyle}>Delete Account</Text>
            </Pressable>
          </View>
          </DismissKeyboard>
        </View>
      </Modal>
    </View>
  );
};