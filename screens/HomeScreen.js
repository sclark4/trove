import * as React from 'react';
import { Text, View, Image, Button } from 'react-native';
import {styles} from '../style/styles';

export default function HomeScreen(props) {
  return ( 
    <View style={styles.container}>
      
      <Text style={styles.paragraph}>
       This is our login/signup page
      </Text>
    </View>
  );
}