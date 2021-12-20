import * as React from 'react';
import {useState, useContext} from 'react';
import { Text, View, Image, Button, Pressable } from 'react-native';
import {styles} from '../style/styles';
import { Icon, Header } from 'react-native-elements';
import StateContext from '../StateContext';
import EditAccountModal from '../components/EditAccountModal';

export default function SettingsScreen(props) {
  const Props = useContext(StateContext);
  const screenProps = Props.loginProps;

  const deleteAndExit = () => {
    props.route.params.delete(props.route.params.treasure.id);
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
  console.log(props.route.params.accounts)
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

      <Text style={styles.h2}>
        💎 {props.route.params.account.firstName} {props.route.params.account.lastName}
      </Text>

      <Text style={styles.paragraph}>
        🎂 {props.route.params.account.birthday}
      </Text>

      <Text style={styles.paragraph}>
        ✉️ {props.route.params.account.email}
      </Text>

      <EditAccountModal account={props.route.params.accounts} id ={props.route.params.accounts.email} delete = {deleteAndExit} update = {updateAndExit}/>

      <Pressable
        style={[styles.logButton]}
        onPress={() => screenProps.logOut()}>
        <Text style={styles.textLog}>Logout</Text>      
      </Pressable>

  </View>
    </View>
  );
}