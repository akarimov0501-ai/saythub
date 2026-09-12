// LinkHub data repository

export const initialWebsites = [
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
  }
];

export const latestAdditions = [
  { id: 'linear', name: 'Linear', category: 'Productivity', url: 'https://linear.app', iconType: 'linear' },
  { id: 'midjourney', name: 'Midjourney', category: 'AI', url: 'https://midjourney.com', iconType: 'midjourney' },
  { id: 'dribbble', name: 'Dribbble', category: 'Design', url: 'https://dribbble.com', iconType: 'dribbble' },
  { id: 'supabase', name: 'Supabase', category: 'Development', url: 'https://supabase.com', iconType: 'supabase' },
  { id: 'duolingo', name: 'Duolingo', category: 'Education', url: 'https://duolingo.com', iconType: 'duolingo' },
  { id: 'netflix', name: 'Netflix', category: 'Entertainment', url: 'https://netflix.com', iconType: 'netflix' }
];

export const categoriesList = [
  { id: 'ai', name: 'AI Tools', count: '320+ sites', color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100' },
  { id: 'design', name: 'Design', count: '180+ sites', color: 'bg-pink-50 text-pink-600', iconBg: 'bg-pink-100' },
  { id: 'development', name: 'Development', count: '250+ sites', color: 'bg-sky-50 text-sky-600', iconBg: 'bg-sky-100' },
  { id: 'productivity', name: 'Productivity', count: '200+ sites', color: 'bg-emerald-50 text-emerald-600', iconBg: 'bg-emerald-100' },
  { id: 'education', name: 'Education', count: '150+ sites', color: 'bg-amber-50 text-amber-600', iconBg: 'bg-amber-100' },
  { id: 'finance', name: 'Finance', count: '120+ sites', color: 'bg-orange-50 text-orange-600', iconBg: 'bg-orange-100' },
  { id: 'entertainment', name: 'Entertainment', count: '100+ sites', color: 'bg-rose-50 text-rose-600', iconBg: 'bg-rose-100' },
  { id: 'all', name: 'More', count: 'View all', color: 'bg-slate-50 text-slate-600', iconBg: 'bg-slate-100' }
];
