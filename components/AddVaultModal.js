import React, { useState, useEffect } from "react";
import { Alert, Button, Modal, Text, Pressable, View, TextInput, Keyboard,  TouchableWithoutFeedback, Image } from "react-native";
import {styles} from '../style/styles';
import { Icon } from 'react-native-elements';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
    );

export default function AddVaultModal(props) {
    const nextId = 20
    const [title, setTitle] = React.useState();
    const [id, setId] = useState(nextId)
    
    const newItem = {'user': props.currentUser,                         
    'title': title,
    'id': id,
   };

    const [modalVisible, setModalVisible] = useState(false);
    
    const onChangeTitle = (event, title) => {
      setTitle(title);
    };

    const addAndClose = () => {
      if (title == null){
        alert('Please add a title to your vault')
      } else {props.add(newItem);
      setModalVisible(!modalVisible);
      }
      setId(id+1);
    };

  return (
    <View style={styles.centeredView}>
        <Pressable
        style={[styles.headerButton, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Icon name='add' color='#ffffff' />
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
        
        <View>
        <DismissKeyboard>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(false)}>
                <Icon name='times-circle' type='font-awesome' color='#ff7fad' size={30} />
            </Pressable>
      
      <View style={{alignItems:'center'}}>
            <Text style={styles.modalText}>Title:</Text>
            <TextInput
        required
        style={styles.input}
        placeholder="Vault Title"
        onChangeText={setTitle}
      />
         
      <View style={{flexDirection: 'row'}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={addAndClose}
            >
              <Text style={styles.textStyle}>Add Vault</Text>
            </Pressable>
      </View>
          </View>
          </View>
          </DismissKeyboard>
        </View>
        
      </Modal>
      
    </View>
    
  );
};