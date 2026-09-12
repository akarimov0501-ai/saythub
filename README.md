# LinkHub - Vite + React + Tailwind CSS

Berilgan dizayn (`5e103f11-dbe4-4655-ab54-3270d41544e5.png`) asosida yaratilgan **LinkHub** veb-ilovasi zamonaviy **Vite + React + Tailwind CSS + Lucide Icons** ekotizimiga to'liq o'tkazildi.

## 🚀 Loyiha tuzilmasi
```text
SaytHub/
├── index.html                 # Asosiy HTML kirish nuqtasi
├── vite.config.js             # Vite va React sozlamalari
├── tailwind.config.js         # Tailwind CSS konfiguratsiyasi
├── postcss.config.js          # PostCSS sozlamalari
├── package.json               # Paketlar va buyruqlar
├── src/
│   ├── main.jsx               # React kirish fayli
│   ├── App.jsx                # Asosiy ilova va global holat boshqaruvi
│   ├── index.css              # Kosmik atmosfera foni, shriftlar va Tailwind
│   ├── data/
│   │   └── websites.js        # Barcha 18 ta saytlar va toifalar bazasi
│   └── components/
│       ├── BrandIcon.jsx      # Rasmiy SVG brend logotiplari
│       ├── Sidebar.jsx        # Chap yon panel, My Space, promo karta va profil
│       ├── Hero.jsx           # Kosmik hero banner, qidiruv va tezkor filtrlar
│       ├── Categories.jsx     # 8 ta toifalar tarmog'i
│       ├── FeaturedWebsites.jsx # 12 ta tanlangan saytlar kartochkalari va tablar
│       ├── LatestAdditions.jsx# So'nggi qo'shilgan 6 ta sayt
│       ├── CreateModal.jsx    # Yangi sayt qo'shish modal oynasi
│       └── Toast.jsx          # Bildirishnoma (Toast) komponenti
```

## 🛠️ Ishga tushirish (Scripts)

### 1. Dasturchi rejimida ishga tushirish (Dev Server)
```bash
npm run dev
```
Brauzer avtomatik tarzda `http://localhost:5173` manzilida ochiladi va qaynoq qayta yuklash (HMR) ishlaydi.

### 2. Ishlab chiqarish (Production) uchun yig'ish
```bash
npm run build
```
Natija `dist/` jildida hosil bo'ladi.

### 3. Yig'ilgan versiyani sinab ko'rish
```bash
npm run preview
```

## ✨ Asosiy imkoniyatlar
- **Vite & React 18**: Komponentlar asosida tezkor, reaktiv arxitektura.
- **Kosmik dizayn**: Planetar atmosfera effekti, yulduzlar, gradient sarlavhalar va qo'lyozma uslubidagi yozuv ("A better web, a brighter you.").
- **Jonli qidiruv & `Ctrl + K`**: Istalgan sahifada `Ctrl + K` orqali qidiruvga o'tish va tezkor filtrlash.
- **Toifalar & Tablar**: AI, Design, Development, Productivity, Education, Finance, Entertainment hamda New/Popular/Trending.
- **Xatcho'plar (Favorites)**: Saytlarni sevimlilarga qo'shish va `localStorage` orqali saqlash.
- **Kolleksiya yaratish**: "Create Collection" orqali yangi saytlarni katalogga qo'shish.
