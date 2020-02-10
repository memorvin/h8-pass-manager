import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "p455manager.firebaseapp.com",
  databaseURL: "https://p455manager.firebaseio.com",
  projectId: "p455manager",
  storageBucket: "p455manager.appspot.com",
  messagingSenderId: "567077590522",
  appId: "1:567077590522:web:a9322687ba62ab0ff18043"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const baseDb = firebaseApp.firestore();
export const db = baseDb;

export default firebaseApp