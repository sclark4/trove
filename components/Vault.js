import React from "react";
import { Text, View, Image,Pressable } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import {styles} from '../style/styles';
import AddToVaultModal from "./AddToVault";
import {useFonts} from 'expo-font';

export default function Vault(props) {
  const [loaded] = useFonts({
    Karla_Regular: require('../assets/fonts/Karla-Regular.ttf'),
    Karla_ExtraLight: require('../assets/fonts/Karla-ExtraLight.ttf'),
    Grandstander_Bold: require('../assets/fonts/Grandstander-Bold.ttf'),
    Grandstander_Medium: require('../assets/fonts/Grandstander-Medium.ttf'),
  });
  
  if (!loaded) {
    return null;
  }
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