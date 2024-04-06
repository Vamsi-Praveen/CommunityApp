import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const DB = getFirestore(FIREBASE_APP)
export const AUTH = getAuth(FIREBASE_APP)

export default FIREBASE_APP