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


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
    },
    paragraph: {
      margin: 4,
      marginTop: 0,
      fontSize: 14,
      fontWeight: '300',
      textAlign: 'center',
      // fontFamily: 'Karla_500Medium',
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
      height: '80%', 
      width: '100%',
    },
    listItem: {
      flexDirection: "row",
      padding: 10,
      marginVertical: 2,
      marginHorizontal: 1,
      backgroundColor: 'white',
    },
    smallImage: {
      width: 90,
      height: 90,
      margin: 10,
      borderRadius: 50,
    },
    regularProfile: {
      width: 150,
      height: 150,
      borderRadius: 100,
    },
    listItemText: {
      fontSize: 30,
      marginTop: 10,
      paddingTop: 20,
      width: '55%'
    },
    regularTreasure:{
      width: '95%',
    },
  });


export {styles};