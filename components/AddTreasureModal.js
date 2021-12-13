import React, { useState, useEffect } from "react";
import { Alert, Button, Modal, Text, Pressable, View, TextInput, Keyboard,  TouchableWithoutFeedback, Image } from "react-native";
import {styles} from '../style/styles';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
    );

export default function AddTreasureModal(props) {
    const [title, onChangeTitle] = React.useState("The Best Monday");
    const [description, setDescription] = React.useState("Today, we unsuccessfully demoed trove!");
    const [date, setDate] = useState(new Date(1598051730000));


    const [location, setLocation] = React.useState('Science Center');
    const [tags, setTags] = React.useState('cs317, WeLoveLyn, appdevelopment');
    
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
    const addAndClose = () => {
      setModalVisible(!modalVisible);
      props.add();
    };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
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
        
        <View style={styles.centeredView}>
        <DismissKeyboard>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Title:</Text>
            <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
      />
            <Text style={styles.modalText}>Description</Text>
            <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        multiline={true}
      />
            
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Upload Image/Video" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
    </View>
    <View style={{flexDirection:"row"}} >
            <View>
            <Button title="Set date  " />
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      </View>
      <View>
        <Button title="Set time" />
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='time'
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      </View>
      </View>
         
            <Text style={styles.modalText}>Location</Text>
            <TextInput
        style={styles.input}
        onChangeText={setLocation}
        value={location}
      />
         
            <Text style={styles.modalText}>Tags</Text>
            <TextInput
        style={styles.input}
        onChangeText={setTags}
        value={tags}
        multiline={true}
      />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={addAndClose}
            >
              <Text style={styles.textStyle}>Add Treasure</Text>
            </Pressable>
          </View>
          </DismissKeyboard>
        </View>
        
      </Modal>
      
    </View>
    
  );
};