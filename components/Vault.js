import React, { useContext } from "react";
import { Text, View, Image, Pressable, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Header, Icon, Card } from 'react-native-elements';
import {styles} from '../style/styles';
import EditVaultModal from './EditVaultModal';
import {useFonts} from 'expo-font';
import StateContext from '../StateContext';

export default function Vault(props) {
  const state = useContext(StateContext);
  const treasuresProps = state.treasuresProps;
  const treasures = state.treasuresProps.treasures;
  const treasureIds = props.route.params.vault.treasures;
  const treasuresInVault = treasures.filter( treasure => treasureIds.includes(treasure.id));

  const deleteAndExit = () => {
    props.route.params.delete(props.route.params.vault.id);
    props.navigation.goBack()
  };
  const updateAndExit = (updated) => {
    props.route.params.update(updated);
    props.navigation.goBack()
  };
  const [loaded] = useFonts({
    Karla_Regular: require('../assets/fonts/Karla-Regular.ttf'),
    Karla_ExtraLight: require('../assets/fonts/Karla-ExtraLight.ttf'),
    Rubik1: require('../assets/fonts/Rubik-ExtraBold.ttf'),
    Rubik2: require('../assets/fonts/Rubik-Medium.ttf'),
  });
  
  if (!loaded) {
    return null;
  }

  const CardItem = item => {
    return (
    // <TouchableOpacity
    // onPress={() => props.navigation.navigate('TreasuresNav', { screen: 'Treasure', params: {treasure: item.text.item, delete: treasuresProps.deleteTreasure, share: treasuresProps.shareTreasure, update: treasuresProps.updateTreasure, currentUser:currentUser}})}>
    // onPress={() => true}>
      <Card containerStyle={[styles.treasureCard, {width: 200}]}>
      <Card.Title style={{margin: 10, fontFamily:'Rubik1'}}>{item.text.item.title}</Card.Title>
      {/* <Image style={styles.gifIcon} source={require('../assets/diamond.gif')} /> */}
      {(item.text.item.image)?
      <Card.Image 
      // source={(item.text.item.image != "")?{uri:item.text.item.image}:{uri:('https://cdn.pixabay.com/photo/2021/01/21/16/17/english-cocker-spaniel-5937757_1280.jpg')}}>
      source={{uri:(item.text.item.image)}}>
      </Card.Image>
      :<></>}
      {(item.text.item.link)?<OpenURLButton url={item.text.item.link}>{item.text.item.link}</OpenURLButton>
        :<></>}
      <Text style={{margin: 10, fontFamily:'Karla_Regular'}}>
        {item.text.item.description}
        {/* <Text> {item.text.item.tags.map(tag => <TagItem text = {tag}/>)} </Text> */}
        </Text>
  </Card>
// </TouchableOpacity>
)
  }

  return (
    <View style={styles.container}>
      <Header
      backgroundColor='#fff'
      centerComponent={{ text: props.route.params.vault.title, style: { color: '#a5c6ff', fontSize: 20, fontWeight:'900'} }}
      leftComponent={
        <Pressable style={[styles.headerButton, styles.buttonOpen, {padding:6}]} 
        onPress={() => props.navigation.goBack()}> 
          <Icon name='arrow-left' color='#ffffff' type='font-awesome' size={20} />
        </Pressable>}/>
      <Image style={styles.gifIcon} source={require('../assets/diamond.gif')} />
      <View style={styles.descContainer}>
        <Text style={styles.descText}>Wowza! Here are your gems from the vault "{props.route.params.vault.title}". {"\n"}Click "Open Vault" to see them!</Text>
      </View>

      <Image style={styles.smallIcon} source={require('../assets/chest.png')} />
      
      <View style={styles.centeredView}>
        <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => alert('In the future, this button would open the treasures in a more dynamic way. For now, we decided to display the treasures below')}>
        <Text style={styles.textStyle}>Open Vault</Text>
        </Pressable>
      </View>
      
      <EditVaultModal vault={props.route.params.vault} id ={props.route.params.vault.id}/>
      {/* <OpenVault vault={props.route.params.vault} id ={props.route.params.vault.id}/> */}
      
      {(treasureIds === []) ?  
           <Text styles={styles.h1}>Add some treasures to this vault to get started!</Text>
          :

      <FlatList showsVerticalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 230}}
            data={treasuresInVault}
            renderItem={ datum => <CardItem id={datum.id} text={datum} title={datum.title} description={datum.description} location={datum.location}></CardItem>} 
            keyExtractor={item => item.id} />
      }
      </View>
  );
}