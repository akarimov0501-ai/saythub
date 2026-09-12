-- ========================================================
-- LinkHub Supabase Database Schema & Initial Seed Data
-- ========================================================

-- 1. Create Websites Table
CREATE TABLE IF NOT EXISTS public.websites (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    tag_colors TEXT[] DEFAULT '{}',
    url TEXT NOT NULL,
    popular BOOLEAN DEFAULT false,
    trending BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    icon_type TEXT DEFAULT 'custom',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create User Favorites Table
CREATE TABLE IF NOT EXISTS public.user_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id TEXT NOT NULL REFERENCES public.websites(id) ON DELETE CASCADE,
    user_id TEXT DEFAULT 'anonymous',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(site_id, user_id)
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- 4. Set Public Access Policies (Allow reading and adding sites)
DROP POLICY IF EXISTS "Public read websites" ON public.websites;
CREATE POLICY "Public read websites" ON public.websites FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert websites" ON public.websites;
CREATE POLICY "Public insert websites" ON public.websites FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public manage favorites" ON public.user_favorites;
CREATE POLICY "Public manage favorites" ON public.user_favorites FOR ALL USING (true) WITH CHECK (true);

-- 5. Seed Initial 18 Websites from LinkHub Design
INSERT INTO public.websites (id, name, description, category, tags, tag_colors, url, popular, trending, is_new, icon_type)
VALUES
  ('chatgpt', 'ChatGPT', 'AI assistant for work, study and creativity.', 'AI', ARRAY['AI', 'Productivity'], ARRAY['bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-slate-100 text-slate-600 border-slate-200'], 'https://chatgpt.com', true, true, false, 'chatgpt'),
  ('figma', 'Figma', 'Collaborative design platform for teams.', 'Design', ARRAY['Design', 'Collaboration'], ARRAY['bg-purple-50 text-purple-700 border-purple-200', 'bg-slate-100 text-slate-600 border-slate-200'], 'https://figma.com', true, false, false, 'figma'),
  ('notion', 'Notion', 'All-in-one workspace for better thinking.', 'Productivity', ARRAY['Productivity', 'Notes'], ARRAY['bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-slate-100 text-slate-600 border-slate-200'], 'https://notion.so', true, true, false, 'notion'),
  ('vscode', 'Visual Studio Code', 'Powerful code editor for developers.', 'Development', ARRAY['Development', 'Editor'], ARRAY['bg-sky-50 text-sky-700 border-sky-200', 'bg-slate-100 text-slate-600 border-slate-200'], 'https://code.visualstudio.com', true, false, false, 'vscode'),
  ('github', 'GitHub', 'Host and review code, manage projects.', 'Development', ARRAY['Development', 'Git'], ARRAY['bg-sky-50 text-sky-700 border-sky-200', 'bg-slate-100 text-slate-600 border-slate-200'], 'https://github.com', true, true, false, 'github'),
  ('canva', 'Canva', 'Easy design for everyone.', 'Design', ARRAY['Design', 'Marketing'], ARRAY['bg-purple-50 text-purple-700 border-purple-200', 'bg-slate-100 text-slate-600 border-slate-200'], 'https://canva.com', true, false, false, 'canva'),
  ('googledrive', 'Google Drive', 'Store, share and collaborate on files.', 'Productivity', ARRAY['Productivity', 'Cloud'], ARRAY['bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-slate-100 text-slate-600 border-slate-200'], 'https://drive.google.com', true, false, false, 'googledrive'),
  ('youtube', 'YouTube', 'Watch, learn and be inspired.', 'Entertainment', ARRAY['Video', 'Entertainment'], ARRAY['bg-rose-50 text-rose-700 border-rose-200', 'bg-slate-100 text-slate-600 border-slate-200'], 'https://youtube.com', true, true, false, 'youtube'),
  ('coursera', 'Coursera', 'Learn new skills from top universities.', 'Education', ARRAY['Education', 'Courses'], ARRAY['bg-amber-50 text-amber-700 border-amber-200', 'bg-slate-100 text-slate-600 border-slate-200'], 'https://coursera.org', true, false, false, 'coursera'),
  ('unsplash', 'Unsplash', 'Beautiful free photos for your projects.', 'Design', ARRAY['Design', 'Photography'], ARRAY['bg-purple-50 text-purple-700 border-purple-200', 'bg-slate-100 text-slate-600 border-slate-200'], 'https://unsplash.com', true, false, true, 'unsplash'),
  ('vercel', 'Vercel', 'Build and deploy modern web projects.', 'Development', ARRAY['Development', 'Hosting'], ARRAY['bg-sky-50 text-sky-700 border-sky-200', 'bg-slate-100 text-slate-600 border-slate-200'], 'https://vercel.com', true, true, false, 'vercel'),
  ('stripe', 'Stripe', 'Payments infrastructure for the internet.', 'Finance', ARRAY['Finance', 'Business'], ARRAY['bg-orange-50 text-orange-700 border-orange-200', 'bg-slate-100 text-slate-600 border-slate-200'], 'https://stripe.com', true, false, false, 'stripe'),
  ('linear', 'Linear', 'Issue tracking built for speed.', 'Productivity', ARRAY['Productivity'], ARRAY['bg-slate-100 text-slate-600 border-slate-200'], 'https://linear.app', false, false, true, 'linear'),
  ('midjourney', 'Midjourney', 'Generative AI art platform.', 'AI', ARRAY['AI'], ARRAY['bg-purple-50 text-purple-700 border-purple-200'], 'https://midjourney.com', false, true, false, 'midjourney'),
  ('dribbble', 'Dribbble', 'Show and tell for designers.', 'Design', ARRAY['Design'], ARRAY['bg-pink-50 text-pink-700 border-pink-200'], 'https://dribbble.com', false, false, false, 'dribbble'),
  ('supabase', 'Supabase', 'The open source Firebase alternative.', 'Development', ARRAY['Development'], ARRAY['bg-emerald-50 text-emerald-700 border-emerald-200'], 'https://supabase.com', false, true, false, 'supabase'),
  ('duolingo', 'Duolingo', 'Fun and free language learning.', 'Education', ARRAY['Education'], ARRAY['bg-amber-50 text-amber-700 border-amber-200'], 'https://duolingo.com', false, false, false, 'duolingo'),
  ('netflix', 'Netflix', 'Stream movies and TV series.', 'Entertainment', ARRAY['Entertainment'], ARRAY['bg-rose-50 text-rose-700 border-rose-200'], 'https://netflix.com', false, false, false, 'netflix')
ON CONFLICT (id) DO NOTHING;
