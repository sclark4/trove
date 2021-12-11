import React, { useState, useEffect } from "react";
import { Alert, Button, Modal, StyleSheet, Text, Pressable, View, TextInput, Keyboard,  TouchableWithoutFeedback, Image } from "react-native";
import { Card, ListItem, Icon, Header } from 'react-native-elements'
import {styles} from '../style/styles';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
    );

export default function AddToVaultModal(props) {
  // const [title, onChangeTitle] = React.useState(props.treasure.title);
    const [vault, setVault] = React.useState("Senior Year");
    const [note, setNote] = React.useState("Senior Year");
    const [modalVisible, setModalVisible] = useState(false);

  return (
    
    <View style={styles.centeredView}>
        <Pressable
        style={[styles.headerButton, styles.buttonOpen]}
        onPress={() => alert("To Be Implemented")}
      >
        <Icon name='add' color='#ffffff' />
      </Pressable>
      
      {/* <Modal
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
            <Text style={styles.modalText}>Treasure to Add:</Text>
            <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
      />
            <Text style={styles.modalText}>Vault:</Text>
            <TextInput
        style={styles.input}
        onChangeText={setVault}
        value={vault}
      />
            <Text style={styles.modalText}>Note</Text>
            <TextInput
        style={styles.input}
        onChangeText={setNote}
        value={note}
        multiline={true}
      />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Add to {vault}</Text>
            </Pressable>
          </View>
          </DismissKeyboard>
        </View>
      </Modal> */}
    </View>
    
  );
};