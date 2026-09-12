import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { curatedWebsites } from '../src/data/websites.js';

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

async function seed() {
  console.log(`Seeding ${curatedWebsites.length} curated websites into Firestore...`);
  for (const site of curatedWebsites) {
    await setDoc(doc(db, 'websites', site.id), {
      ...site,
      createdAt: new Date().toISOString()
    });
    console.log(`✓ Added: ${site.name} (${site.category})`);
  }
  console.log(`Finished seeding all ${curatedWebsites.length} websites to Firestore!`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
