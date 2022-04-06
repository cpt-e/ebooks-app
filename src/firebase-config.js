import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBwny-93ZP1ayO3nwZbL3DvUy1tLGeiUyY",
    authDomain: "ebooks-0404.firebaseapp.com",
    projectId: "ebooks-0404",
    storageBucket: "ebooks-0404.appspot.com",
    messagingSenderId: "255299854761",
    appId: "1:255299854761:web:490e66374524fa325fa4b8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);