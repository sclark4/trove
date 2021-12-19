import React from "react";
import { Text, View, Image, Pressable, ScrollView } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import {styles} from '../style/styles';
import EditVaultModal from './EditVaultModal';
import {useFonts} from 'expo-font';

export default function Vault(props) {
  const deleteAndExit = () => {
    props.route.params.delete(props.route.params.vault.id);
    props.navigation.goBack()
  };
  const updateAndExit = (updated) => {
    props.route.params.update(updated);
    props.navigation.goBack()
  };
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
      centerComponent={{ text: props.route.params.vault.title, style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}
      leftComponent={
        <Pressable style={[styles.headerButton, styles.buttonOpen, {padding:6}]} 
        onPress={() => props.navigation.goBack()}> 
          <Icon name='arrow-left' color='#ffffff' type='font-awesome' size={20} />
        </Pressable>}/>
      <Image style={styles.gifIcon} source={require('../assets/diamond.gif')} />
      <View style={styles.descContainer}>
        <Text style={styles.descText}>Wowza! Here are your gems from the vault "{props.route.params.vault.title}". {"\n"}Click "Open Vault" to see them!</Text>
      </View>
      <Image style={styles.smallIcon} source={require('../assets/chest.png')} />
      <EditVaultModal vault={props.route.params.vault} id ={props.route.params.vault.id} delete = {deleteAndExit} update = {updateAndExit}/>

    </View>
  );
}