import React, { useState, useEffect, useContext } from "react";
import { Alert, Button, Modal, Text, Pressable, View, TextInput, Keyboard,  TouchableWithoutFeedback, Image } from "react-native";
import {styles} from '../style/styles';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import StateContext from '../StateContext';
import { // access to Firebase storage features (for files like images, video, etc.)
  getStorage, 
 ref, uploadBytes, uploadBytesResumable, getDownloadURL
} from "firebase/storage";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
    );

export default function AddTreasureModal(props) {
    const stateProps = useContext(StateContext);
    const firebaseProps = stateProps.firebaseProps;
    const storage = firebaseProps.storage;
    const [title, setTitle] = React.useState();
    const [link, setLink] = React.useState("");
    const [description, setDescription] = React.useState();
    const [date, setDate] = useState(new Date());
    // const [location, setLocation] = React.useState();
    // const [tags, setTags] = React.useState();
    
    const newItem = {'user': props.currentUser,                         
    'date': date.toDateString(),
    'title': title,
    // 'tags': (tags ? tags.split(",") : ""), 
    'description': description,
    'id': Date.now(),
    'link': link,
    // 'image': image.toString(),
    'author': props.currentUser
   };

    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
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
      // else if (tags == null){
      //   alert('Please add tags to your treasure')
      // }
      else {
        console.log("testing image", image)
        if (image){
          console.log("with image")
          firebasePostMessageWithImage(newItem, image);
        }
        else{
          console.log("without image")
          props.add({...newItem, image: ""});
        }
        setModalVisible(!modalVisible);
        setImage(null);
        setTitle(null);
        setLink(null);
        setDate(new Date())
        setDescription(null);
      }
    };

    async function firebasePostMessageWithImage(treasure, imageUri) {
      const storageRef = ref(storage, `treasureImages/${treasure.id}`);
      const fetchResponse = await fetch(imageUri);
      const imageBlob = await fetchResponse.blob();
  
      const uploadTask = uploadBytesResumable(storageRef, imageBlob);
      console.log(`Uploading image for message ${treasure.id} ...`);
      uploadTask.on('state_changed',
        // This callback is called with a snapshot on every progress update
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded 
          // and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
              }
        }, 
        // This callback is called when there's an error in the upload
        (error) => {
          console.error(error);
        }, 
        // This callback is called when the upload is finished 
        async function() {
          console.log(`Uploading image for message ${treasure.id} succeeded!`);
          // Once the upload is finished, get the downloadURL for the uploaed image
          const downloadURL = await getDownloadURL(storageRef);
          console.log(`Message image file for ${treasure.id} available at ${downloadURL}`);
  
          // Add the downloadURL as the imageUri for the message
          const treasureWithDownloadURL = {...treasure, image: downloadURL.toString()}; 
          props.add(treasureWithDownloadURL);
          // Store (in Firestore) the message with the downloadURL as imageUri
        }      
      ); // end arguments to uploadTask.on
    }

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
      quality: 0.2,
    });

    console.log("Picked Image", result);

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
            <Text style={styles.modalText}>Title*</Text>
            <TextInput
        required
        style={styles.input}
        placeholder="Treasure Title"
        onChangeText={setTitle}
        multiline={true}
      />
            <Text style={styles.modalText}>Description*</Text>
            <TextInput
        required
        style={styles.input}
        placeholder="Treasure Description"
        onChangeText={setDescription}
        multiline={true}
      />
      <Text style={styles.modalText}>External Link</Text>
            <TextInput
        required
        style={styles.input}
        placeholder="Link to your treasure"
        onChangeText={setLink}
        multiline={true}
      />
            
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Upload Image/Video" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
    </View>
    <View style={{flexDirection:"row"}} >
            <View>
            <Button styles={styles.setDate} title='Set Date 'color="black" disabled={true} />
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          required
          display="default"
          onChange={onChangeDate}
        />
      </View>
      <View>
      </View>
      </View>
         
            {/* <Text style={styles.modalText}>Location</Text>
            <TextInput
        style={styles.input}
        placeholder="Treasure Location"
        onChangeText={setLocation}
        value={location}
      /> */}
         
            {/* <Text style={styles.modalText}>Tags</Text>
            <TextInput
        style={styles.input}
        placeholder="tags, formatted, like, this"
        onChangeText={setTags}
        multiline={true}
      /> */}
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