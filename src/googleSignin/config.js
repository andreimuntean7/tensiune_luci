// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGXaMftCmwHc0kco4Y_qthswSpQQSOefo",
  authDomain: "tensiune-luci.firebaseapp.com",
  projectId: "tensiune-luci",
  storageBucket: "tensiune-luci.appspot.com",
  messagingSenderId: "704635852761",
  appId: "1:704635852761:web:9de92af2e8c0ee194fabc8",
  measurementId: "G-H6K4MB6GCP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
