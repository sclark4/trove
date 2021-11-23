import * as React from 'react';
import { Text, View, Image, Button } from 'react-native';
import {styles} from '../components/styles';

export default function TreasuresScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
       This is our Treasures template
      </Text>
      <Button
      title="Go to Esther's profile"
      onPress={() =>
        navigation.navigate('Settings', { name: 'Esther' })
      }
    />
    </View>
  );
}