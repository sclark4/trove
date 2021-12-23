import React, { useState, useEffect, useContext } from "react";
import { Alert, Button, Modal, Text, Pressable, View, TextInput, Keyboard,  TouchableWithoutFeedback, Image } from "react-native";
import {styles} from '../style/styles';
import { Icon } from 'react-native-elements';
import StateContext from '../StateContext';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
    );

export default function AddVaultModal(props) {
    const stateProps = useContext(StateContext);
    const firebaseProps = stateProps.firebaseProps;
    const storage = firebaseProps.storage;
    const [title, setTitle] = React.useState();

    const vaultProps = stateProps.vaultProps;
    const existingTitles = vaultProps.vaults.map(vault => vault.title);
    // console.log(existingTitles);
    
    const newItem = {'user': props.currentUser,                         
        'title': title,
        'id': Date.now(),
        'treasures': []
   };

    const [modalVisible, setModalVisible] = useState(false);

    const addAndClose = () => {
      if (title == null){
        alert('Please add a title to your vault')
      } else if (existingTitles.includes(title)) {
        alert('This vault title already exists. Try a different title')
      } else {
        props.add(newItem);
        setModalVisible(!modalVisible);
        setTitle(null);
      }
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
              multiline={true}
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