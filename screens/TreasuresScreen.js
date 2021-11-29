import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import {styles} from '../style/styles';
import AddTreasureModal from '../components/AddTreasureModal';
import Treasure from '../components/Treasure';

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

export default function TreasuresScreen({navigation}) {
  const [selectedMail, setSelectedMail] = useState(null);
  const ListItem = props => { 
    return (
    //   <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={Home} />
    //     <Stack.Screen name="Notifications" component={Notifications} />
    //     <Stack.Screen name="Profile" component={Profile} />
    //     <Stack.Screen name="Settings" component={Settings} />
    // </Stack.Navigator>
    // </NavigationContainer>
      <TouchableOpacity
        onPress={() => setSelectedMail(props.text)}
      >
        <View style={styles.listItem}>
          <Image
            style={styles.smallImage}
            source={{uri: 'https://cs.wellesley.edu/~cs/ai2workshop/animals/'
                         + props.text + '.jpg'}}
          />
          <Text style={styles.listItemText}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <AddTreasureModal />
      {/* <Button
      title="Add Treasure"
      onPress={() =>
        navigation.navigate('Treasures')
      }
    /> */}
      <View style={styles.listWrapper}>
          <FlatList showsVerticalScrollIndicator={false}
          style={styles.list}
            data={animals}
            renderItem={ datum => <ListItem text={datum.item}></ListItem>} 
            keyExtractor={item => item} 
          />
        </View>
        
    </View>

  );
}