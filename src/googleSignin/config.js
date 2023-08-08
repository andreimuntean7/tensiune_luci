// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-UtN-d8yZAFmmKFNnUWNB9bIY4Z6u3No",
  authDomain: "tensiune-d054b.firebaseapp.com",
  projectId: "tensiune-d054b",
  storageBucket: "tensiune-d054b.appspot.com",
  messagingSenderId: "65758789848",
  appId: "1:65758789848:web:074ca879eccfd90c1ad7ad",
  measurementId: "G-MJVDNH30NG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
