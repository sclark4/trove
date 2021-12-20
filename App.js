import React, {useState, useContext, useEffect, useRef} from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import Navigation from './navigation/Navigation';
import TreasuresNavigator from './navigation/TreasuresNavigator';
import VaultsNavigator from './navigation/VaultsNavigator';
import MailNavigator from './navigation/MailNavigator';

import LoginScreen from './screens/LoginScreen';
import NotificationScreen from './screens/NotificationScreen';
import VaultScreen from './screens/VaultScreen';
import TreasuresScreen from './screens/TreasuresScreen';

import StateContext from './StateContext.js';
import { initializeApp } from "firebase/app";
import { // access to authentication features:
         getAuth, 
         // for email/password authentication: 
         createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification,
         // for logging out:
         signOut
  } from "firebase/auth";

import { // access to Firestore storage features:
         getFirestore, 
         // for storage access
         collection, doc, addDoc, setDoc, deleteDoc,
         query, where, getDocs, getDoc, DocumentReference
  } from "firebase/firestore";

const Stack = createNativeStackNavigator();

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

const testAccounts = [
  {'firstName': 'Wendy',
   'lastName': 'Wellesley',
   'birthday': '1/01/2021',
   'email': 'wendy@wellesley.edu'
  }
];

export default function App() {
  LogBox.ignoreLogs([
    'Setting a timer',
    'AsyncStorage',                                	 
]);
  const [treasures, setTreasures] = useState(testTreasures);
  const [vaults, setVaults] = useState(testVaults);
  const [mail, setMail] = useState(testMail);

  const [accounts, setAccounts] = useState(testAccounts);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  //probably also buggy
  const [currentUserInfo, setCurrentUserInfo] = React.useState();

  const addTreasure = (newTreasure) => postTreasure(newTreasure);
  // const addTreasure = (newTreasure) => setTreasures([newTreasure.map(addTimestamp), ...treasures ])

  const deleteTreasure = (currentId) => firebaseDeleteTreasure(currentId)//setTreasures(treasures.filter(treasure => treasure.id !== currentId))
  const shareTreasure = (newMail) => postMail(newMail)
  const updateTreasure = (updated) => putTreasure(updated);
  //setTreasures([updated, ...(treasures.filter(treasure => treasure.id !== updated.id))]);
// TO DO: implement add accepted mail to trove
  const acceptMail = (accepted) => setMail([...(mail.filter(treasure => treasure.id !== accepted.id)), accepted]);
  const rejectMail = (currentId) => deleteMail(currentId) // setMail(mail.filter(mail => mail.id != currentId));

  const addVault = (newVault) => postVault(newVault);
  const updateVault = (updated) => putVault(updated);
  const deleteVault = (currentId) => firebaseDeleteVault(currentId)
  
  const updateAccount = (updated) => setAccounts([updated, ...(accounts.filter(account => account.email !== updated.email))]);
  const deleteAccount = (currentId) => setAccounts(accounts.filter(account => account.email !== currentId));
  
  const getFirebaseData = () => loadFirebaseData()

  useEffect(() => {
    // Anything in here is fired on component mount.
    console.log('Component did mount');
    console.log(`on mount: emailOf(auth.currentUser)=${emailOf(auth.currentUser)}`);
    console.log(`on mount: emailOf(loggedInUser)=${emailOf(loggedInUser)}`);
    checkEmailVerification();
    return () => {
      // Anything in here is fired on component unmount.
      console.log('Component did unmount');
      console.log(`on unmount: emailOf(auth.currentUser)=${emailOf(auth.currentUser)}`);
      console.log(`on unmount: emailOf(loggedInUser)=${emailOf(loggedInUser)}`);
    }
  }, [])

  // Clear error message when email is updated to be nonempty
  useEffect(
    () => { if (email != '') setErrorMsg(''); },
    [email]
  ); 

  const signUpUserEmailPassword = 
    function signUpUserEmailPassword() {
      console.log('called signUpUserEmailPassword');
      if (auth.currentUser) {
        signOut(auth); // sign out auth's current user (who is not loggedInUser, 
                      // or else we wouldn't be here
      }
      if (!email.includes('@')) {
        alert('Not a valid email address');
        setErrorMsg('Not a valid email address');
        return;
      }
      if (password.length < 6) {
        alert('Password too short');
        setErrorMsg('Password too short');
        return;
      }

    // Invoke Firebase authentication API for Email/Password sign up 
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(`signUpUserEmailPassword: sign up for email ${email} succeeded (but email still needs verification).`);

        // Clear email/password inputs
        const savedEmail = email; // Save for email verification
        setEmail('');
        setPassword('');

        // Note: could store userCredential here if wanted it later ...
        // console.log(`createUserWithEmailAndPassword: setCredential`);
        // setCredential(userCredential);

        // Send verication email
        console.log('signUpUserEmailPassword: about to send verification email');
        sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log('signUpUserEmailPassword: sent verification email');
            alert(`A verification email has been sent to ${savedEmail}. You will not be able to sign in to this account until you click on the verification link in that email.`); 
            setErrorMsg(`A verification email has been sent to ${savedEmail}. You will not be able to sign in to this account until you click on the verification link in that email.`); 
            // Email verification sent!
            // ...
          });
      })
      .catch((error) => {
        console.log(`signUpUserEmailPassword: sign up failed for email ${email}`);
        alert('Account already exists')
        const errorMessage = error.message;
        // const errorCode = error.code; // Could use this, too.
        console.log(`createUserWithEmailAndPassword: ${errorMessage}`);
        setErrorMsg(`createUserWithEmailAndPassword: ${errorMessage}`);
      });
  }

  const signInUserEmailPassword =
    function signInUserEmailPassword() {
      console.log('called signInUserEmailPassword');
      console.log(`signInUserEmailPassword: emailOf(currentUser)0=${emailOf(auth.currentUser)}`); 
      console.log(`signInUserEmailPassword: emailOf(loggedInUser)0=${emailOf(loggedInUser)}`); 
      // Invoke Firebase authentication API for Email/Password sign in 
      // Use Email/Password for authentication 
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(`signInUserEmailPassword succeeded for email ${email}; have userCredential for emailOf(auth.currentUser)=${emailOf(auth.currentUser)} (but may not be verified)`); 
          console.log(`signInUserEmailPassword: emailOf(currentUser)1=${emailOf(auth.currentUser)}`); 
          console.log(`signInUserEmailPassword: emailOf(loggedInUser)1=${emailOf(loggedInUser)}`); 

          // Only log in auth.currentUser if their email is verified
          checkEmailVerification();
          loadFirebaseData();
          // Clear email/password inputs 
          setEmail('');
          setPassword('');

          // Note: could store userCredential here if wanted it later ...
          // console.log(`createUserWithEmailAndPassword: setCredential`);
          // setCredential(userCredential);
      
          })
        .catch((error) => {
          console.log(`signUpUserEmailPassword: sign in failed for email ${email}`);
          alert('Wrong email or password')
          const errorMessage = error.message;
          // const errorCode = error.code; // Could use this, too.
          console.log(`signInUserEmailPassword: ${errorMessage}`);
          setErrorMsg(`signInUserEmailPassword: ${errorMessage}`);
        });

  }

  function checkEmailVerification() {
    if (auth.currentUser) {
      console.log(`checkEmailVerification: auth.currentUser.emailVerified=${auth.currentUser.emailVerified}`);
      if (auth.currentUser.emailVerified) {
        console.log(`checkEmailVerification: setLoggedInUser for ${auth.currentUser.email}`);
        setLoggedInUser(auth.currentUser.email);
        // Load Firebase Data for user
        loadFirebaseData();
        console.log("checkEmailVerification: setErrorMsg('')")
        setErrorMsg('')
      } else {
        console.log('checkEmailVerification: remind user to verify email');
        alert(`You cannot sign in as ${auth.currentUser.email} until you verify that this is your email address. You can verify this email address by clicking on the link in a verification email sent by this app to ${auth.currentUser.email}.`)
        setErrorMsg(`You cannot sign in as ${auth.currentUser.email} until you verify that this is your email address. You can verify this email address by clicking on the link in a verification email sent by this app to ${auth.currentUser.email}.`)
      }
    }
  }

  const logOut = function logOut() {
    console.log('logOut'); 
    console.log(`logOut: emailOf(auth.currentUser)=${emailOf(auth.currentUser)}`);
    console.log(`logOut: emailOf(loggedInUser)=${emailOf(loggedInUser)}`);
    console.log(`logOut: setLoggedInUser(null)`);
    setLoggedInUser(null);
    console.log('logOut: signOut(auth)');
    signOut(auth); // Will eventually set auth.currentUser to null     
  }

  const formatJSON = function formatJSON() {
    // Lyn sez: replacing \n by <br/> not necesseary if use this CSS:
    //   white-space: break-spaces; (or pre-wrap)
    // let replacedNewlinesByBRs = prettyPrintedVal.replace(new RegExp('\n', 'g'), '<br/>')
    return JSON.stringify(loggedInUser, null, 2);
  }
  
  const treasuresProps = { getFirebaseData, treasures, addTreasure, deleteTreasure, shareTreasure, updateTreasure };
  const vaultProps = { getFirebaseData, vaults, addVault, updateVault, deleteVault};
  const mailProps = { mail, acceptMail, rejectMail };
  const loginProps = { loggedInUser, email, password, errorMsg, setEmail, setPassword, signUpUserEmailPassword, signInUserEmailPassword, logOut, formatJSON };
  const settingsProps = { accounts, updateAccount, deleteAccount };
  const screenProps = { treasuresProps, vaultProps, mailProps, loginProps, settingsProps };

  function addTimestamp(item) {
    // Add millisecond timestamp field to message 
    const currentTime = new Date();
    return {...item, timestamp:currentTime.getTime()}
  }
  function loadFirebaseData() {
    getUserData(loggedInUser);
    getTreasures();
    getMail();
    getVaults();
    console.log('Loading Firebase Data for:', loggedInUser)
  }
  
  async function getUserData(user) {
    const q = query(collection(db, "users"), where("email", "==", user));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data()
    const currentUser = {
      'email': data.email, 
      'firstName': data.firstName, 
      'lastName': data.lastName, // millsecond timestamp
      'birthday': data.birthday, 
    }
    // const subcolls = collection(doc.id, "treasures")
    // subcolls.forEach((c) => {
    //   console.log(c.id, " => ", c);
    // });
    return currentUser;
    });
  }

  async function getTreasures() {
    const q = query(collection(db, "treasures"), where("user", "==", loggedInUser));
    console.log("get treasures", loggedInUser)
    const querySnapshot = await getDocs(q);
    let treasures = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      treasures.push(data)
    });
    setTreasures(treasures);
  }
  async function postTreasure(newTreasure) {
    // Add a new document in collection "treasures"
    // treasure = newTreasure.map(addTimestamp)
    setTreasures([newTreasure, ...treasures ])
    const timestampString = newTreasure.id.toString();
    await setDoc(doc(db, "treasures", timestampString), 
        { 'user': newTreasure.user,
          'author': newTreasure.author, 
          'date': newTreasure.date,//new Date(2021, 11, 2, 10, 52, 31, 1234), 
          'title': newTreasure.title,
          // 'tags': newTreasure.tags, 
          'description': newTreasure.description,
          'id': newTreasure.id,
          'image': newTreasure.image,
        }
      );
    console.log("Successfully added new treasure to account:", newTreasure.user )
  }
  async function putTreasure(updated) {
    // Update an existing document in collection "treasures"
    await setDoc(doc(db, "treasures", updated.id), 
        { 'user': updated.user,
          'author': updated.author, 
          'date': updated.date,
          'title': updated.title,
          // 'tags': updated.tags, 
          'description': updated.description,
          'id': updated.id,
          'image': updated.image,
        }
    );
    setTreasures([updated, ...(treasures.filter(treasure => treasure.id !== updated.id))]);
    console.log("Successfully update treasure to account:", updated.user )
  }

  async function firebaseDeleteTreasure(id) {
    // Delete an existing document in collection "treasures"
    //Remove from firebase
    await deleteDoc(doc(db, "treasures", id));
    //Remove from local storage
    setTreasures(treasures.filter(treasure => treasure.id !== id))
    console.log("Permanently deleted treasure from account")
  }

  async function getMail() {
    const q = query(collection(db, "mail"), where("receiver", "==", loggedInUser));

    const querySnapshot = await getDocs(q);
    let mail = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      mail.push(data)
    });
    setMail(mail);
    console.log("You've got mail!", loggedInUser)

  }
// get treasure from other user and display it in mail

  // async function getMailTreasure(tid) {
  //   const q = query(collection(db, "treasures"), where("id", "==", tid));
  //   console.log("get single mail treasure", loggedInUser)
  //   const querySnapshot = await getDocs(q);
  //   let treasures = []
  //   querySnapshot.forEach(doc => {
  //     const data = doc.data()
  //     treasures.push(data)
  //   });
  //   setTreasures(treasures);
  // }

  async function postMail(newMail) {
    // Add a new document in collection "mail"   
    const timestampString = newMail.id.toString();
    await setDoc(doc(db, "mail", timestampString), 
          {'receiver': newMail.receiver, 
          'sender': newMail.sender,                     
          'date': newMail.date,
          'note': newMail.note,
          'tid': newMail.tid,
          'id': newMail.id,
          'accepted': false,
        }
      );
    console.log("Successfully sent mail to user:", newMail.receiver )
  }

  async function postTreasure(newTreasure) {
    // Add a new document in collection "treasures"
    // treasure = newTreasure.map(addTimestamp)
    setTreasures([newTreasure, ...treasures ])
    const timestampString = newTreasure.id.toString();
    await setDoc(doc(db, "treasures", timestampString), 
        { 'user': newTreasure.user,
          'author': newTreasure.author, 
          'date': newTreasure.date,//new Date(2021, 11, 2, 10, 52, 31, 1234), 
          'title': newTreasure.title,
          // 'tags': newTreasure.tags, 
          'description': newTreasure.description,
          'id': newTreasure.id,
          'image': newTreasure.image,
        }
      );
    console.log("Successfully added new treasure to account:", newTreasure.user )
  }
  
  async function acceptTreasure(accepted) {
    // Find Incoming Treasure Information

    // Add to current Treasures

    //Update local storage
    setMail([...(mail.filter(treasure => treasure.id !== accepted.id)), accepted]);

  }

  async function deleteMail(id) {
    // Delete an existing document in collection "mail"
    //Remove from firebase
    console.log(id)
    await deleteDoc(doc(db, "mail", id));
    //Remove from local storage
    setMail(mail.filter(mail => mail.id !== id))
    console.log("Permanently deleted mail from account")
  }
  async function getVaults() {
    const q = query(collection(db, "vaults"), where("user", "==", loggedInUser));
    console.log("get vaults", loggedInUser)
    const querySnapshot = await getDocs(q);
    let vaults = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      vaults.push(data)
    });
    setVaults(vaults);
  }
  async function postVault(newVault) {
    // Add a new document in collection "vaults"
    setVaults([newVault, ...vaults ])
    const timestampString = newVault.id.toString();
    await setDoc(doc(db, "vaults", timestampString), 
        { 'user': newVault.user,
          'title': newVault.title,
          'id': newVault.id
        }
      );
    console.log("Successfully added new treasure to vault:", newVault.user )
  }
  async function putVault(updated) {
    // Update an existing document in collection "vaults"
    await setDoc(doc(db, "vaults", updated.id), 
        { 'user': updated.user,
          'title': updated.title,
          'id': updated.id
        }
    );
    setVaults([updated, ...(vaults.filter(vault => vault.id !== updated.id))]);
    console.log("Successfully update vault to account:", updated.user )
  }

  async function firebaseDeleteVault(id) {
    // Delete an existing document in collection "vaults"
    //Remove from firebase
    await deleteDoc(doc(db, "vaults", id));
    //Remove from local storage
    setVaults(vaults.filter(vault => vault.id !== id))
    console.log("Permanently deleted vault from account")
  }

  return (
    <StateContext.Provider value={screenProps}>
    <NavigationContainer>
    <Stack.Navigator>
    {(loggedInUser === null) ? 
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/> : 
        (<>
      <Stack.Screen name="Main" component={Navigation} options={{ headerShown: false }}/>
      <Stack.Screen name="TreasuresNav" component={TreasuresNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="VaultsNav" component={VaultsNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="MailNav" component={MailNavigator} options={{ headerShown: false }}/>
      </>)
    }
    </Stack.Navigator>

  </NavigationContainer>
  </StateContext.Provider>

  );
}