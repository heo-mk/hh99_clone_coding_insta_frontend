import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA5IHNyCQTuj4wQ1d3zUACKB6RhlYDdVjM",
  authDomain: "instagram-bradlee.firebaseapp.com",
  projectId: "instagram-bradlee",
  storageBucket: "instagram-bradlee.appspot.com",
  messagingSenderId: "942465027200",
  appId: "1:942465027200:web:52572f5a78d5faa4b52a65",
  measurementId: "G-8L1G4EJXJJ"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const storage = firebase.storage();

export{auth, apiKey, storage}