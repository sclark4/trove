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
    </View>
    
  );
};