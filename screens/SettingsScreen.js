import * as React from 'react';
import {useState, useContext} from 'react';
import { Text, View, Image, Button, Pressable } from 'react-native';
import {styles} from '../style/styles';
import { Icon, Header } from 'react-native-elements';
import StateContext from '../StateContext';
import EditAccountModal from '../components/EditAccountModal';

export default function SettingsScreen(props) {
  const Props = useContext(StateContext);
  const loginProps = Props.loginProps;

  const deleteAndExit = () => {
    props.route.params.delete(props.route.params.account.email);
    props.navigation.goBack()
  };
  const updateAndExit = (updated) => {
    props.route.params.update(updated);
    props.navigation.goBack()
  };
  const shareAndExit = (newMail) => {
    props.route.params.share(newMail);
    alert("Treasure successfully sent to: " + newMail.receiver);
  };
  // console.log('hello' + screenProps.loggedInUser)
  return (
    <View>
      <Header
      backgroundColor='#fff'
      centerComponent={{ text: 'Settings', style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}/>

    <View style={styles.container}>

      <Image
            style={styles.regularProfile}
            source={require('../assets/icon.png')}
          />

      {/* <Text style={styles.h2}>
        💎 {props.route.params.account.firstName} {props.route.params.account.lastName}
      </Text>

      <Text style={styles.paragraph}>
        🎂 {props.route.params.account.birthday}
      </Text> */}

      <Text style={styles.h2}>
        ✉️ {loginProps.loggedInUser}
      </Text>

      {/* <EditAccountModal account={screenProps.loggedInUser} email ={screenProps.loggedInUser} delete = {deleteAndExit} update = {updateAndExit}/> */}

      <Pressable
        style={[styles.logButton]}
        onPress={() => screenProps.logOut()}>
        <Text style={styles.textLog}>Logout</Text>      
      </Pressable>

  </View>
    </View>
  );
}