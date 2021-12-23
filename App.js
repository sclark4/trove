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
         query, where, getDocs, DocumentReference
  } from "firebase/firestore";

  import { // access to Firebase storage features (for files like images, video, etc.)
    getStorage, 
   ref, uploadBytes, uploadBytesResumable, getDownloadURL
  } from "firebase/storage";

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
const storage = getStorage(firebaseApp, firebaseConfig.storageBucket) // for storaging images in Firebase storage
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function emailOf(user) {
  if (user) {
    return user.email;
  } else {
    return null;
  }
}

//Test Data
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
  //  'birthday': '1/01/2021',
   'email': 'wendy@wellesley.edu'
  }
];

export default function App() {
  LogBox.ignoreLogs([
    'Setting a timer',
    'AsyncStorage',                                	 
]);
  const [treasures, setTreasures] = useState([]);
  const [allTreasures, setAllTreasures] = useState([]);
  const [vaults, setVaults] = useState([]);
  const [allVaults, setAllVaults] = useState([]);
  const [mail, setMail] = useState([]);
  const [mailCount, setMailCount] = useState(0);

  const [accounts, setAccounts] = useState(testAccounts);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  //probably also buggy
  const [currentUserInfo, setCurrentUserInfo] = React.useState();

  const addTreasure = (newTreasure) => postTreasure(newTreasure);
  const deleteTreasure = (currentId) => firebaseDeleteTreasure(currentId);
  const shareTreasure = (newMail) => postMail(newMail);
  const updateTreasure = (updated) => putTreasure(updated);
  // const addTreasureToVault = (updatedVault) => putVault(updatedVault);

  const acceptMail = (accepted) => acceptTreasure(accepted); 
  const rejectMail = (currentId) => deleteMail(currentId); 

  const addVault = (newVault) => postVault(newVault);
  const updateVault = (updated) => putVault(updated);
  const deleteVault = (currentId) => firebaseDeleteVault(currentId);
  
  const updateAccount = (updated) => setAccounts([updated, ...(accounts.filter(account => account.email !== updated.email))]);
  const deleteAccount = (currentId) => setAccounts(accounts.filter(account => account.email !== currentId));
  
  const getFirebaseData = () => loadFirebaseData()

  useEffect(() => {
    // Anything in here is fired on component mount.
    console.log('Component did mount');
    console.log(`on mount: emailOf(auth.currentUser)=${emailOf(auth.currentUser)}`);
    console.log(`on mount: emailOf(loggedInUser)=${emailOf(loggedInUser)}`);
    checkEmailVerification();
    // loadFirebaseData();
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
          console.log(`signInUserEmailPassword: emailOf(loggedInUser)1=${loggedInUser}`); 

          // Only log in auth.currentUser if their email is verified
          checkEmailVerification();
          // loadFirebaseData();
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
        console.log('logged in',loggedInUser)
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
  
  const treasuresProps = { getFirebaseData, treasures, allTreasures, addTreasure, deleteTreasure, shareTreasure, updateTreasure };
  const mailProps = { mail, mailCount, acceptMail, rejectMail };
  const vaultProps = { getFirebaseData, vaults, allVaults, addVault, updateVault, deleteVault};
  const loginProps = { loggedInUser, email, password, errorMsg, setEmail, setPassword, signUpUserEmailPassword, signInUserEmailPassword, logOut, formatJSON };
  const settingsProps = { accounts, updateAccount, deleteAccount };
 const firebaseProps = {auth, storage, db};
  const screenProps = { firebaseProps, treasuresProps, vaultProps, mailProps, loginProps, settingsProps };
  function addTimestamp(item) {
    // Add millisecond timestamp field to message 
    const currentTime = new Date();
    return {...item, timestamp:currentTime.getTime()}
  }
  function loadFirebaseData() {
    if (loggedInUser!=null){
      getUserData(loggedInUser);
      getTreasures();
      getAllTreasures();
      getVaults();
      getAllVaults();
      getMail();
      setMailCount(mail.filter(item => item.accepted === false).length);
      console.log('Loading Firebase Data for:', loggedInUser)
    }
    else{
      console.log('Cannot load firebase data for', loggedInUser)
    }
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
      // 'birthday': data.birthday, 
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

  async function getAllTreasures() {
    const q = query(collection(db, "treasures"));
    console.log("get all treasures")
    const querySnapshot = await getDocs(q);
    let treasures = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      treasures.push(data)
    });
    setAllTreasures(treasures);
  }

  async function postTreasure(newTreasure) {
    const timestampString = newTreasure.id.toString();
      await setDoc(doc(db, "treasures", timestampString), 
        { 'user': newTreasure.user,
          'author': newTreasure.author, 
          'date': newTreasure.date,
          'title': newTreasure.title,
          'link': newTreasure.link,
          // 'tags': newTreasure.tags, 
          'description': newTreasure.description,
          'id': timestampString,
          'image': newTreasure.image,
        }
      );
      setTreasures([newTreasure, ...treasures ]);
    console.log("Successfully added new treasure to account:", newTreasure.user )
  }

  async function putTreasure(updated) {
    // Update an existing document in collection "treasures"
    await setDoc(doc(db, "treasures", updated.id), 
        { 'user': updated.user,
          'author': updated.author, 
          'date': updated.date,
          'title': updated.title,
          'link': updated.link,
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

  async function postMail(newMail) {
    // Add a new document in collection "mail"   
    const timestampString = newMail.id.toString();
    await setDoc(doc(db, "mail", timestampString), 
          {'receiver': newMail.receiver, 
          'sender': newMail.sender,                     
          'date': newMail.date,
          'note': newMail.note,
          'tid': newMail.tid,
          'id': timestampString,
          'accepted': false,
        }
      );
    console.log("Successfully sent mail to user:", newMail.receiver )
  }

  
  async function acceptTreasure(accepted) {
    // Find Incoming Treasure Information
    const treasure = allTreasures.find(treasure => treasure.id == accepted.tid)
    const newTreasure = 
    { 'user': loggedInUser,
    'author': treasure.author, 
    'date': treasure.date,//new Date(2021, 11, 2, 10, 52, 31, 1234), 
    'title': treasure.title,
    // 'tags': newTreasure.tags, 
    'link': treasure.link,
    'description': treasure.description,
    'id': Date.now(),
    'image': treasure.image,
  }
  // Add to current Treasures
    postTreasure(newTreasure)

    //Update Mail Item to reflect acceptance
    await setDoc(doc(db, "mail", accepted.id), 
          {'receiver': accepted.receiver, 
          'sender': accepted.sender,                     
          'date': accepted.date,
          'note': accepted.note,
          'tid': accepted.tid,
          'id': accepted.id,
          'accepted': true,
        }
      );
    //Update local storage
    setMail([...(mail.filter(item => item.id !== accepted.id)), accepted]);
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

  async function getAllVaults() {
    const q = query(collection(db, "vaults"));
    console.log("get all vaults")
    const querySnapshot = await getDocs(q);
    let vaults = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      vaults.push(data)
    });
    setAllVaults(vaults);
  }

  async function postVault(newVault) {
    // Add a new document in collection "vaults"
    setVaults([newVault, ...vaults ])
    const timestampString = newVault.id.toString();
    await setDoc(doc(db, "vaults", timestampString), 
        { 'user': newVault.user,
          'title': newVault.title,
          'id': timestampString,
          'treasures': newVault.treasures
        }
      );
    setVaults([newVault, ...vaults ]);
    console.log("Successfully added new treasure to vault:", newVault.user )
  }

  async function putVault(updated) {
    // Update an existing document in collection "vaults"
    await setDoc(doc(db, "vaults", updated.id), 
        // { 'user': updated.user,
        //   'title': updated.title,
        //   'id': updated.id,
        //   'treasures': updated.treasures
        // }
        updated
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