import React, { useState, useEffect } from "react";
import { Alert, Button, Modal,Text, Pressable, View, TextInput, Keyboard,  TouchableWithoutFeedback, Image } from "react-native";
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {styles} from '../style/styles';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
    );

export default function EditAccountModal(props) {
    const [firstName, setFirstName] = React.useState(props.account.firstName);
    const [lastName, setLastName] = React.useState(props.account.lastName);
    // const [birthday, setBirthday] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);

    const updatedItem = {'firstName': firstName,                        
    'lastName': lastName,
    // 'birthday': '2/2/2022',
    'email': props.account.email
   };

    const updateAndClose = () => {
      if (firstName == null){
        alert('Please enter a valid first name')
      }
      else if (lastName == null){
        alert('Please enter a valid last name')
      }
      // else if (birthday == null){
      //   alert('Please add a valid birthday')
      // }
      else {
        props.update(updatedItem);
        setModalVisible(!modalVisible);
        alert("Successfully updated account")
      }
    };
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
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
            <Text style={styles.modalText}>First Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFirstName}
              value={firstName}
            />

            <Text style={styles.modalText}>Last Name:</Text>
              <TextInput
              style={styles.input}
              onChangeText={setLastName}
              value={lastName}
            />

        {/* <Text style={styles.modalText}>Birthday:</Text>
        <TextInput
            style={styles.input}
            onChangeText={setBirthday}
            value={birthday}
            multiline={true}/>

            <View>
              <Button title="Set birthday  " />
              <DateTimePicker
                testID="dateTimePicker"
                value={birthday}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={onChange}/>
            </View> */}

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