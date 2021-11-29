import * as React from 'react';
import { Text, View, Image, Button } from 'react-native';
import {styles} from '../style/styles';

export default function TreasuresScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
       The Vault
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