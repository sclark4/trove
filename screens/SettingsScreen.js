import * as React from 'react';
import { Text, View, Image, Button } from 'react-native';
import {styles} from '../style/styles';
import { Icon, Header } from 'react-native-elements';

export default function SettingsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Header
      backgroundColor='#fff'
      // leftComponent={<Button title='Add'></Button>}
  leftComponent={{ icon: 'menu', color: '#BEBEBE', iconStyle: { color: '#BEBEBE' } }}
  centerComponent={{ text: 'Settings', style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}
  rightComponent={{ icon: 'home', color: '#BEBEBE' }}
/>
      <Text style={styles.h1}>
      Wendy Wellesley
      </Text>
      <Image
            style={styles.regularProfile}
            source={{uri: 'https://cs.wellesley.edu/~cs/ai2workshop/animals/dog.jpg'}}
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
      <Button
      title='Edit Profile'
      onPress={() =>
        navigation.navigate('Home')
      }
    />
      {/* <Image style={styles.logo} source={require('../assets/snack-icon.png')} /> */}
    </View>
  );
}