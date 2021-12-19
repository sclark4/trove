import React, { useState, useEffect } from "react";
import { Alert, Button, Modal,Text, Pressable, View, TextInput, Keyboard,  TouchableWithoutFeedback, Image } from "react-native";
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import {styles} from '../style/styles';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
    );

export default function EditAccountModal(props) {
//     const [title, setTitle] = React.useState(props.treasure.title);
//     const [description, setDescription] = React.useState(props.treasure.description);
//     const [date, setDate] = useState(new Date());
//     const [location, setLocation] = React.useState('Science Center');
//     const [tags, setTags] = React.useState(props.treasure.tags.join());
//     const [modalVisible, setModalVisible] = useState(false);
//     const [image, setImage] = useState(null);

//     const updatedItem = {'user': props.treasure.user,                         
//     'date': date.toDateString(),
//     'title': title,
//     'tags': (tags ? tags.split(",") : ""), 
//     'description': description,
//     'id': props.treasure.id,
//     'image': image,
//    };

    const updateAndClose = () => {
      if (username == null){
        alert('Please enter a valid username')
      }
      else if (birthday == null){
        alert('Please add a valid birthday')
      }
      else {
        // props.update(updatedItem);
        setModalVisible(!modalVisible);
        alert("Successfully updated account")
      }
    };
  
//     const onChange = (event, selectedDate) => {
//       const currentDate = selectedDate || date;
//       setDate(currentDate);
//     };

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
        // { text: "Delete", onPress: () => {setModalVisible(!modalVisible); props.delete()}}
        { text: "Delete", onPress: (true) }

      ]
    );

  return (
    
    <View style={styles.centeredView}>
        <Pressable
            onPress={()=>setModalVisible(true)}>
            <Icon name='edit' raised reverse color='#a5c6ff' />
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
            <Text style={styles.modalText}>Name:</Text>
            <TextInput
        style={styles.input}
        onChangeText={true}
        value={username}
      />
        <Text style={styles.modalText}>Birthday:</Text>
        <TextInput
            style={styles.input}
            onChangeText={true}
            value={birthday}
            multiline={true}/>

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