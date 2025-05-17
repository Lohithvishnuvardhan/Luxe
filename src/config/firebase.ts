// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    VITE_FIREBASE_API_KEY: "AIzaSyBN_dt5bGnZDJXlVLkdhmVv6Gn8SbyoB2w",
  VITE_FIREBASE_AUTH_DOMAIN: "luxecommerce-dc720.firebaseapp.com",
  VITE_FIREBASE_PROJECT_ID: "luxecommerce-dc720",
  VITE_FIREBASE_STORAGE_BUCKET: "luxecommerce-dc720.firebasestorage.app",
  VITE_FIREBASE_MESSAGING_SENDER_ID: "547672695810",
  VITE_FIREBASE_APP_ID: "1:547672695810:web:607fe796ae7be9e9ee731b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
