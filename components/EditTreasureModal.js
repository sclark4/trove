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

export default function EditTreasureModal(props) {
    const [title, setTitle] = React.useState(props.treasure.title);
    const [description, setDescription] = React.useState(props.treasure.description);
    const [link, setLink] = React.useState(props.treasure.link);
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = React.useState('Science Center');
    // const [tags, setTags] = React.useState(props.treasure.tags);
    const [modalVisible, setModalVisible] = useState(false);
    // const [image, setImage] = useState("https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_1280.jpg");

    const updatedItem = {'user': props.treasure.user, 
    'author': props.treasure.author,                        
    'date': date.toDateString(),
    'title': title,
    'link': link,
    // 'tags':tags, //(tags ? tags.split(",") : ""), 
    'description': description,
    'id': props.treasure.id.toString(),
    'image': props.treasure.image,
   };

    const updateAndClose = () => {
      if (title == null){
        alert('Please add a title to your treasure')
      }
      else if (description == null){
        alert('Please add a description to your treasure')
      }
      // else if (tags == null){
      //   alert('Please add tags to your treasure')
      // }
      else {
      props.update(updatedItem);
      setModalVisible(!modalVisible);
      alert("Successfully updated treasure")
      }
    };
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    };

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Delete Treasure?",
      "Are you sure you want to delete this treasure? This action is permanent and cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: setModalVisible(!modalVisible),
          style: "cancel"
        },
        { text: "Delete", onPress: () => {setModalVisible(!modalVisible); props.delete()}}
      ]
    );

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work! You can update permissions in Settings.');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    
    <View style={styles.centeredView}>
        <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Edit Treasure</Text>
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
            <Text style={styles.modalText}>Title:</Text>
            <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
      />
            <Text style={styles.modalText}>Description</Text>
        <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        multiline={true}/>
        <Text style={styles.modalText}>External Link</Text>
            <TextInput
        required
        style={styles.input}
        placeholder="Link to your treasure"
        onChangeText={setLink}
        multiline={true}
        value={link}
      />

      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Update Image/Video" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
      </View> */}
      <View style={styles.centeredView}>
          <View>
          <Button styles={styles.setDate} title='Set Date 'color="black" disabled={true} />
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode='date'
              // is24Hour={true}
              display="default"
              required
              onChange={onChange}
              // shouldCloseOnSelect={true}
              />
          </View>
        </View>
         
            {/* <Text style={styles.modalText}>Location</Text>

            <TextInput
        style={styles.input}
        onChangeText={setLocation}
        value={location}/> */}
         
            {/* <Text style={styles.modalText}>Tags</Text>
            <TextInput
        style={styles.input}
        onChangeText={setTags}
        value={tags}
        multiline={true}/> */}

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={updateAndClose}>
              <Text style={styles.textStyle}>Update Treasure</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={createTwoButtonAlert}>
              <Text style={styles.textStyle}>Delete Treasure</Text>
            </Pressable>
          </View>
          </DismissKeyboard>
        </View>
      </Modal>
    </View>
  );
};