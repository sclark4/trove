import * as React from 'react';
import { useContext } from "react";
import { Text, View, FlatList, TouchableOpacity, Pressable } from 'react-native';
import {styles} from '../style/styles';
import AddTreasureModal from '../components/AddTreasureModal';
import { Card, Header, Icon } from 'react-native-elements';
import StateContext from '../StateContext';
import {useFonts} from 'expo-font';

export default function TreasuresScreen(props) {
  const Props = useContext(StateContext);
  const currentUser = Props.loginProps.loggedInUser;
  const screenProps = Props.treasuresProps;

  const titleSortedTreasures = [...screenProps.treasures].sort((a, b) => (a.title.toLowerCase()<b.title.toLowerCase())? -1:1);
  const dateSortedTreasures = [...screenProps.treasures].sort((a, b) => (new Date(b.date)-new Date(a.date)));
  const TagItem = item => {
    return (<Text style={{fontFamily:'Karla_Regular'}, styles.tag}>#{item.text} </Text>)
  }
  const CardItem = item => {
    return (
    <TouchableOpacity
    onPress={() => props.navigation.navigate('TreasuresNav', { screen: 'Treasure', params: {treasure: item.text.item, delete: screenProps.deleteTreasure, share: screenProps.shareTreasure, update: screenProps.updateTreasure,}})}>
      <Card containerStyle={styles.treasureCard}>
      <Card.Title style={{margin: 10, fontFamily:'Grandstander_Bold'}}>{item.text.item.title}</Card.Title>
      <Card.Image style={styles.treasureThumbnail} source={{uri:('https://cdn.pixabay.com/photo/2021/01/21/16/17/english-cocker-spaniel-5937757_1280.jpg')}}>
      </Card.Image>
      <Text style={{margin: 10, fontFamily:'Karla_Regular'}}>
        {item.text.item.description}
        {/* <Text> {item.text.item.tags.map(tag => <TagItem text = {tag}/>)} </Text> */}
        </Text>
  </Card>
</TouchableOpacity>)
  }

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
      leftComponent={<AddTreasureModal add={screenProps.addTreasure} currentUser ={currentUser}/>}
      centerComponent={{ text: 'Treasures', style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}
        />
    <View style={styles.container}>
    
      <View style={styles.listWrapper}>
      <Pressable
        style={[styles.headerButton, styles.buttonOpen]}
        onPress={screenProps.getFirebaseData}
      >
        <Text style={styles.paragraph}>Import Firebase Data</Text>
      </Pressable>
      {(dateSortedTreasures === [] ?  
           <Text styles={styles.h1}>There's no time like the present to add your first Treasure! Click the + button to get started.</Text>
          :
      <FlatList showsVerticalScrollIndicator={false}
          style={styles.list}
            data={dateSortedTreasures}
            renderItem={ datum => <CardItem id={datum.id} text={datum} title={datum.title} description={datum.description} location={datum.location}></CardItem>} 
            keyExtractor={item => item.id} />
      )}
         
        </View>
        </View>
    </View>
  );
}