// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aashratyrealty.firebaseapp.com",
  projectId: "aashratyrealty",
  storageBucket: "aashratyrealty.firebasestorage.app",
  messagingSenderId: "702235001000",
  appId: "1:702235001000:web:f22537829aef746f52429d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);