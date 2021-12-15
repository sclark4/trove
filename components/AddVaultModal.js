import React, { useState, useEffect } from "react";
import { Alert, Button, Modal, StyleSheet, Text, Pressable, View, TextInput, Keyboard,  TouchableWithoutFeedback, Image } from "react-native";
import {styles} from '../style/styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { Card, Icon, Header } from 'react-native-elements';



const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
    );

export default function AddVaultModal(props) {
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