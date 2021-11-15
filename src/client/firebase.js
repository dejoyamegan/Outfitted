// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH6esnR2Tw81cdGgMHTDR2VgBxg9jBqC0",
  authDomain: "outfitted-database.firebaseapp.com",
  databaseURL: "https://outfitted-database-default-rtdb.firebaseio.com",
  projectId: "outfitted-database",
  storageBucket: "outfitted-database.appspot.com",
  messagingSenderId: "497283908544",
  appId: "1:497283908544:web:d528010f2fc8c7fa76be25",
  measurementId: "G-NFTQXVCLC7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;