import * as React from 'react';
import { Text, View, Image, Button } from 'react-native';
import {styles} from '../components/styles';

export default function SettingsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
      This is esther's profile.
      </Text>
      <Button
      title="Go to Home Screen"
      onPress={() =>
        navigation.navigate('Home')
      }
    />
      {/* <Image style={styles.logo} source={require('../assets/snack-icon.png')} /> */}
    </View>
  );
}