# LinkHub - All Useful Websites in One Place

Berilgan dizayn rasmi asosida yaratilgan **LinkHub** veb-ilovasi zamonaviy **Vite + React + Tailwind CSS + Supabase (PostgreSQL)** texnologiyalarida to'liq ishga tushirildi va **Vercel**'ga joylashga tayyor holatga keltirildi.

---

## 🚀 1. Real Ma'lumotlar Bazasiga (Supabase) ulash

Loyiha gibrid arxitekturada qurilgan: agar Supabase ulanmagan bo'lsa, u avtomatik tarzda `localStorage` orqali ishlaydi (xatolik bermaydi). Real ma'lumotlar bazasiga ulash uchun:

1. [Supabase](https://supabase.com) saytida bepul ro'yxatdan o'ting va yangi loyiha (Project) yarating.
2. Chap menyudan **SQL Editor** bo'limiga kiring va loyihadagi [supabase-schema.sql](./supabase-schema.sql) fayli ichidagi kodni nusxalab, u yerda bajaring (**Run**). Bu orqali barcha jadvallar, xavfsizlik qoidalari (RLS) va 18 ta sayt bazaga kiritiladi.
3. Supabase'da **Project Settings** -> **API** bo'limidan quyidagi 2 ta kalitni oling:
   - `Project URL`
   - `anon / public key`
4. Loyiha ildizida `.env.local` faylini yarating va ushbu kalitlarni yozing:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
5. `npm run dev` ni qayta ishga tushiring. Sahifa pastida **"Supabase Connected"** yashil belgisi paydo bo'ladi.

---

## 🌐 2. Vercel'ga deploy qilish

Loyihada [vercel.json](./vercel.json) va [.gitignore](./.gitignore) to'liq sozlangan. Joylashning 2 ta oson usuli bor:

### A usul: Vercel CLI orqali (eng tez usul)
Terminalda quyidagi buyruqni bering:
```bash
npx vercel
```
So'rovlarga `Y` (ha) deb javob bering. Bir necha soniyada sizga jonli domen (masalan: `https://linkhub-xxx.vercel.app`) beriladi.

Agar Supabase ulagan bo'lsangiz, ishlab chiqarishga chiqarishdan oldin:
```bash
npx vercel env add VITE_SUPABASE_URL
npx vercel env add VITE_SUPABASE_ANON_KEY
npx vercel --prod
```

### B usul: GitHub orqali
1. Ushbu loyihani GitHub omboringizga (repository) yuklang:
   ```bash
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
2. [Vercel](https://vercel.com) saytiga kiring va **"Add New Project"** tugmasini bosing.
3. GitHub omboringizni tanlang.
4. **Environment Variables** bo'limida `VITE_SUPABASE_URL` va `VITE_SUPABASE_ANON_KEY` ni kiriting.
5. **Deploy** tugmasini bosing!

---

## 💻 Mahalliy kompyuterda ishga tushirish

```bash
# Bog'liqliklarni o'rnatish
npm install

# Dasturchi rejimida ishga tushirish (HMR)
npm run dev

# Ishlab chiqarish uchun yig'ish (Production Build)
npm run build
```
