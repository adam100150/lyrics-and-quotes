// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCHL9UcT3TtvgQwt7N3DbLjRon9gKPFjA0",
    authDomain: "lyrics-and-quotes.firebaseapp.com",
    databaseURL: "https://lyrics-and-quotes-default-rtdb.firebaseio.com",
    projectId: "lyrics-and-quotes",
    storageBucket: "lyrics-and-quotes.appspot.com",
    messagingSenderId: "492758193692",
    appId: "1:492758193692:web:60ab73db53010e7fa7b1d9",
    measurementId: "G-T33YSTR82R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

// Initialize auth
export const auth = getAuth();

// Initialize Google auth provider
export const googleProvider = new GoogleAuthProvider();