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

export default function EditVaultModal(props) {
    const [title, setTitle] = React.useState(props.vault.title);
    const [modalVisible, setModalVisible] = useState(false);

    const updatedItem = {'user': props.vault.user,                         
    'title': title,
    'id': props.vault.id
   };

    const updateAndClose = () => {
      if (title == null){
        alert('Please add a title to your vault')
      } else {
        props.update(updatedItem);
        setModalVisible(!modalVisible);
        alert("Successfully updated vault")
      }
    };

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Delete Vault?",
      "Are you sure you want to delete this vault? This action is permanent and cannot be undone.",
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
        <Text style={styles.textStyle}>Edit Vault</Text>
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
            <Text style={styles.modalText}>Title:</Text>
            <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
      />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={updateAndClose}>
              <Text style={styles.textStyle}>Update Vault</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={createTwoButtonAlert}>
              <Text style={styles.textStyle}>Delete Vault</Text>
            </Pressable>
          </View>
          </DismissKeyboard>
        </View>
      </Modal>
    </View>
  );
};