import { initializeApp } from "firebase/app";

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
