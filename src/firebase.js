import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyC38mhvotDS0zZ7STJCzWjZXyh-4KLNRAU",
    authDomain: "cookbook-f1450.firebaseapp.com",
    projectId: "cookbook-f1450",
    storageBucket: "cookbook-f1450.appspot.com",
    messagingSenderId: "467145206930",
    appId: "1:467145206930:web:9182bfbaa9df20b0d54a4b"
};

const app = initializeApp(firebaseConfig);

export {
    app,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
};
