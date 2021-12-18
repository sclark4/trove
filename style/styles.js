import { Text, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Karla_200ExtraLight,
  Karla_300Light,
  Karla_400Regular,
  Karla_500Medium,
  Karla_600SemiBold,
  Karla_700Bold,
  Karla_800ExtraBold,
  Karla_200ExtraLight_Italic,
  Karla_300Light_Italic,
  Karla_400Regular_Italic,
  Karla_500Medium_Italic,
  Karla_600SemiBold_Italic,
  Karla_700Bold_Italic,
  Karla_800ExtraBold_Italic,
} from '@expo-google-fonts/karla';

import {
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_800ExtraBold,
  Rubik_900Black,
  Rubik_300Light_Italic,
  Rubik_400Regular_Italic,
  Rubik_500Medium_Italic,
  Rubik_600SemiBold_Italic,
  Rubik_700Bold_Italic,
  Rubik_800ExtraBold_Italic,
  Rubik_900Black_Italic,
} from '@expo-google-fonts/rubik';

export default () => {
  let [fontsLoaded] = useFonts({
    Karla_200ExtraLight,
    Karla_300Light,
    Karla_400Regular,
    Karla_500Medium,
    Karla_600SemiBold,
    Karla_700Bold,
    Karla_800ExtraBold,
    Karla_200ExtraLight_Italic,
    Karla_300Light_Italic,
    Karla_400Regular_Italic,
    Karla_500Medium_Italic,
    Karla_600SemiBold_Italic,
    Karla_700Bold_Italic,
    Karla_800ExtraBold_Italic,
  });

  let fontSize = 24;
  let paddingVertical = 6;

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_200ExtraLight',
          }}>
          Karla Extra Light
        </Text>

        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_300Light',
          }}>
          Karla Light
        </Text>

        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_400Regular',
          }}>
          Karla Regular
        </Text>

        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_500Medium',
          }}>
          Karla Medium
        </Text>

        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_600SemiBold',
          }}>
          Karla Semi Bold
        </Text>

        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_700Bold',
          }}>
          Karla Bold
        </Text>

        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_800ExtraBold',
          }}>
          Karla Extra Bold
        </Text>

        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_200ExtraLight_Italic',
          }}>
          Karla Extra Light Italic
        </Text>

        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_300Light_Italic',
          }}>
          Karla Light Italic
        </Text>

        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_400Regular_Italic',
          }}>
          Karla Italic
        </Text>

        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_500Medium_Italic',
          }}>
          Karla Medium Italic
        </Text>

        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_600SemiBold_Italic',
          }}>
          Karla Semi Bold Italic
        </Text>

        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_700Bold_Italic',
          }}>
          Karla Bold Italic
        </Text>

        <Text
          style={{
            fontSize,
            paddingVertical,
            // Note the quoting of the value for `fontFamily` here; it expects a string!
            fontFamily: 'Karla_800ExtraBold_Italic',
          }}>
          Karla Extra Bold Italic
        </Text>
      </View>
    );
  }
};

// red:#f26b5b
// darkpink: #ff7fad
// light pink: #ffdddd
// light red: #ffa393
// yellow: #ffcc77
// blue: #a5c6ff 

// const [loaded] = useFonts({
//   Karla_Regular: require('../assets/fonts/Karla-Regular.ttf'),
//   Karla_ExtraLight: require('../assets/fonts/Karla-ExtraLight.ttf'),
//   Grandstander_Bold: require('../assets/fonts/Grandstander-Bold.ttf'),
//   Grandstander_Medium: require('../assets/fonts/Grandstander-Medium.ttf'),
// });

const styles = StyleSheet.create({
    headerContainer:{
      height: Platform.select({
        android: 100,
        default: 110,
      }),
      paddingTop:50,
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
    },
    loginContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      flex: 1
    },
    treasureContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 1,
      margin: 10,
      width: '100%',
      flexDirection: "row",
      marginVertical: 2,
      marginHorizontal: 1,
    },
    paragraph: {
      margin: 4,
      marginTop: 0,
      fontSize: 14,
      fontWeight: '300',
      textAlign: 'center',
    },
    descText: {
      margin: 5,
      fontSize: 20,
      fontWeight: '300',
      fontFamily:'Karla_Regular',
      textAlign: 'center'
    },
    descContainer: {
      margin: 20,
      marginTop: 0,
      backgroundColor: '#ccdaff',
      borderRadius: 40,
      padding: 20
    },
    tag:{
      color:'#a5c6ff',
      fontWeight: '500',
      fontSize: 15,
    },
    h1: {
      fontSize: 24,
      margin: 14,
      fontWeight: '900',
      textAlign: 'center',
      // fontFamily: 'Rubik_800ExtraBold',
    },
    h2: {
      fontSize: 18,
      margin: 10,
      fontWeight: '400',
      textAlign: 'center',
    },
    logo: {
      height: 128,
      width: 128,
    },
    listWrapper: {
      maxHeight: '100%', 
      width: '100%',
    },
    listItem: {
      flexDirection: "row",
      padding: 10,
      marginVertical: 2,
      marginHorizontal: 1,
      backgroundColor: 'white'
    },
    mailItem: {
      // flexDirection: "row",
      padding: 10,
      marginVertical: 2,
      // marginHorizontal: 1,
      backgroundColor: 'white',
    },
    smallImage: {
      width: 90,
      height: 90,
      margin: 10,
      borderRadius: 50,
      flex: 1,
      marginLeft: "37%"
    },
    smallIcon: {
      width: 90,
      height: 90,
      margin: 10,
    },
    gifIcon: {
      width: 100,
      height: 100,
      margin: 10,
      borderRadius: 30
    },
    treasureThumbnail:{
      flex: 1,
      resizeMode: 'cover',
      aspectRatio: 1,
      height: '100%',
      // height: '100%',

      // width: '100%',
      // height: '80%',
    },
    treasureCard:{
      flex: 1,
      borderRadius: 20,
      borderWidth: 0,
      padding: 0,
      // backgroundColor: '#000000',
    },
    regularProfile: {
      width: 150,
      height: 150,
      borderRadius: 100,
    },
    listItemText: {
      fontSize: 20,
      fontWeight: '500',
      marginTop: 10,
      paddingTop: 20,
      width: '55%',
      marginLeft: 15
    },
    regularTreasure:{
      width: 150,
      height: 150,
      margin: 10,
    },
    centeredView: {
      // flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      backgroundColor: "#a5c6ff",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      margin: 1,
    },
    headerButton: {
      backgroundColor: "#a5c6ff",
      borderRadius: 20,
      padding: 2,
    },
    buttonOpen: {
      backgroundColor: "#a5c6ff",
    },
    buttonClose: {
      backgroundColor: "#ffcc77",
    },
    logButton: {
      backgroundColor: "pink",
      borderRadius: 30,
      padding: 15,
      marginTop: 20
    },
    textLog: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 20
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    input: {
      maxHeight: 100,
      width: 250,
      margin: 5,
      borderWidth: 1,
      padding: 10,
      borderRadius: 20
    },
    loginInput: {
      height: 50,
      width: 250,
      margin: 10,
      borderWidth: 1,
      padding: 10,
      borderRadius: 25,
      paddingTop: 13,
      backgroundColor: 'white',
      borderColor: 'white'
    },
    modalText: {
      marginBottom: 1,
      textAlign: "center"
    }
    
  });


export {styles};