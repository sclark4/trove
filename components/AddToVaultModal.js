import React, { useState, useContext } from "react";
import { Alert, Button, Modal, StyleSheet, Text, Pressable, View, TextInput, Keyboard,  TouchableWithoutFeedback, Image } from "react-native";
import { Card, ListItem, Icon, Header } from 'react-native-elements'
import {styles} from '../style/styles';
import SelectDropdown from 'react-native-select-dropdown'
import StateContext from '../StateContext';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
    );

export default function AddToVaultModal(props) {
    const Props = useContext(StateContext);
    const vaultProps = Props.vaultProps;
    const [vault, setVault] = React.useState("Senior Year");
    const [note, setNote] = React.useState("Senior Year");
    const [modalVisible, setModalVisible] = useState(false);
    const vaults = ["Egypt", "Canada", "Australia", "Ireland"]
    const sendAndClose = () => {
      if (vault == null){
        alert('Please select a vault')
      }
      else {props.send();
      setModalVisible(!modalVisible);
      }
    };

  return (
    
    <View style={styles.centeredView}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Add to Vault</Text>
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
            <Text style={styles.modalText}>Treasure to Add: {props.treasure.title}</Text>
            <Text style={[styles.modalText, {marginBottom: 20}]}>Select Vault: </Text>
            
            <SelectDropdown
              data={vaults}
              // renderItem={ datum => <ListItem id={datum.id} text={datum} title={datum.title}></ListItem>} 
              // keyExtractor={item => item.id} />
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />

            <Pressable
              style={[styles.button, styles.buttonClose, {marginTop: 20}]}
    // onPress={sendAndClose}>
          onPress={true}>

              <Text style={styles.textStyle}>Add Treasure to Vault</Text>
            </Pressable>
          </View>
          </DismissKeyboard>
        </View>
      </Modal>
    </View>
    
  );
};