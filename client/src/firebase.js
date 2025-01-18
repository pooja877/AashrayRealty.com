// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aashray-4ab64.firebaseapp.com",
  projectId: "aashray-4ab64",
  storageBucket: "aashray-4ab64.firebasestorage.app",
  messagingSenderId: "603359323575",
  appId: "1:603359323575:web:2b50ae1ed9d44bcdff3432"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);