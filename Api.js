import * as firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-3o1KcnPZH3VvjoZXkUUxwZzFJVzPZq0 ",
  authDomain: "yesteryear-d4e97.firebaseapp.com",
  databaseURL: "https://yesteryear-d4e97.firebaseio.com",
  projectId: "yesteryear-d4e97",
  storageBucket: "",
  messagingSenderId: "321572682095",
  appId: "1:321572682095:android:014e1db4c2599ce6"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { firebase, db };
