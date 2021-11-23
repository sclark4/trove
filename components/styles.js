import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
    },
    paragraph: {
      margin: 24,
      marginTop: 0,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    logo: {
      height: 128,
      width: 128,
    },
    listWrapper: {
      height: '90%', 
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
    listItemText: {
      fontSize: 30,
      marginTop: 10,
      paddingTop: 20,
      width: '55%'
    }
  });


export {styles};