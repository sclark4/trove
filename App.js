import React, {useState, useContext} from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './navigation/Navigation';
import TreasuresNavigator from './navigation/TreasuresNavigator';
import VaultsNavigator from './navigation/VaultsNavigator';
import MailNavigator from './navigation/MailNavigator';
import LoginNavigator from './navigation/LoginNavigator';

import LoginScreen from './screens/LoginScreen';
import NotificationScreen from './screens/NotificationScreen';

import VaultScreen from './screens/VaultScreen';
import TreasuresScreen from './screens/TreasuresScreen';
import StateContext from './StateContext.js';

const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { // access to authentication features:
         getAuth, 
         // for email/password authentication: 
         createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification,
         // for logging out:
         signOut
  } from "firebase/auth";
import { getFirestore, 
         collection, doc, addDoc, setDoc, getDocs
  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEkoQ2intp_sRaZblI_3G7W1mlVeFE3-k",
  authDomain: "trove-fb82c.firebaseapp.com",
  projectId: "trove-fb82c",
  storageBucket: "trove-fb82c.appspot.com",
  messagingSenderId: "499829125421",
  appId: "1:499829125421:web:c3b253aefde9616499e3a4",
  measurementId: "G-H7T9RJQRM8"
  };
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function formatJSON(jsonVal) {
  // Lyn sez: replacing \n by <br/> not necesseary if use this CSS:
  //   white-space: break-spaces; (or pre-wrap)
  // let replacedNewlinesByBRs = prettyPrintedVal.replace(new RegExp('\n', 'g'), '<br/>')
  return JSON.stringify(jsonVal, null, 2);
}

function emailOf(user) {
  if (user) {
    return user.email;
  } else {
    return null;
  }
}

//Test Data

const testTreasures = 
[
 {'user': 'finz@gmail.com',
  'id': 7,
  'date': "12/05/2021",
  'title': 'Taza Chocolate',
  'tags': ['Food', 'chocolate'],
  'description': 'Want to join me for a Taza Chocolate tour next weekend?'
 },
 {'user': 'aardvark@gmail.com',
  'id': 6,                         
  'date': "12/05/2021", //new Date(2021, 10, 29, 13, 12, 46, 1234), 
  'title': 'Taza Chocolate 2',
  'tags': ['Food', 'chocolate'], 
  'description': "I'm up for the chocolate tour!"
 }, 
 {'user': 'emerm@yahoo.com',
  'id': 5,             
  'date': "12/05/2021",//new Date(2021, 10, 29, 17, 33, 52, 1234), 
  'title': 'friday night',
  'tags': ['gatherings', 'friday'], 
  'description': 'Anyone want to play whist on Friday night?', 
 }, 
 {'user': 'ccameronk@gmail.com',
 'id': 4,                        
  'date': "12/05/2021",//new Date(2021, 10, 30, 8, 7, 24, 1234), 
  'title': 'Chocolate',
  'tags': ['food', 'chocolate'],
  'description': '+1 for Taza'
 }, 
 {'user': 'flyer@gmail.com',
  'id': 3,                  
  'date': "12/05/2021",//new Date(2021, 11, 1, 20, 9, 37, 1234), 
  'title': 'blue hills hiking',
  'tags': ['hiking', 'outdoors'],
  'description': "I know it's cold, but it's still a great time for a Blue Hills hike. Anyone want to join me on Sunday morning?"
 }, 
 {'user': 'emerm@yahoo.com',
  'id': 2,                    
  'date': "12/05/2021",//new Date(2021, 11, 1, 20, 10, 14, 1234), 
  'title': 'forest nuts', 
  'tags': ['foraging', 'outdoors'],
  'description': 'Late fall is a great time to go foraging for forest nuts. Who wants to act like a squirrel with me?'
 }, 
 {'user': 'aa108@wellesley.edu',  
  'id': 1,                       
  'date': "12/05/2021",//new Date(2021, 11, 2, 9, 47, 18, 1234), 
  'title': 'thanksgiving', 
  'tags': ['food', 'pumpkin'],
  'description': "Thanksgiving may be over, but there are still so many pumpkin recipes to explore! I'll be making a pumpkin-based feast this weekend. Join me!"
 },
 {'user': 'ggecko@wellesley.edu',                         
  'date': "12/05/2021",//new Date(2021, 11, 2, 10, 52, 31, 1234), 
  'title': 'pumpkin pie',
  'tags': ['food', 'pumpkin'], 
  'description': "I *love* pumpkin. Count me in!!!",
  'id': 0,
 },

];

const testMail = 
[
  {'sender': 'Abigail', 'note': 'Here you go!', 'accepted':false, 'date':'12/08/2021', 'tid':'1', 'id':'1', 'receiver':'ww1',},
  {'sender': 'Bethany', 'note': 'For you!', 'accepted':true, 'date':'12/08/2021', 'tid':'2', 'id':'2', 'receiver':'ww1',},
  {'sender': 'Catherine', 'note': 'I miss you friend!', 'accepted':false, 'date':'12/08/2021', 'tid':'3', 'id':'3', 'receiver':'ww1',},
  {'sender': 'Deborah', 'note': 'What a great day', 'accepted':true, 'date':'12/08/2021', 'tid':'4','id':'4', 'receiver':'ww1',},
  {'sender': 'Elizabeth', 'note': 'This one is just for you', 'accepted':false, 'date':'12/08/2021', 'tid':'5', 'id':'5','receiver':'ww1',},
  {'sender': 'Frances', 'note': 'Here you go!', 'accepted':false, 'date':'12/08/2021', 'tid':'6', 'id':'6',  'receiver':'ww1',},
  {'sender': 'Georgia', 'note': 'Happy memories from last summer', 'accepted':true, 'date':'12/08/2021', 'tid':'7', 'id':'7', 'receiver':'ww1',},
  {'sender': 'Harriet', 'note': 'one of my favorite moments with you', 'accepted':true, 'date':'12/08/2021', 'tid':'8', 'id':'8', 'receiver':'ww1',},
];

const testVaults = [
  {'user': 'wendy@wellesley.edu',
   'id': 1,
   'title': 'Senior Year at Wellesley',
   'treasures': []
  },
  {'user': 'wendy@wellesley.edu',
   'id': 2,
   'title': 'Christmas',
   'treasures': []
  },
  {'user': 'wendy@wellesley.edu',
   'id': 3,
   'title': 'Study Abroad',
   'treasures': []
  },
  {'user': 'wendy@wellesley.edu',
   'id': 4,
   'title': 'East Side Schenanigans',
   'treasures': []
  },
  {'user': 'wendy@wellesley.edu',
   'id': 5,
   'title': 'Holiday Festivities 2021',
   'treasures': []
  },
];

export default function App() {
  LogBox.ignoreLogs([
    'Setting a timer',
    'AsyncStorage',                                	 
]);

  const [treasures, setTreasures] = useState(testTreasures);
  const [vaults, setVaults] = useState(testVaults);
  const [mail, setMail] = useState(testMail);
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const addTreasure = (newTreasure) => setTreasures([newTreasure, ...treasures ])
  const deleteTreasure = (currentId) => setTreasures(treasures.filter(treasure => treasure.id !== currentId))
  const shareTreasure = (newMail) => setMail([newMail, ...mail])
  const updateTreasure = (updated) => setTreasures([updated, ...(treasures.filter(treasure => treasure.id !== updated.id))]);

// TO DO: implement add accepted mail to trove
  const acceptMail = (accepted) => setMail([...(mail.filter(treasure => treasure.id !== accepted.id)), accepted]);
  const rejectMail = (currentId) => setMail(mail.filter(mail => mail.id != currentId));


  const addVault = (newVault) => setVaults([newVault, ...vaults ]);
  const updateVault = (updated) => setVaults([updated, ...(vaults.filter(vault => vault.id !== updated.id))]);
  const deleteVault = (currentId) => setVaults(vaults.filter(vault => vault.id !== currentId));

  const treasuresProps = { treasures, addTreasure, deleteTreasure, shareTreasure, updateTreasure };
  const vaultProps = { vaults, addVault, updateVault, deleteVault};
  const mailProps = { mail, acceptMail, rejectMail };
  const screenProps = {treasuresProps, vaultProps, mailProps}
  function addTimestamp(item) {
    // Add millisecond timestamp field to message 
    return {...item, timestamp:item.date.getTime()}
  }

  return (
    <StateContext.Provider value={screenProps}>
    <NavigationContainer>
    <Stack.Navigator>
    {(loggedInUser === null) ? 
      <Stack.Screen name="LoginNav" component={LoginNavigator} options={{ headerShown: false }}/> : 
        (<>
      <Stack.Screen name="Main" component={Navigation} options={{ headerShown: false }}/>
      <Stack.Screen name="TreasuresNav" component={TreasuresNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="VaultsNav" component={VaultsNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="MailNav" component={MailNavigator} options={{ headerShown: false }}/>
      </>)
    }
      {/* <Stack.Screen name="Main" component={Navigation} options={{ headerShown: false }}/>
      <Stack.Screen name="LoginNav" component={LoginNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="TreasuresNav" component={TreasuresNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="VaultsNav" component={VaultsNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="MailNav" component={MailNavigator} options={{ headerShown: false }}/> */}
    </Stack.Navigator>
    
        
    
  </NavigationContainer>
  </StateContext.Provider>

  );
}

 /***************************************************************************
   FIREBASE INTEGRATION CODE
  ***************************************************************************/

  // // Update data when loggedInUser
  // useEffect(
  //   () => { 
  //     getDataForUser(loggedInUser); 
  //   },
  //   // [selectedChannel, localMessageDB]
  // ); 

  // function toggleStorageMode() {
  //   setUsingFirestore(!usingFirestore);
  // }

  // /* 
  //  import { collection, query, where, getDocs } 
  //  const q = query(collection(db, "cities"), where("capital", "==", true));
  //  const querySnapshot = await getDocs(q);
  // */ 

  // async function getMessagesForChannel(chan) {
  //   console.log(`getMessagesForChannel(${chan}); usingFirestore=${usingFirestore}`);
  //   if (usingFirestore) {
  //     firebaseGetMessagesForChannel(chan); 
  //   } else {
  //     setSelectedMessages(localMessageDB.filter( msg => msg.channel === chan));
  //   }
  // }

  // function docToMessage(msgDoc) {
  //   // msgDoc has the form {id: timestampetring, 
  //   //                   data: {timestamp: ..., 
  //   //                          author: ..., 
  //   //                          channel: ..., 
  //   //                          content: ...}
  //   // Need to add missing date field to data portion, reconstructed from timestamp
  //   console.log('docToMessage');
  //   const data = msgDoc.data();
  //   console.log(msgDoc.id, " => ", data);
  //   return {...data, date: new Date(data.timestamp)}
  // }

  // async function firebaseGetTreasures(chan) {
  //   const q = query(collection(db, 'messages'), where('channel', '==', chan));
  //   const querySnapshot = await getDocs(q);
  //   // const messages = Array.from(querySnapshot).map( docToMessage );
  //   let messages = []; 
  //   querySnapshot.forEach(doc => {
  //       messages.push(docToMessage(doc));
  //   });
  //   setSelectedMessages( messages );
  // }


  // function postMessage() {
  //   console.log(`postMessage; usingFirestore=${usingFirestore}`);
  //   const now = new Date();
  //   const newMessage = {
  //     'author': loggedInUser.email, 
  //     'date': now, 
  //     'timestamp': now.getTime(), // millsecond timestamp
  //     'channel': selectedChannel, 
  //     'content': textInputValue, 
  //   }
  //   if (usingFirestore) {
  //     firebasePostMessage(newMessage);
  //   } else {
  //     setLocalMessageDB([...localMessageDB, newMessage]);
  //     setIsComposingMessage(false);
  //   }
  //   setTextInputValue('');
  // }

  // async function firebasePostMessage(msg) {
  //   // Add a new document in collection "messages"
  //   const timestampString = msg.timestamp.toString();
  //   await setDoc(doc(db, "messages", timestampString), 
  //       {
  //         'timestamp': msg.timestamp, 
  //         'author': msg.author, 
  //         'channel': msg.channel, 
  //         'content': msg.content, 
  //       }
  //     );
  // }

  // async function populateFirestoreDB(messages) {

  //   // Returns a promise to add message to firestore
  //   async function addMessageToDB(message) {
  //     const timestamp = message.date.getTime(); // millsecond timestamp
  //     const timestampString = timestamp.toString();

  //     // Add a new document in collection "messages"
  //     return setDoc(doc(db, "messages", timestampString), 
  //       {
  //         'timestamp': timestamp, 
  //         'author': message.author, 
  //         'channel': message.channel, 
  //         'content': message.content, 
  //       }
  //     );
  //   }

  //   // Peform one await for all the promises. 
  //   await Promise.all(
  //     messages.map( addMessageToDB ) 
  //   );

  // }