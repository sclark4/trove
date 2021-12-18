import * as React from 'react';
import { useContext } from "react";
import { Text, View, Image, Button, TextInput, Pressable } from 'react-native';
import {styles} from '../style/styles';
import { Header } from 'react-native-elements';
import StateContext from '../StateContext';
// import SignupModal from './SignupModal';

export default function LoginScreen(props) {
  const Props = useContext(StateContext);
  const screenProps = Props.loginProps;
  return ( 
    <View style={styles.loginContainer}>

      <Text style={styles.h1}>Hi There!</Text>
      <Image style={styles.gifIcon} source={require('../assets/goldCoin.gif')} />
      <Text style={styles.h2}>Login to see your treasures</Text>
      
      <TextInput
        style={styles.loginInput}
        placeholder="✉️ | Email Address"
        onChangeText={ (textVal) => screenProps.setEmail(textVal) }
        value={screenProps.email}
      />

      <TextInput
        style={styles.loginInput}
        placeholder="🔒 | Password"
        onChangeText={ (textVal) => screenProps.setPassword(textVal)}
        value={screenProps.password} 
      />

      <Pressable
        style={[styles.logButton]}
        onPress={() => screenProps.signInUserEmailPassword()}>
        <Text style={[styles.textLog, {width: 220}]}>Login</Text>      
      </Pressable>

      <Text style={[styles.paragraph, {marginTop: 50}]}>Don't have an account?</Text>
      <Pressable
        style={[styles.logButton, {backgroundColor: "#a5c6ff"}]}
        onPress={() => screenProps.signUpUserEmailPassword()}>      
        <Text style={[styles.textLog, {fontSize: 15}]}>Sign up</Text>      
      </Pressable>
      {/* <SignupModal vault={props.route.params.vault} id ={props.route.params.vault.id} delete = {deleteAndExit} update = {updateAndExit}/> */}

    </View>
    
  );
}