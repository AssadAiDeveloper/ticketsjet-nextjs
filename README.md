# TicketsJet — Next.js 15

إعادة بناء كاملة لموقع ticketsjet.com — بديل ووردبريس بأداء أعلى بكثير.

## التشغيل محليًا
```bash
npm install
npm run dev        # http://localhost:3000
```

## النشر على Vercel
1. ارفع المشروع على GitHub (حساب AssadAiDeveloper)
2. Vercel → Add New Project → اختر المستودع → Deploy (بدون أي إعدادات إضافية)
3. اربط الدومين ticketsjet.com من Settings → Domains
4. في ووردبريس/Namecheap: وجّه DNS إلى Vercel حسب التعليمات اللي بتظهر لك

## Travelpayouts — أهم ملف: `lib/config.ts`
- الماركر `271745` و trs `541838` مضبوطين (نفس حسابك الحالي)
- ويدجت الطيران (Aviasales) وويدجت الفنادق (Hotellook) بألوان الموقع
- رابط السيارات EconomyBookings هو نفس رابط الإحالة من موقعك القديم
- **مهم:** ادخل لوحة Travelpayouts → Tools → Widgets، أنشئ ويدجت Flights و Hotels،
  وقارن رابط السكربت الناتج مع الموجود في `WIDGETS` — إذا اختلف promo_id/campaign_id
  الصق رابطك مكانه (سطرين فقط).

## AdSense
1. بعد قبول الموقع، ضع المعرف في Vercel → Environment Variables:
   `NEXT_PUBLIC_ADSENSE_CLIENT = ca-pub-XXXXXXXX`
2. حدّث `public/ads.txt` بسطر AdSense الخاص بك
3. أماكن الإعلانات جاهزة (`<AdSlot slot="..." />`) — استبدل أرقام slot
   بمعرفات الوحدات الإعلانية من لوحة AdSense
4. بدون المتغير، لا يُحمَّل أي سكربت إعلانات إطلاقًا (أفضل لسرعة الموقع قبل القبول)

## SEO الجاهز
- Metadata كاملة لكل صفحة (title/description/canonical/OpenGraph/Twitter)
- `sitemap.xml` و `robots.txt` مولّدة تلقائيًا
- JSON-LD: Organization + WebSite + FAQPage (صفحة Help) + Article (المقالات)
- كل الصفحات Static prerendered — سرعة تحميل شبه فورية
- بعد النشر: أضف الموقع في Google Search Console وأرسل sitemap.xml

## إضافة مقالات
افتح `lib/posts.ts` وأضف عنصر جديد للمصفوفة — الصفحة والـ sitemap والـ JSON-LD
تتولد تلقائيًا.

## بنية المشروع
```
app/            الصفحات (App Router)
components/     Header, Footer, SearchTabs (بطاقة boarding pass), TpWidget, AdSlot, Faq
lib/config.ts   كل إعدادات Travelpayouts و AdSense
lib/posts.ts    مقالات المدونة
```

## White Label Web — نوع Widget (المستخدم فعليًا)
الوايت ليبل حقك من نوع **Widget** (wl_id=22715) — يعني النموذج والنتائج تظهر
داخل صفحات ticketsjet.com مباشرة، بدون subdomain ولا CNAME ولا قالب HTML.

- السكربت والحاويات في `components/WhiteLabel.tsx`
- مركّب في: الصفحة الرئيسية (تبويب Flights + النتائج تحت الهيرو) وصفحة /flights
- **قاعدة مهمة:** حاوية `#tpwl-search` وحاوية `#tpwl-tickets` مرة واحدة فقط في الصفحة
- ألوان النتائج والنموذج تضبطها من لوحة Travelpayouts → White Label → Design:
  Buttons `#FFB703` · Links `#E09F00` · Form bg `#0B1B2B` · Page bg `#F6F8FA`
- إذا غيّرت الـ wl_id يومًا: عدّل `WL_WEB` في `lib/config.ts`

## إخفاء اسم الشبكة عن الزائر
- كل روابط الفنادق والسيارات تمر عبر مسارات داخلية: `/go/cars` و `/go/hotels/<city>`
  (تحويل 302 من الخادم، `noindex`، ومحجوبة في robots.txt). الوجهات الحقيقية في `lib/config.ts`
  داخل `carsTargetUrl()` و `hotelTargetUrl()` فقط.
- نصوص الموقع (الفوتر، الخصوصية، الإفصاح) لا تذكر اسم الشبكة. إفصاح العمولة العام **باقٍ عمدًا**
  (مطلوب قانونيًا في الاتحاد الأوروبي وأمريكا ومن سياسات AdSense) — لا تحذفه.
- ما لا يمكن إخفاؤه: سكربتات الودجت وعنوان التحويل يظهران لمن يفحص الشبكة (F12). هذا طبيعي في أي موقع أفلييت.

## تصحيحات هذه النسخة
- ويدجت الفنادق كان يوجّه البحث إلى دومين غير موجود (`hotels.ticketsjet.com`) — صُحّح إلى `search.hotellook.com`.
- نوع الوايت ليبل عندك Widget (لا Page)، لذلك حُذف إعداد دومينات Page القديم.
- صفحات النموذج والنتائج: الحاويتان لازم تكونان في نفس الصفحة (حسب لوحة Travelpayouts)، وهذا مطبّق في `/` و `/flights`.

## Update: map, cars, project id
- `trs` = **34009** (project www.ticketsjet.com). Marker 271745.
- `/explore` — interactive price map (`WIDGETS.priceMap`). Clicking a price opens the offer on the provider's site (the map's host list doesn't include your own domain).
- `/cars` — on-site rental widget (`WIDGETS.carsWl`, change `country`/`city` ids in `lib/config.ts` for the default city) + secondary search (`WIDGETS.carsSearch`).
- Hotels: no hotel program is approved yet (needs ~3 months of stable traffic + travel content). The Stays widget likely earns nothing until then; consider hiding the tab.
- Nothing public mentions the network name; outbound hotel links go through `/go/hotels/*` (noindex, disallowed in robots).

## Custom price map (/explore)
- Own Leaflet map (dark CARTO tiles) at `/explore`; pins click through to `/flights` on your own site with origin/destination/dates in the URL.
- Needs ONE environment variable in Vercel: `TP_API_TOKEN` = your API token (Travelpayouts → Profile → API token). Server-side only, never exposed to the browser.
- Without the token (or if the API fails) the page falls back to the stock Aviasales map widget automatically.
- Data: `/api/map-prices?origin=AMS` (city-directions API + public cities.json for coordinates), `/api/cities?q=` (departure autocomplete).
- Unverified: whether the White Label search form on /flights reads `origin_iata/destination_iata/depart_date/return_date` from the URL. If it doesn't, the form opens empty.
