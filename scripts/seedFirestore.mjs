import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

const initialWebsites = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'AI assistant for work, study and creativity.',
    category: 'AI',
    tags: ['AI', 'Productivity'],
    tagColors: ['bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-slate-100 text-slate-600 border-slate-200'],
    url: 'https://chatgpt.com',
    popular: true,
    trending: true,
    new: false,
    iconType: 'chatgpt'
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Collaborative design platform for teams.',
    category: 'Design',
    tags: ['Design', 'Collaboration'],
    tagColors: ['bg-purple-50 text-purple-700 border-purple-200', 'bg-slate-100 text-slate-600 border-slate-200'],
    url: 'https://figma.com',
    popular: true,
    trending: false,
    new: false,
    iconType: 'figma'
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'All-in-one workspace for better thinking.',
    category: 'Productivity',
    tags: ['Productivity', 'Notes'],
    tagColors: ['bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-slate-100 text-slate-600 border-slate-200'],
    url: 'https://notion.so',
    popular: true,
    trending: true,
    new: false,
    iconType: 'notion'
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: 'Powerful code editor for developers.',
    category: 'Development',
    tags: ['Development', 'Editor'],
    tagColors: ['bg-sky-50 text-sky-700 border-sky-200', 'bg-slate-100 text-slate-600 border-slate-200'],
    url: 'https://code.visualstudio.com',
    popular: true,
    trending: false,
    new: false,
    iconType: 'vscode'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Host and review code, manage projects.',
    category: 'Development',
    tags: ['Development', 'Git'],
    tagColors: ['bg-sky-50 text-sky-700 border-sky-200', 'bg-slate-100 text-slate-600 border-slate-200'],
    url: 'https://github.com',
    popular: true,
    trending: true,
    new: false,
    iconType: 'github'
  },
  {
    id: 'canva',
    name: 'Canva',
    description: 'Easy design for everyone.',
    category: 'Design',
    tags: ['Design', 'Marketing'],
    tagColors: ['bg-purple-50 text-purple-700 border-purple-200', 'bg-slate-100 text-slate-600 border-slate-200'],
    url: 'https://canva.com',
    popular: true,
    trending: false,
    new: false,
    iconType: 'canva'
  },
  {
    id: 'googledrive',
    name: 'Google Drive',
    description: 'Store, share and collaborate on files.',
    category: 'Productivity',
    tags: ['Productivity', 'Cloud'],
    tagColors: ['bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-slate-100 text-slate-600 border-slate-200'],
    url: 'https://drive.google.com',
    popular: true,
    trending: false,
    new: false,
    iconType: 'googledrive'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    description: 'Watch, learn and be inspired.',
    category: 'Entertainment',
    tags: ['Video', 'Entertainment'],
    tagColors: ['bg-rose-50 text-rose-700 border-rose-200', 'bg-slate-100 text-slate-600 border-slate-200'],
    url: 'https://youtube.com',
    popular: true,
    trending: true,
    new: false,
    iconType: 'youtube'
  },
  {
    id: 'coursera',
    name: 'Coursera',
    description: 'Learn new skills from top universities.',
    category: 'Education',
    tags: ['Education', 'Courses'],
    tagColors: ['bg-amber-50 text-amber-700 border-amber-200', 'bg-slate-100 text-slate-600 border-slate-200'],
    url: 'https://coursera.org',
    popular: true,
    trending: false,
    new: false,
    iconType: 'coursera'
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    description: 'Beautiful free photos for your projects.',
    category: 'Design',
    tags: ['Design', 'Photography'],
    tagColors: ['bg-purple-50 text-purple-700 border-purple-200', 'bg-slate-100 text-slate-600 border-slate-200'],
    url: 'https://unsplash.com',
    popular: true,
    trending: false,
    new: true,
    iconType: 'unsplash'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Build and deploy modern web projects.',
    category: 'Development',
    tags: ['Development', 'Hosting'],
    tagColors: ['bg-sky-50 text-sky-700 border-sky-200', 'bg-slate-100 text-slate-600 border-slate-200'],
    url: 'https://vercel.com',
    popular: true,
    trending: true,
    new: false,
    iconType: 'vercel'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payments infrastructure for the internet.',
    category: 'Finance',
    tags: ['Finance', 'Business'],
    tagColors: ['bg-orange-50 text-orange-700 border-orange-200', 'bg-slate-100 text-slate-600 border-slate-200'],
    url: 'https://stripe.com',
    popular: true,
    trending: false,
    new: false,
    iconType: 'stripe'
  },
  { id: 'linear', name: 'Linear', category: 'Productivity', description: 'Issue tracking built for speed.', tags: ['Productivity'], tagColors: ['bg-slate-100 text-slate-600 border-slate-200'], url: 'https://linear.app', iconType: 'linear', popular: false, trending: false, new: true },
  { id: 'midjourney', name: 'Midjourney', category: 'AI', description: 'Generative AI art platform.', tags: ['AI'], tagColors: ['bg-purple-50 text-purple-700 border-purple-200'], url: 'https://midjourney.com', iconType: 'midjourney', popular: false, trending: true, new: false },
  { id: 'dribbble', name: 'Dribbble', category: 'Design', description: 'Show and tell for designers.', tags: ['Design'], tagColors: ['bg-pink-50 text-pink-700 border-pink-200'], url: 'https://dribbble.com', iconType: 'dribbble', popular: false, trending: false, new: false },
  { id: 'supabase', name: 'Supabase', category: 'Development', description: 'The open source Firebase alternative.', tags: ['Development'], tagColors: ['bg-emerald-50 text-emerald-700 border-emerald-200'], url: 'https://supabase.com', iconType: 'supabase', popular: false, trending: true, new: false },
  { id: 'duolingo', name: 'Duolingo', category: 'Education', description: 'Fun and free language learning.', tags: ['Education'], tagColors: ['bg-amber-50 text-amber-700 border-amber-200'], url: 'https://duolingo.com', iconType: 'duolingo', popular: false, trending: false, new: false },
  { id: 'netflix', name: 'Netflix', category: 'Entertainment', description: 'Stream movies and TV series.', tags: ['Entertainment'], tagColors: ['bg-rose-50 text-rose-700 border-rose-200'], url: 'https://netflix.com', iconType: 'netflix', popular: false, trending: false, new: false }
];

async function seed() {
  console.log('Seeding initial websites into Firestore...');
  for (const site of initialWebsites) {
    await setDoc(doc(db, 'websites', site.id), {
      ...site,
      createdAt: new Date().toISOString()
    });
    console.log(`✓ Added: ${site.name}`);
  }
  console.log('Finished seeding 18 websites to Firestore!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
