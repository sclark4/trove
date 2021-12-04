
import React, {useState} from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './navigation/Navigation';
import TreasuresNavigator from './navigation/TreasuresNavigator';
import VaultsNavigator from './navigation/VaultsNavigator';
import HomeScreen from './screens/HomeScreen';
import VaultScreen from './screens/VaultScreen';


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

// Base Data
const testVaults = ['Arts', 'Crafts', 'Food', 'Gatherings', 'Outdoors'];

// Individual treasure
// Date* (* = required)
// Title*
// Photo, video, text, link, or audio file*
// Time
// Location
// Description
// Tags


const testTreasures = 
[
 {'user': 'finz@gmail.com',
  'date': new Date(2021, 10, 29, 10, 43, 12, 1234), 
  'title': 'Taza Chocolate',
  'tags': ['Food', 'chocolate'],
  'description': 'Want to join me for a Taza Chocolate tour next weekend?'
 },
 {'user': 'aardvark@gmail.com',                         
  'date': new Date(2021, 10, 29, 13, 12, 46, 1234), 
  'title': 'Taza Chocolate 2',
  'tags': ['Food', 'chocolate'], 
  'description': "I'm up for the chocolate tour!"
 }, 
 {'user': 'emerm@yahoo.com',                    
  'date': new Date(2021, 10, 29, 17, 33, 52, 1234), 
  'title': 'friday night',
  'tags': ['gatherings', 'friday'], 
  'description': 'Anyone want to play whist on Friday night?', 
 }, 
 {'user': 'ccameronk@gmail.com',                        
  'date': new Date(2021, 10, 30, 8, 7, 24, 1234), 
  'title': 'Chocolate',
  'tags': ['food', 'chocolate'],
  'description': '+1 for Taza'
 }, 
 {'user': 'flyer@gmail.com',                        
  'date': new Date(2021, 11, 1, 20, 9, 37, 1234), 
  'title': 'blue hills hiking',
  'tags': ['hiking', 'outdoors'],
  'description': "I know it's cold, but it's still a great time for a Blue Hills hike. Anyone want to join me on Sunday morning?"
 }, 
 {'user': 'emerm@yahoo.com',                    
  'date': new Date(2021, 11, 1, 20, 10, 14, 1234), 
  'title': 'forest nuts', 
  'tags': ['foraging', 'outdoors'],
  'description': 'Late fall is a great time to go foraging for forest nuts. Who wants to act like a squirrel with me?'
 }, 
 {'user': 'aa108@wellesley.edu',                         
  'date': new Date(2021, 11, 2, 9, 47, 18, 1234), 
  'title': 'thanksgiving', 
  'tags': ['food', 'pumpkin'],
  'description': "Thanksgiving may be over, but there are still so many pumpkin recipes to explore! I'll be making a pumpkin-based feast this weekend. Join me!"
 },
 {'user': 'ggecko@wellesley.edu',                         
  'date': new Date(2021, 11, 2, 10, 52, 31, 1234), 
  'title': 'pumpkin pie',
  'tags': ['food', 'pumpkin'], 
  'description': "I *love* pumpkin. Count me in!!!"
 },

];

export default function App() {
  const [treasures, setTreasures] = useState(testTreasures.map( addTimestamp ));
  const [loggedInUser, setLoggedInUser] = React.useState('testUser');

  function addTimestamp(item) {
    // Add millisecond timestamp field to message 
    return {...item, timestamp:item.date.getTime()}
  } 
  return (
    // <NavigationContainer>
    //   <Navigation />
    // </NavigationContainer>
    <NavigationContainer>
    <Stack.Navigator screenProps = {{test:'testing 1 2 3'}}>
      <Stack.Screen name="Main" component={Navigation} options={{ headerShown: false }} initialParams={{treasures: treasures}}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="TreasuresNav" component={TreasuresNavigator} options={{ headerShown: false }} initialParams={{treasures: treasures}}/>
      <Stack.Screen name="VaultsNav" component={VaultsNavigator} options={{ headerShown: false }}/>
    </Stack.Navigator>
        {/* {loggedInUser ? 
      (<Stack.Screen name="Main" component={Navigation} options={{ headerShown: false }}/>) : 
        (<>
      <Stack.Screen name="Main" component={Navigation} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TreasuresNav" component={TreasuresNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="VaultsNav" component={VaultsNavigator} options={{ headerShown: false }}/> </>)
    } */}
    
  </NavigationContainer>

  );
}