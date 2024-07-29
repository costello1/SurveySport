// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Import the functions you need from the SDKs you need
//import { getAnalytics } from 'firebase/analytics';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFqxZ554ZCI_NH1Y3y1aF2MU2JAP3M4Dc",
  authDomain: "survey-2962d.firebaseapp.com",
  projectId: "survey-2962d",
  storageBucket: "survey-2962d.appspot.com",
  messagingSenderId: "178581220010",
  appId: "1:178581220010:web:377dde56ed1d594ddbbed3",
  measurementId: "G-0SCJLS4K7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
