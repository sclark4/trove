import React from "react";
import { Text, View, Image,Pressable } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import {styles} from '../style/styles';
import AddToVaultModal from "./AddToVault";

export default function Vault(props) {
  return (
    <View style={styles.container}>
      <Header
      backgroundColor='#fff'
      rightComponent={<AddToVaultModal/>}
      centerComponent={{ text: props.route.params.title, style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}
      leftComponent={
        <Pressable style={[styles.headerButton, styles.buttonOpen, {padding:6}]} 
        onPress={() => props.navigation.goBack()}> 
          <Icon name='arrow-left' color='#ffffff' type='font-awesome' size='20' />
        </Pressable>}
/>
      <Text style={styles.h2}>Date Created Here</Text>
      <Text style={styles.paragraph}>Description Here </Text>
      <Text style={styles.paragraph}>Contents Here</Text>
      <Image style={styles.smallIcon} source={require('../assets/chest.png')} />
    </View>
  );
}