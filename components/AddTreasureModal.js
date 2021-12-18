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
    const nextId = 20
    const [title, setTitle] = React.useState();
    const [description, setDescription] = React.useState();
    const [date, setDate] = useState(new Date());
    const [id, setId] = useState(nextId)
    const [location, setLocation] = React.useState();
    const [tags, setTags] = React.useState();
    
    const newItem = {'user': 'currentUser',                         
    'date': date.toDateString(),//new Date(2021, 11, 2, 10, 52, 31, 1234), 
    'title': title,
    'tags': (tags ? tags.split(",") : ""), 
    'description': description,
    'id': id,
    'image': image,
   };

    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const onChangeDescription = (event, description) => {
      setDescription(description);
    };
    const onChangeTime = (event, selectedTime) => {
      // const currentTime = selectedTime || time;
      // setShow(Platform.OS === 'ios');
      // setDate(currentDate);
      console.log("potentially unnecessary")
    };
    const onChangeDate = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    };
    const addAndClose = () => {
      if (title == null){
        alert('Please add a title to your treasure')
      }
      else if (description == null){
        alert('Please add a description to your treasure')
      }
      else if (tags == null){
        alert('Please add tags to your treasure')
      }
      else {props.add(newItem);
      setModalVisible(!modalVisible);

      }
      setId(id+1);
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
        placeholder="Treasure Title"
        onChangeText={setTitle}
      />
            <Text style={styles.modalText}>Description</Text>
            <TextInput
        required
        style={styles.input}
        placeholder="Treasure Description"
        onChangeText={setDescription}
        multiline={true}
      />
            
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
          // is24Hour={true}
          required
          display="default"
          onChange={onChangeDate}
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
          onChange={onChangeTime}
        />
      </View>
      </View>
         
            <Text style={styles.modalText}>Location</Text>
            <TextInput
        style={styles.input}
        placeholder="Treasure Location"
        onChangeText={setLocation}
        value={location}
      />
         
            <Text style={styles.modalText}>Tags</Text>
            <TextInput
        style={styles.input}
        placeholder="Treasure, Tags, formatted, like, this"
        onChangeText={setTags}
        multiline={true}
      />
      <View style={{flexDirection: 'row'}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={addAndClose}
            >
              <Text style={styles.textStyle}>Add Treasure</Text>
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