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
    const state = useContext(StateContext);
    const vaultProps = state.vaultProps;
    // for dropdown to select destination vault
    const vaultTitles = vaultProps.vaults.map(vault => vault.title);

    const [destination, setDestination] = React.useState();
    
    const [modalVisible, setModalVisible] = useState(false);
    
    const addTreasureToVault = (vaultTitle) => {
      const retrievedVault = vaultProps.vaults.find(vault => vault.title === vaultTitle);
      const updatedVault = {
        'id': retrievedVault.id, 
        'title': retrievedVault.title,                     
        'treasures': [props.treasure.id, ...retrievedVault.treasures], 
        'user': retrievedVault.user
      };
      vaultProps.updateVault(updatedVault);
      alert('Treasure successfully added to vault');
    };

    const addAndClose = () => {
      addTreasureToVault(destination);
      setModalVisible(!modalVisible);
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
              data={vaultTitles}
              // renderItem={ datum => <ListItem id={datum.id} text={datum} title={datum.title}></ListItem>} 
              // keyExtractor={item => item.id} />
              // onSelect={(selectedItem, index) => {
              //   console.log(selectedItem, index)
              // }}
              onSelect={(selectedVault, index) => 
                // console.log(selectedVault)
                setDestination(selectedVault)
              }
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
              onPress={addAndClose}>

              <Text style={styles.textStyle}>Add Treasure to Vault</Text>
            </Pressable>
          </View>
          </DismissKeyboard>
        </View>
      </Modal>
    </View>
    
  );
};