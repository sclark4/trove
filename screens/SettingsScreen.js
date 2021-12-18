import * as React from 'react';
import {useState} from 'react';
import { Text, View, Image, Button, Pressable } from 'react-native';
import {styles} from '../style/styles';
import { Icon, Header } from 'react-native-elements';

export default function SettingsScreen(props) {
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

      <Pressable
        onPress={()=>alert("To Be Implemented")}>
        <Icon name='edit' raised reverse color='#a5c6ff' />
      </Pressable>

      <Pressable
        style={[styles.logButton]}
        onPress={() => alert("To Be Implemented")}>
        <Text style={styles.textLog}>Logout</Text>      
      </Pressable>

  </View>
    </View>
  );
}