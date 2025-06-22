// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxFXQIrQ4VzeBAAvjSe5_PM1BYMPCEBjU",
  authDomain: "clone-1aacd.firebaseapp.com",
  projectId: "clone-1aacd",
  storageBucket: "clone-1aacd.appspot.com",
  messagingSenderId: "893393103270",
  appId: "1:893393103270:web:bf54901d078f850aef4767",
  measurementId: "G-HFD4D9JK8Z"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize individual services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export for use in other files
export { auth, provider, db, storage };