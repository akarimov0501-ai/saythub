import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBxhoV-CMuMKTWYRFzvUiG0BBVB0vf2WN4",
  authDomain: "saythub-portal-2026.firebaseapp.com",
  projectId: "saythub-portal-2026",
  storageBucket: "saythub-portal-2026.firebasestorage.app",
  messagingSenderId: "762886462348",
  appId: "1:762886462348:web:f1bfd61f6d6596ab7d14a9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clear() {
  console.log('Clearing websites collection in Firestore...');
  const snap = await getDocs(collection(db, 'websites'));
  for (const d of snap.docs) {
    await deleteDoc(doc(db, 'websites', d.id));
    console.log(`Deleted site: ${d.id}`);
  }
  console.log('Done! All websites deleted from Firestore.');
  process.exit(0);
}

clear().catch(err => {
  console.error(err);
  process.exit(1);
});
