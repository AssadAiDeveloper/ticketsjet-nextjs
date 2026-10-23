"use client";

import { useEffect } from "react";
import { WL_WEB } from "@/lib/config";

/**
 * White Label Web (نوع Widget) — wl_id مضبوط في lib/config.ts
 * السكربت يبحث عن الحاويتين عند تحميله مرة واحدة فقط:
 *   #tpwl-search  → نموذج البحث
 *   #tpwl-tickets → نتائج البحث (تظهر في نفس الصفحة)
 *
 * التحميل يتم من مكان واحد فقط (WlResults) حتى لا يتكرر.
 */
function bootWlScript() {
  const existing = document.getElementById("tpwl-embed");

  if (existing) {
    // السكربت محمَّل من زيارة سابقة (تنقّل داخلي بين الصفحات) لكن الحاويتان جديدتان
    // والسكربت لن يعيد فحصهما → نعيد تحميل الصفحة مرة واحدة ليلتقطهما.
    // حارس ضد التكرار: لا نعيد التحميل أكثر من مرة كل 4 ثوانٍ
    // (يغطي أيضًا الاستدعاء المزدوج لـ React StrictMode في وضع التطوير).
    try {
      const last = Number(sessionStorage.getItem("tpwl_reload") || 0);
      if (Date.now() - last > 4000) {
        sessionStorage.setItem("tpwl_reload", String(Date.now()));
        window.location.reload();
      }
    } catch {
      /* sessionStorage غير متاح — نتجاهل */
    }
    return;
  }

  const s = document.createElement("script");
  s.id = "tpwl-embed";
  s.async = true;
  s.type = "module";
  s.src = WL_WEB.src;
  document.head.appendChild(s);
}

/** نموذج البحث — ضعه مرة واحدة فقط في الصفحة */
export function WlSearchForm() {
  return <div id="tpwl-search" style={{ minHeight: 120 }} aria-label="Flight search" />;
}

/** حاوية النتائج — مرة واحدة فقط في نفس صفحة النموذج. تُشغّل تحميل السكربت. */
export function WlResults() {
  useEffect(() => {
    bootWlScript();
  }, []);
  return <div id="tpwl-tickets" />;
}
