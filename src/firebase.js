import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

  var config = {
    apiKey: "AIzaSyBRAFb5vAKZiVHXgPKMU6vwJJFsYTTWL-0",
    authDomain: "devapps-5c8a1.firebaseapp.com",
    databaseURL: "https://devapps-5c8a1.firebaseio.com",
    projectId: "devapps-5c8a1",
    storageBucket: "devapps-5c8a1.appspot.com",
    messagingSenderId: "84009135031"
  };
export const app = firebase.initializeApp(config);
export const db = firebase.firestore();