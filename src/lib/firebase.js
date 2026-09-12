import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBxhoV-CMuMKTWYRFzvUiG0BBVB0vf2WN4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "saythub-portal-2026.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "saythub-portal-2026",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "saythub-portal-2026.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "762886462348",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:762886462348:web:f1bfd61f6d6596ab7d14a9"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export { signInWithPopup, signOut, onAuthStateChanged };
export default app;

