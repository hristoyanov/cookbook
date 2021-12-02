import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyC38mhvotDS0zZ7STJCzWjZXyh-4KLNRAU",
    authDomain: "cookbook-f1450.firebaseapp.com",
    projectId: "cookbook-f1450",
    storageBucket: "cookbook-f1450.appspot.com",
    messagingSenderId: "467145206930",
    appId: "1:467145206930:web:9182bfbaa9df20b0d54a4b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    app,
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
};
