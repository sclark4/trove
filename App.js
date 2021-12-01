
import React from 'react';
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
export default function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  return (
    // <NavigationContainer>
    //   <Navigation />
    // </NavigationContainer>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Navigation} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="TreasuresNav" component={TreasuresNavigator} options={{ headerShown: false }}/>
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