// import firebase libraries
import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore'
import {
  getAuth
} from 'firebase/app'

// setup connection to firebase
const firebaseConfig = {
    apiKey: "AIzaSyCvix8gWSjyc5qZvdwAiz4fNlkgUclPy1s",
    authDomain: "internship-automation-process.firebaseapp.com",
    projectId: "internship-automation-process",
    storageBucket: "internship-automation-process.appspot.com",
    messagingSenderId: "884525502818",
    appId: "1:884525502818:web:199d2dbb5c1fd87c101c3b"
  };
  
  // init firebase
  initializeApp(firebaseConfig);
  
  // init services
  const db = getFirestore();
  const auth = getAuth()
  
  // collection refs
  const colRef = collection(db, 'users');