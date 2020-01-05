 import * as firebase from "firebase";
 import "firebase/firestore";
 import "firebase/auth";

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyD2dXseZUYU4Xf8VK2DqQTmMZLytAjLdj4",
    authDomain: "adopt-a-pet-23a38.firebaseapp.com",
    databaseURL: "https://adopt-a-pet-23a38.firebaseio.com",
    projectId: "adopt-a-pet-23a38",
    storageBucket: "adopt-a-pet-23a38.appspot.com", 
    messagingSenderId: "349081885574",
    appId: "1:349081885574:web:b162b235f227814dd8ea07",
    measurementId: "G-TQSNEM4HKR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  const databaseRef = firebase.database().ref();
  export const petsRef = databaseRef.child("Pets");
  export const usersRef = databaseRef.child("Users");
  export const firebaseRef = firebase;

  // export default firebase;