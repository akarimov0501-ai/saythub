// LinkHub Application Logic

// Database of Websites
const websitesData = [
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
    icon: `<div class="w-12 h-12 rounded-2xl bg-[#10a37f] flex items-center justify-center text-white shadow-sm flex-shrink-0">
      <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2a10 10 0 0 1 7.07 17.07l-1.41-1.41A8 8 0 1 0 6.34 6.34L4.93 4.93A10 10 0 0 1 12 2z"/>
        <path d="M12 6a6 6 0 0 1 4.24 10.24l-1.41-1.41A4 4 0 1 0 8.46 8.46L7.05 7.05A6 6 0 0 1 12 6z"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    </div>`
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
    icon: `<div class="w-12 h-12 rounded-2xl bg-black flex items-center justify-center shadow-sm flex-shrink-0">
      <svg class="w-6 h-8" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    </div>`
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
    icon: `<div class="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm flex-shrink-0">
      <svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.093-.373L18.423 2.34c-.467-.374-.933-.467-1.773-.42l-11.86.746c-.513.047-.653.233-.336.56l.005-.018zm.933 3.593v13.53c0 .746.373 1.026 1.213.98l14.288-.84c.84-.046.933-.56.933-1.12V6.82c0-.56-.28-.84-.746-.793l-14.894.886c-.56.047-.794.373-.794.888zm12.935.793c.093.42 0 .84-.42.887l-.7.14v8.865c-.466.28-.933.467-1.353.467-.653 0-.933-.28-1.54-.98l-4.432-6.95v6.95l1.493.327s0 .746-.84.746l-2.8-.186c-.093-.42 0-.84.42-.887l.793-.14V9.62l-1.073-.093s0-.747.84-.747l2.893.187 4.526 6.997V9.76l-1.166-.14s0-.747.84-.747l2.585.187z"/>
      </svg>
    </div>`
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
    icon: `<div class="w-12 h-12 rounded-2xl bg-[#007ACC] flex items-center justify-center text-white shadow-sm flex-shrink-0">
      <svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.583.063a1.5 1.5 0 0 0-1.054.407L7.38 8.875 3.32 5.766a1.05 1.05 0 0 0-1.396.115l-1.6 1.62a1.05 1.05 0 0 0 .048 1.487l4.032 3.652-4.032 3.652a1.05 1.05 0 0 0-.048 1.488l1.6 1.62a1.05 1.05 0 0 0 1.396.114l4.06-3.109 9.15 8.405a1.5 1.5 0 0 0 2.502-1.096V1.16A1.5 1.5 0 0 0 17.583.063zm.417 4.14v15.594L9.89 12.64 18 4.203z"/>
      </svg>
    </div>`
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
    icon: `<div class="w-12 h-12 rounded-2xl bg-[#181717] flex items-center justify-center text-white shadow-sm flex-shrink-0">
      <svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    </div>`
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
    icon: `<div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] flex items-center justify-center text-white shadow-sm flex-shrink-0">
      <span class="font-serif italic text-2xl font-black">C</span>
    </div>`
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
    icon: `<div class="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm flex-shrink-0">
      <svg class="w-7 h-7" viewBox="0 0 24 24">
        <path fill="#FFC107" d="M8.5 2.5L2 14.5l3.5 6L12 8.5z"/>
        <path fill="#2196F3" d="M12 8.5h10.5L16 2.5H8.5z"/>
        <path fill="#4CAF50" d="M12 8.5l3.5 6H22l-3.5-6z"/>
        <path fill="#0066DA" d="M15.5 14.5L12 20.5h10l3.5-6z"/>
        <path fill="#00AC47" d="M5.5 20.5h10L12 14.5 2 14.5z"/>
      </svg>
    </div>`
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
    icon: `<div class="w-12 h-12 rounded-2xl bg-[#ff0000] flex items-center justify-center text-white shadow-sm flex-shrink-0">
      <svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    </div>`
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
    icon: `<div class="w-12 h-12 rounded-2xl bg-[#0056D2] flex items-center justify-center text-white shadow-sm flex-shrink-0 font-bold text-2xl">
      C
    </div>`
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
    icon: `<div class="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-sm flex-shrink-0">
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z"/>
      </svg>
    </div>`
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
    icon: `<div class="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-sm flex-shrink-0">
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L24 22H0L12 1Z"/>
      </svg>
    </div>`
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
    icon: `<div class="w-12 h-12 rounded-2xl bg-[#635BFF] flex items-center justify-center text-white shadow-sm flex-shrink-0 font-black text-2xl">
      S
    </div>`
  }
];

// Latest Additions
const latestAdditionsData = [
  {
    id: 'linear',
    name: 'Linear',
    category: 'Productivity',
    url: 'https://linear.app',
    icon: `<div class="w-10 h-10 rounded-xl bg-[#5E6AD2] flex items-center justify-center text-white shadow-sm flex-shrink-0">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m3 16 14-14m-8 19L21 9"/></svg>
    </div>`
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'AI',
    url: 'https://midjourney.com',
    icon: `<div class="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white shadow-sm flex-shrink-0">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 18h20M5 18l7-14 7 14M12 4v14"/></svg>
    </div>`
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    category: 'Design',
    url: 'https://dribbble.com',
    icon: `<div class="w-10 h-10 rounded-xl bg-[#EA4C89] flex items-center justify-center text-white shadow-sm flex-shrink-0">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.72 9.18a8.03 8.03 0 0 0-4.47-4.48A8.026 8.026 0 0 1 19.72 11.18zm-5.75-5.11a14.86 14.86 0 0 1 3.96 4.13A17.15 17.15 0 0 0 12 9.5c-.32 0-.64.01-.96.04a14.28 14.28 0 0 1 2.93-3.47zM10.2 10.88c.41-.03.82-.05 1.24-.05 1.93 0 3.73.44 5.34 1.23a17.84 17.84 0 0 1-2.95 6.07 14.2 14.2 0 0 1-3.63-7.25zm-2.02.5c.01.21.02.42.04.63a12.78 12.78 0 0 0 4.19 6.84A8.01 8.01 0 0 1 4.28 12c0-.21.01-.42.03-.62.99.2 2.6.28 3.87.0zM4.69 9.87c.72-.03 1.96-.13 3.32-.48a12.83 12.83 0 0 0-2.3-3.47A7.98 7.98 0 0 0 4.69 9.87zm2.46-4.52a14.33 14.33 0 0 1 2.37 3.42c1.78-.49 3.48-.68 5.09-.59A7.98 7.98 0 0 0 7.15 5.35z"/>
      </svg>
    </div>`
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Development',
    url: 'https://supabase.com',
    icon: `<div class="w-10 h-10 rounded-xl bg-black border border-emerald-900/50 flex items-center justify-center text-[#3ECF8E] shadow-sm flex-shrink-0">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.302 14.28a.396.396 0 0 0 .316.634H10.5v8.69a.396.396 0 0 0 .716.233l10.982-14.117a.396.396 0 0 0-.836-.366z"/></svg>
    </div>`
  },
  {
    id: 'duolingo',
    name: 'Duolingo',
    category: 'Education',
    url: 'https://duolingo.com',
    icon: `<div class="w-10 h-10 rounded-xl bg-[#58CC02] flex items-center justify-center text-white shadow-sm flex-shrink-0 font-bold">
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="9" cy="10" r="3" fill="#fff"/><circle cx="9" cy="10" r="1.5" fill="#2B3945"/>
        <circle cx="15" cy="10" r="3" fill="#fff"/><circle cx="15" cy="10" r="1.5" fill="#2B3945"/>
        <path d="M12 12.5l-1.5 2h3z" fill="#FFC800"/>
      </svg>
    </div>`
  },
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'Entertainment',
    url: 'https://netflix.com',
    icon: `<div class="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-[#E50914] shadow-sm flex-shrink-0 font-black text-xl">
      N
    </div>`
  }
];

// Popular Categories
const categoriesData = [
  { id: 'ai', name: 'AI Tools', count: '320+ sites', color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>` },
  { id: 'design', name: 'Design', count: '180+ sites', color: 'bg-pink-50 text-pink-600', iconBg: 'bg-pink-100', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>` },
  { id: 'development', name: 'Development', count: '250+ sites', color: 'bg-sky-50 text-sky-600', iconBg: 'bg-sky-100', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>` },
  { id: 'productivity', name: 'Productivity', count: '200+ sites', color: 'bg-emerald-50 text-emerald-600', iconBg: 'bg-emerald-100', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>` },
  { id: 'education', name: 'Education', count: '150+ sites', color: 'bg-amber-50 text-amber-600', iconBg: 'bg-amber-100', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>` },
  { id: 'finance', name: 'Finance', count: '120+ sites', color: 'bg-orange-50 text-orange-600', iconBg: 'bg-orange-100', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>` },
  { id: 'entertainment', name: 'Entertainment', count: '100+ sites', color: 'bg-rose-50 text-rose-600', iconBg: 'bg-rose-100', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>` },
  { id: 'all', name: 'More', count: 'View all', color: 'bg-slate-50 text-slate-600', iconBg: 'bg-slate-100', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>` }
];

// State Management
let currentFilterCategory = 'all';
let currentTab = 'popular';
let searchQuery = '';
let savedFavorites = JSON.parse(localStorage.getItem('linkhub_favorites') || '[]');
let customCollections = JSON.parse(localStorage.getItem('linkhub_custom_sites') || '[]');

// Merge user created custom websites
function getAllWebsites() {
  return [...websitesData, ...customCollections];
}

// Save favorites to LocalStorage
function saveFavoritesToStorage() {
  localStorage.setItem('linkhub_favorites', JSON.stringify(savedFavorites));
  updateFavoritesCountBadge();
}

// Update Badge count in sidebar
function updateFavoritesCountBadge() {
  const countBadge = document.getElementById('favorites-badge');
  if (countBadge) {
    countBadge.textContent = savedFavorites.length;
    countBadge.classList.toggle('hidden', savedFavorites.length === 0);
  }
}

// Toast Notification
function showToast(message, icon = '✓') {
  const existingToast = document.getElementById('active-toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.id = 'active-toast';
  toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-slate-700 animate-toast text-sm font-medium';
  toast.innerHTML = `<span class="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs font-bold">${icon}</span> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast) {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }
  }, 2600);
}

// Toggle Bookmark
function toggleBookmark(siteId, event) {
  if (event) event.stopPropagation();
  const index = savedFavorites.indexOf(siteId);
  if (index > -1) {
    savedFavorites.splice(index, 1);
    showToast("Sayt xatcho'plardan olib tashlandi", '✕');
  } else {
    savedFavorites.push(siteId);
    showToast("Sayt xatcho'plarga saqlandi!", '★');
  }
  saveFavoritesToStorage();
  renderFeaturedWebsites();
  renderLatestAdditions();
}

// Render Popular Categories
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  container.innerHTML = categoriesData.map(cat => {
    const isActive = currentFilterCategory.toLowerCase() === cat.name.toLowerCase() || (cat.id === 'all' && currentFilterCategory === 'all');
    return `
      <div onclick="selectCategoryFilter('${cat.name === 'More' ? 'all' : cat.name}')" 
           class="category-card cursor-pointer rounded-2xl p-4 flex flex-col items-center text-center transition-all bg-white border ${isActive ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md' : 'border-slate-100 hover:border-slate-300'}">
        <div class="w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-3">
          ${cat.icon}
        </div>
        <h4 class="font-bold text-slate-800 text-sm whitespace-nowrap mb-0.5">${cat.name}</h4>
        <span class="text-xs text-slate-400 font-medium">${cat.count}</span>
      </div>
    `;
  }).join('');
}

// Filter Function
function getFilteredWebsites() {
  let list = getAllWebsites();

  // Search Filter
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(site => 
      site.name.toLowerCase().includes(q) ||
      site.description.toLowerCase().includes(q) ||
      site.category.toLowerCase().includes(q) ||
      site.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  // Category Filter
  if (currentFilterCategory !== 'all') {
    const cat = currentFilterCategory.toLowerCase();
    list = list.filter(site => 
      site.category.toLowerCase().includes(cat) || 
      site.tags.some(t => t.toLowerCase().includes(cat))
    );
  }

  // Tab filter
  if (currentTab === 'new') {
    list = list.filter(site => site.new || site.id === 'unsplash' || site.id === 'linear');
  } else if (currentTab === 'trending') {
    list = list.filter(site => site.trending);
  } else if (currentTab === 'favorites_only') {
    list = list.filter(site => savedFavorites.includes(site.id));
  }

  return list;
}

// Render Featured Websites Grid
function renderFeaturedWebsites() {
  const container = document.getElementById('featured-grid');
  const countEl = document.getElementById('filtered-count');
  if (!container) return;

  const sites = getFilteredWebsites();

  if (countEl) {
    countEl.textContent = `${sites.length} ta sayt topildi`;
  }

  if (sites.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <h3 class="text-lg font-bold text-slate-700 mb-1">Hech qanday sayt topilmadi</h3>
        <p class="text-sm text-slate-500 mb-4">Qidiruv so'zini o'zgartiring yoki filtrlarni tozalang.</p>
        <button onclick="resetFilters()" class="px-4 py-2 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
          Filtrlarni tozalash
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = sites.map(site => {
    const isBookmarked = savedFavorites.includes(site.id);
    return `
      <div class="site-card bg-white rounded-2xl p-5 relative flex flex-col justify-between group cursor-pointer" onclick="window.open('${site.url}', '_blank')">
        <div>
          <div class="flex items-start justify-between mb-3.5">
            <div class="flex items-center gap-3.5">
              ${site.icon}
              <div>
                <h3 class="font-bold text-slate-900 text-base leading-tight group-hover:text-sky-600 transition-colors flex items-center gap-1.5">
                  ${site.name}
                  <svg class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </h3>
                <span class="text-xs text-slate-400">${site.category}</span>
              </div>
            </div>

            <!-- Bookmark Button -->
            <button onclick="toggleBookmark('${site.id}', event)" 
                    title="${isBookmarked ? 'Xatcho\'plardan olib tashlash' : 'Xatcho\'plarga saqlash'}" 
                    class="p-2 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-slate-50 transition ${isBookmarked ? 'text-sky-600 bg-sky-50' : ''}">
              <svg class="w-5 h-5 ${isBookmarked ? 'fill-sky-600 stroke-sky-600' : 'fill-none stroke-current'}" viewBox="0 0 24 24" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
              </svg>
            </button>
          </div>

          <p class="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
            ${site.description}
          </p>
        </div>

        <!-- Tag badges -->
        <div class="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
          ${site.tags.map((tag, i) => `
            <span class="text-[11px] font-semibold px-2.5 py-1 rounded-md border ${site.tagColors[i] || 'bg-slate-50 text-slate-600 border-slate-200'}">
              ${tag}
            </span>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// Render Latest Additions
function renderLatestAdditions() {
  const container = document.getElementById('latest-container');
  if (!container) return;

  container.innerHTML = latestAdditionsData.map(item => {
    const isBookmarked = savedFavorites.includes(item.id);
    return `
      <div onclick="window.open('${item.url}', '_blank')" 
           class="site-card bg-white rounded-2xl p-3 flex items-center justify-between group cursor-pointer min-w-[200px]">
        <div class="flex items-center gap-3">
          ${item.icon}
          <div>
            <h4 class="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors leading-tight">${item.name}</h4>
            <span class="text-xs text-slate-400">${item.category}</span>
          </div>
        </div>
        <button onclick="toggleBookmark('${item.id}', event)" 
                class="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-slate-50 transition ${isBookmarked ? 'text-sky-600' : ''}">
          <svg class="w-4 h-4 ${isBookmarked ? 'fill-sky-600 stroke-sky-600' : 'fill-none stroke-current'}" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
          </svg>
        </button>
      </div>
    `;
  }).join('');
}

// Category selection
function selectCategoryFilter(category) {
  if (category === 'all' && currentFilterCategory === 'all') {
    // Keep it as all
  } else if (currentFilterCategory === category) {
    currentFilterCategory = 'all';
  } else {
    currentFilterCategory = category;
  }

  // Update Hero quick pill active states
  document.querySelectorAll('.hero-tag-pill').forEach(pill => {
    const tag = pill.getAttribute('data-tag');
    if (tag.toLowerCase() === currentFilterCategory.toLowerCase()) {
      pill.classList.add('bg-white/30', 'text-white', 'border-white/50');
    } else {
      pill.classList.remove('bg-white/30', 'text-white', 'border-white/50');
    }
  });

  renderCategories();
  renderFeaturedWebsites();
}

// Tab Selection (New, Popular, Trending)
function setTab(tabName) {
  currentTab = tabName;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabName) {
      btn.className = 'tab-btn px-4 py-1.5 rounded-full text-xs font-bold bg-slate-900 text-white shadow-sm transition';
    } else {
      btn.className = 'tab-btn px-4 py-1.5 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-900 transition';
    }
  });
  renderFeaturedWebsites();
}

// Reset all filters
function resetFilters() {
  currentFilterCategory = 'all';
  currentTab = 'popular';
  searchQuery = '';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  setTab('popular');
  renderCategories();
  renderFeaturedWebsites();
}

// Sidebar Navigation Handling
function navigateSidebar(view, event) {
  if (event) event.preventDefault();
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.classList.remove('bg-sky-50', 'text-sky-600', 'font-bold');
    item.classList.add('text-slate-600');
  });

  if (event && event.currentTarget) {
    event.currentTarget.classList.add('bg-sky-50', 'text-sky-600', 'font-bold');
    event.currentTarget.classList.remove('text-slate-600');
  }

  if (view === 'favorites' || view === 'saved') {
    currentTab = 'favorites_only';
    currentFilterCategory = 'all';
    renderFeaturedWebsites();
    const section = document.getElementById('featured-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    showToast("Saqlangan xatcho'plar ro'yxati", '★');
  } else if (view === 'home' || view === 'explore') {
    resetFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (view === 'categories') {
    const catSection = document.getElementById('categories-section');
    if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Modal handling for "Create Collection"
function openCreateModal() {
  const modal = document.getElementById('create-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeCreateModal() {
  const modal = document.getElementById('create-modal');
  if (modal) modal.classList.add('hidden');
}

// Add Custom Website/Collection
function handleCreateSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('modal-site-name').value;
  const url = document.getElementById('modal-site-url').value;
  const category = document.getElementById('modal-site-cat').value;
  const description = document.getElementById('modal-site-desc').value;

  if (!name || !url) return;

  const newSite = {
    id: 'custom-' + Date.now(),
    name,
    description: description || 'Foydalanuvchi tomonidan qo\'shilgan veb-sayt.',
    category,
    tags: [category, 'Custom'],
    tagColors: ['bg-sky-50 text-sky-700 border-sky-200', 'bg-slate-100 text-slate-600 border-slate-200'],
    url: url.startsWith('http') ? url : `https://${url}`,
    popular: false,
    trending: false,
    new: true,
    icon: `<div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-lg flex-shrink-0">
      ${name.substring(0, 2).toUpperCase()}
    </div>`
  };

  customCollections.push(newSite);
  localStorage.setItem('linkhub_custom_sites', JSON.stringify(customCollections));
  
  closeCreateModal();
  document.getElementById('create-form').reset();
  showToast("Yangi sayt muvaffaqiyatli qo'shildi!", '✓');
  renderFeaturedWebsites();
}

// Setup Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderFeaturedWebsites();
  renderLatestAdditions();
  updateFavoritesCountBadge();

  // Search Bar Real-time Input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderFeaturedWebsites();
    });
  }

  // Ctrl + K keyboard shortcut
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
    if (e.key === 'Escape') {
      closeCreateModal();
    }
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('main-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('hidden');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      if (sidebar) sidebar.classList.add('-translate-x-full');
      sidebarOverlay.classList.add('hidden');
    });
  }
});
