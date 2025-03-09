// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClxo9RmYaeuLOwcXEqvnRCGcJAj8JNkzc",
  authDomain: "testlogin-6d62a.firebaseapp.com",
  projectId: "testlogin-6d62a",
  storageBucket: "testlogin-6d62a.firebasestorage.app",
  messagingSenderId: "849767952483",
  appId: "1:849767952483:web:78306bc6a002e35d304856",
  measurementId: "G-K98HNX4GTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);