import * as React from 'react';
import {useState} from 'react';
import EditSettingsModal from './EditSettingsModal';
import { Text, View, Image, Button, Pressable } from 'react-native';
import {styles} from '../style/styles';
import { Icon, Header } from 'react-native-elements';

export default function SettingsScreen(props) {
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
    <View>
      <Header
      backgroundColor='#fff'
      centerComponent={{ text: 'Settings', style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}/>

    <View style={styles.container}>

<<<<<<< Updated upstream
      <Text style={styles.h1}>
      Wendy Wellesley
      </Text>
=======
>>>>>>> Stashed changes
      <Image
            style={styles.regularProfile}
            source={require('../assets/icon.png')}
          />
      <Text style={styles.h2}>
      💎 Wendy Wellesley
      </Text>
      <Text style={styles.paragraph}>
      🎂 birthday: 11/29/2021
      </Text>
      <Text style={styles.paragraph}>
      ✉️ email: ww1@wellesley.edu
      </Text>
<<<<<<< Updated upstream
      <Pressable
    onPress={()=>alert("To Be Implemented")}>
    <Icon name='edit' raised reverse color='#a5c6ff' />
  </Pressable>
=======

      <Pressable
        onPress={()=>alert("To Be Implemented")}>
        <Icon name='edit' raised reverse color='#a5c6ff' />
      </Pressable>

      <EditSettingsModal account={props.route.params.account} id ={props.route.params.account.id} delete = {deleteAndExit} update = {updateAndExit}/>

      <Pressable
        style={[styles.logButton, {marginTop: 30}]}
        onPress={() => alert("To Be Implemented")}>
        <Text style={styles.textLog}>Logout</Text>      
      </Pressable>

      <Pressable
        style={[styles.logButton, {backgroundColor: "#eb6767", height: 25, padding: 5}]}
        onPress={() => alert("To Be Implemented")}>
        <Text style={[styles.textLog, {fontSize: 13}]}>Delete Account?</Text>      
      </Pressable>

>>>>>>> Stashed changes
  </View>
    </View>
  );
}