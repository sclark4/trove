// import React, { useState, useEffect } from "react";
// import { Alert, Button, Modal, Text, Pressable, View, TextInput, Keyboard,  TouchableWithoutFeedback, Image } from "react-native";
// import {styles} from '../style/styles';
// import { Icon } from 'react-native-elements';


// const DismissKeyboard = ({ children }) => (
//     <TouchableWithoutFeedback 
//     onPress={() => Keyboard.dismiss()}>
//         {children}
//     </TouchableWithoutFeedback>
//     );

// export default function SignupModal(props) {
//     const nextId = 20
//     const [email, setEmail] = React.useState();
//     const [password, setPassword] = React.useState();
    
//     const newItem = {'email': 'newPeep@wellesley.edu',                         
//     'password': 'cs317rocks!',
//     'id': 1,
//    };

//     const [modalVisible, setModalVisible] = useState(false);
//     const onChangeDescription = (event, description) => {
//     //   setDescription(description);
//     };
//     const onChangeDate = (event, selectedDate) => {
//       const currentDate = selectedDate || date;
//       setDate(currentDate);
//     };
//     const addAndClose = () => {
//       if (email == null){
//         alert('Please enter your username')
//       }
//       else if (password == null){
//         alert('Please enter your password')
//       }
//       else {props.add(newItem);
//         setModalVisible(!modalVisible);
//       }
//       setId(id+1);
//     };

//   return (
//     <View style={styles.centeredView}>
//         <Pressable
//         style={[styles.headerButton, styles.buttonOpen]}
//         onPress={() => setModalVisible(true)}
//       >
//         <Icon name='add' color='#ffffff' />
//       </Pressable>
      
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
        
//         <View>
//         <DismissKeyboard>
//           <View style={styles.modalView}>
//             <Pressable onPress={() => setModalVisible(false)}>
//                 <Icon name='times-circle' type='font-awesome' color='#ff7fad' size={30} />
//             </Pressable>
//       <View style={{alignItems:'center'}}>
//             <Text style={styles.modalText}>Email:</Text>
//             <TextInput
//         required
//         style={styles.input}
//         placeholder="Email"
//         onChangeText={setTitle}
//       />
//             <Text style={styles.modalText}>Password:</Text>
//             <TextInput
//         required
//         style={styles.input}
//         placeholder="Password"
//         onChangeText={setDescription}
//         multiline={true}
//       />
         
//             <Text style={styles.modalText}>Location</Text>
//             <TextInput
//         style={styles.input}
//         placeholder="Treasure Location"
//         onChangeText={setLocation}
//         value={location}
//       />
//       <View style={{flexDirection: 'row'}}>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={addAndClose}
//             >
//               <Text style={styles.textStyle}>Add Treasure</Text>
//             </Pressable>
//       </View>
//           </View>
//           </View>
//           </DismissKeyboard>
//         </View>
        
//       </Modal>
      
//     </View>
    
//   );
// };