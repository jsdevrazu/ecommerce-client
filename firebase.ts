// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4oZH-OEZI_HNoKYWvy1YRA8wcavPWzgA",
  authDomain: "e-commerce-f207a.firebaseapp.com",
  projectId: "e-commerce-f207a",
  storageBucket: "e-commerce-f207a.appspot.com",
  messagingSenderId: "53176714936",
  appId: "1:53176714936:web:4fd7a63f14cab9ad08d64d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();