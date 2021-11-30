import React, { useState, useEffect } from "react";
import { Alert, Button, Modal, StyleSheet, Text, Pressable, View, TextInput, Keyboard,  TouchableWithoutFeedback, Image } from "react-native";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
    );

export default function ShareTreasureModal() {
    const [title, onChangeTitle] = React.useState("The Best Monday");
    const [receiver, setReceiver] = React.useState("ww1");
    const [note, setNote] = React.useState("here you go!");
    const [modalVisible, setModalVisible] = useState(false);

  return (
    
    <View style={styles.centeredView}>
        <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Send Treasure</Text>
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
            <Text style={styles.modalText}>Treasure to Send:</Text>
            <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
      />
            <Text style={styles.modalText}>Send to:</Text>
            <TextInput
        style={styles.input}
        onChangeText={setReceiver}
        value={receiver}
      />
            <Text style={styles.modalText}>Note</Text>
            <TextInput
        style={styles.input}
        onChangeText={setNote}
        value={note}
        multiline={true}
      />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Send Treasure</Text>
            </Pressable>
          </View>
          </DismissKeyboard>
        </View>
      </Modal>
    </View>
    
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 50,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  modalText: {
    marginBottom: 1,
    textAlign: "center"
  }
});