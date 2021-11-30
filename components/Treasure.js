import React, { useState, useEffect } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import {styles} from '../style/styles';
import EditTreasureModal from './EditTreasureModal';
import ShareTreasureModal from './ShareTreasureModal';

const animals = [
  'anole',
  'cat',
  'cow',
  'dog',
  'duck',
  'fish',
  'goat',
  'hamster',
  'horse',
  'mouse',
  'pig',
  'rabbit',
  'sheep',
]

export default function Treasure({navigation,route}) {

  return (
    <View style={styles.container}>
      <Image
            style={styles.regularTreasure}
            source={{uri: 'https://cs.wellesley.edu/~cs/ai2workshop/animals/dog.jpg'}}
          />
      <Text style={styles.h1}>Title: {route.params.title}</Text>
      <Text style={styles.h2}>Date/Time</Text>
      <Text style={styles.paragraph}>Description</Text>
      <Text style={styles.paragraph}>Location</Text>
      <Text style={styles.paragraph}>Tags</Text>
      <EditTreasureModal />
      <ShareTreasureModal />
    </View>
  );
}