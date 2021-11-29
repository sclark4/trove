import * as React from 'react';
import { Text, View, Image, Button } from 'react-native';
import {styles} from '../style/styles';
import { Icon } from 'react-native-elements';
import {EditTreasureModal} from './EditTreasureModal';
import {ShareTreasureModal} from './ShareTreasureModal';
export default function SettingsScreen({navigation}) {
  return (
    <View style={styles.container}>
        <Image
            style={styles.regularProfile}
            source={{uri: 'https://cs.wellesley.edu/~cs/ai2workshop/animals/dog.jpg'}}
          />
      <Text style={styles.h1}>
      Title
      </Text>
      <Text style={styles.h2}>
      Date/Time
      </Text>
      <Text style={styles.paragraph}>
      Description
      </Text>
      <Text style={styles.paragraph}>
      Location
      </Text>
      <Text style={styles.paragraph}>
      Tags
      </Text>
      <EditTreasureModal />
      <SendTreasureModal />
      {/* <Image style={styles.logo} source={require('../assets/snack-icon.png')} /> */}
    </View>
  );
}