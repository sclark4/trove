import * as React from 'react';
import { Text, View, Image, Button, TextInput, Pressable } from 'react-native';
import {styles} from '../style/styles';
import { Header } from 'react-native-elements';
// import SignupModal from './SignupModal';

export default function LoginScreen(props) {
  return ( 
    <View style={styles.container}>

      <Text style={styles.h1}>{'\n'}Welcome!</Text>
      <Image style={styles.gifIcon} source={require('../assets/goldCoin.gif')} />
      <Text style={styles.h2}>Login to see your treasures</Text>
      
      <TextInput
        style={styles.loginInput}
        placeholder="✉️ | Email Address"
        onChangeText={true}
        multiline={true}
      />

      <TextInput
        style={styles.loginInput}
        placeholder="🔒 | Password"
        onChangeText={true}
        multiline={true}
      />

      <Pressable
        style={[styles.logButton]}
        onPress={() => alert("To Be Implemented")}>
        <Text style={styles.textLog}>Login</Text>      
      </Pressable>


      <Text style={[styles.paragraph, {marginTop: 10}]}>Don't have an account?</Text>
      <Pressable
        style={[styles.logButton, {backgroundColor: "#a5c6ff"}]}
        onPress={() => alert("To Be Implemented")}>      
        <Text style={styles.textLog}>Sign up</Text>      
      </Pressable>
      {/* <SignupModal vault={props.route.params.vault} id ={props.route.params.vault.id} delete = {deleteAndExit} update = {updateAndExit}/> */}

    </View>
    
  );
}