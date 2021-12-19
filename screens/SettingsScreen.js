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
  return (
    <View>
      <Header
      backgroundColor='#fff'
      centerComponent={{ text: 'Settings', style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}/>

    <View style={styles.container}>

      <Text style={styles.h1}>
      Wendy Wellesley
      </Text>

      <Image
            style={styles.regularProfile}
            source={require('../assets/icon.png')}
          />

      <Text style={styles.h2}>
      @wwwendy
      </Text>

      <Text style={styles.paragraph}>
      Birthday: 11/29/2021
      </Text>

      <Text style={styles.paragraph}>
      Email: ww1@wellesley.edu
      </Text>

      {/* <EditAccountModal account={props.route.params.account} id ={props.route.params.account.id} delete = {deleteAndExit} update = {updateAndExit}/> */}
      <EditAccountModal/>

      <Pressable
        style={[styles.logButton]}
        onPress={() => screenProps.logOut()}>
        <Text style={styles.textLog}>Logout</Text>      
      </Pressable>

  </View>
    </View>
  );
}