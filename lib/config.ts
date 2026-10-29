// ============================================================
// TicketsJet — Partner network configuration
// كل إعدادات الأفلييت في مكان واحد. عدّل هنا فقط.
// ============================================================

export const SITE = {
  name: "TicketsJet",
  url: "https://ticketsjet.com",
  tagline: "Cheap flights, compared in one search.",
  description:
    "TicketsJet compares airlines, travel agencies and car rental companies to help you find good travel deals. No booking fees — you book directly with the provider.",
};

// --- Partner credentials (من لوحة الشريك: ID 271745) ---
export const TP = {
  marker: "271745",
  trs: "34009", // معرّف مشروع www.ticketsjet.com في لوحة الشريك (مؤكَّد من أكواد الودجت)
};

// --- White Label Web (نوع Widget) — مؤكَّد من لوحة التحكم: wl_id=22715 / ticketsjet.com ---
// النموذج (#tpwl-search) والنتائج (#tpwl-tickets) يظهران داخل صفحات ticketsjet.com نفسها.
// ملاحظة من اللوحة: حاويتا النموذج والنتائج يجب أن تكونا في نفس الصفحة.
export const WL_WEB = {
  id: "22715",
  src: "https://tpwgts.com/wl_web/main.js?wl_id=22715",
};

// --- ويدجت الفنادق (يبحث ثم ينقل الزبون لصفحة المزوّد) ---
// الألوان على هوية الموقع (كحلي #0B1B2B + كهرماني #FFB703)
export const WIDGETS = {
  // خارطة الأسعار (Aviasales — Prices on Map، promo 4054). الضغط على "Find this ticket" يفتح موقع المزوّد.
  priceMap: `https://tpwgts.com/content?currency=usd&trs=${TP.trs}&shmarker=${TP.marker}&lat=51.5073509&lng=-0.1277583&powered_by=false&search_host=www.aviasales.com%2Fsearch&locale=en&origin=LON&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&primary=%23FFB703&secondary=%23FFB703&light=%230B1B2B&width=1500&height=520&zoom=2&promo_id=4054&campaign_id=100`,
  // تأجير السيارات — Localrent White Label Widget (promo 2466): البحث والنتائج داخل الصفحة. بداية: إسبانيا / برشلونة
  carsWl: `https://tpwgts.com/content?trs=${TP.trs}&shmarker=${TP.marker}&locale=en&country=35&city=60691&powered_by=false&campaign_id=87&promo_id=2466`,
  // تأجير السيارات — GetRentacar (10%، كوكيز 90 يومًا): نموذج بحث ينقل الزبون لموقع المزوّد
  carsSearch: `https://tpwgts.com/content?trs=${TP.trs}&shmarker=${TP.marker}&locale=en&powered_by=false&border_radius=12&plain=true&show_logo=false&color_background=%23ffffff&color_button=%23FFB703&color_text=%230B1B2B&color_input_text=%230B1B2B&color_button_text=%230B1B2B&promo_id=4480&campaign_id=10`,
};

/** Things-to-do widget for one city (Tiqets city id). Results open on the partner's site. */
export const activitiesWidget = (cityId: number, cards = 6, language = "en", currency = "USD") =>
  `https://tpwgts.com/content?currency=${currency}&trs=${TP.trs}&shmarker=${TP.marker}&language=${language}&locale=${cityId}&layout=horizontal&cards=${cards}&powered_by=false&campaign_id=89&promo_id=3947`;

// ============================================================
// روابط الإحالة — تمر عبر مسارات داخلية /go/* على دومينك
// بحيث لا يظهر اسم الشبكة ولا الماركر في الرابط الذي يراه الزائر.
// الوجهات الحقيقية تُبنى في الخادم فقط: app/go/**/route.ts
// ============================================================
export function tpRedirect(campaignId: string, programId: string, targetUrl: string) {
  return `https://tp.media/r?campaign_id=${campaignId}&marker=${TP.marker}&p=${programId}&trs=${TP.trs}&u=${encodeURIComponent(targetUrl)}`;
}

/** الروابط الظاهرة للزائر */
// السيارات صارت صفحة داخل الموقع (ودجت White Label من Localrent) — لا رابط خارجي
export const CARS_LINK = "/cars";

/**
 * Hotel search on Booking.com (plain link, no affiliate tracking yet).
 * If you join an affiliate programme later, add its id/params here — it is the only place that builds these links.
 */
export function bookingUrl(o: { city: string; checkin?: string; checkout?: string; adults?: number; children?: number; rooms?: number }) {
  const q = new URLSearchParams({ ss: o.city, group_adults: String(o.adults ?? 2), no_rooms: String(o.rooms ?? 1), group_children: String(o.children ?? 0) });
  if (o.checkin) q.set("checkin", o.checkin);
  if (o.checkout) q.set("checkout", o.checkout);
  return `https://www.booking.com/searchresults.html?${q.toString()}`;
}

// --- AdSense ---
// ضع معرّف AdSense في متغير البيئة NEXT_PUBLIC_ADSENSE_CLIENT (مثال: ca-pub-1234567890123456)
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-6572349186702622";
