import * as React from 'react';
import { useContext } from "react";
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import {styles} from '../style/styles';
import AddTreasureModal from '../components/AddTreasureModal';
import { Card, Header } from 'react-native-elements';
import StateContext from '../StateContext'

export default function TreasuresScreen(props) {
  const Props = useContext(StateContext);
  const screenProps = Props.treasuresProps;
    
  const TagItem = item => {
    return (<Text style={styles.tag}>#{item.text} </Text>)
  }

  const CardItem = item => {
    return (
    <TouchableOpacity
    onPress={() => props.navigation.navigate('TreasuresNav', { screen: 'Treasure', params: {treasure: item.text.item, delete: screenProps.deleteTreasure}})}>
      <Card containerStyle={styles.treasureCard}>
      <Card.Title style={{margin: 10}}>{item.text.item.title}</Card.Title>
      <Card.Image style={styles.treasureThumbnail} source={{uri:('https://cdn.pixabay.com/photo/2021/01/21/16/17/english-cocker-spaniel-5937757_1280.jpg')}}>
      </Card.Image>
      <Text style={{margin: 10}}>
        {item.text.item.description} <Text> {item.text.item.tags.map(tag => <TagItem text = {tag}/>)} </Text>
        </Text>
  </Card>
</TouchableOpacity>)
  }
  return (
    <View>
        <Header
      backgroundColor='#fff'
      leftComponent={<AddTreasureModal add={screenProps.addTreasure}/>}
  centerComponent={{ text: 'Treasures', style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900' } }}
  />
    <View style={styles.container}>
      <View style={styles.listWrapper}>
          <FlatList showsVerticalScrollIndicator={false}
          style={styles.list}
            data={screenProps.treasures}
            renderItem={ datum => <CardItem id={datum.id} text={datum} title={datum.title} description={datum.description} tags={datum.tags}></CardItem>} 
            keyExtractor={id => id} />
        </View>
        </View>
    </View>
  );
}