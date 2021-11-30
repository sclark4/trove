import React, { useState, useEffect } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import {styles} from '../style/styles';
import EditTreasureModal from './EditTreasureModal';
import ShareTreasureModal from './ShareTreasureModal';

export default function Treasure({navigation,route}) {

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Title: {route.params.title}</Text>
      <Text style={styles.h2}>Date/Time</Text>
      <Text style={styles.paragraph}>Description</Text>
      <Text style={styles.paragraph}>Location</Text>
      <Text style={styles.paragraph}>Tags</Text>
      {/* <Image
            style={styles.smallIcon}
            source={require('../assets/diamond.png')}
          /> */}
      <View><EditTreasureModal /></View>
      
      <ShareTreasureModal />
    </View>
  );
}