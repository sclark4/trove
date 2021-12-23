import {StyleSheet } from "react-native";

// red:#f26b5b
// darkpink: #ff7fad
// light pink: #ffdddd
// light red: #ffa393
// yellow: #ffcc77
// blue: #a5c6ff 

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
    setDate: {
      fontSize: 500,
      margin: 10,
      padding: 10,
      fontWeight: '700',
      textAlign: 'center',
    },
    logo: {
      height: 128,
      width: 128,
    },
    listWrapper: {
      maxHeight: '75%', 
      width: '100%',
      marginBottom: '50%',
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
      width:'100%',
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
      // fontWeight: 'bold',
      color: "#5c5c5c",
      marginTop: 10,
      paddingTop: 20,
      width: '55%',
      marginLeft: 15
    },
    regularTreasure:{
      width: 220,
      height: 220,
      margin: 10,
      borderRadius: 10,
      borderColor: '#ffffff',
      borderWidth: 5,
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
      marginTop: 10
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
      borderRadius: 20,
      marginBottom: 15
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
      textAlign: "center",
      marginTop: 15
    }
    
  });


export {styles};