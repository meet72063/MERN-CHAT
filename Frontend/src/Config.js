// import firebase from "firebase/app";
// import "firebase/storage";
// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
//   MEASUREMENT_Id,
// } from "./constants";

// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MEASUREMENT_Id,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_Id,
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// export const storage = firebaseApp.storage();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxWOu8Oj5cLdwOD1e_U3NKocatLTSO7L0",
  authDomain: "chatapp-8f9b1.firebaseapp.com",
  projectId: "chatapp-8f9b1",
  storageBucket: "chatapp-8f9b1.appspot.com",
  messagingSenderId: "127679214086",
  appId: "1:127679214086:web:310fa70db5c8635cd48987",
  measurementId: "G-BVYMQWH4PH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
