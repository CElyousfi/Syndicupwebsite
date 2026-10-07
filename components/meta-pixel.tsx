"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CONSENT_EVENT, hasConsent } from "@/lib/consent";
import { META_PIXEL_ID, metaEnabled, rememberOrigin, track } from "@/lib/meta";

/** Pages dont la simple visite signale un intérêt fort : comptées en ViewContent. */
const INTENT_PAGES: Record<string, string> = {
  "/tarifs": "Tarifs",
  "/demo": "Démo",
  "/fonctionnalites": "Fonctionnalités",
};

/**
 * Pixel Meta. Ne charge `fbevents.js` qu'après consentement, puis compte :
 *   - PageView à chaque navigation (y compris côté client) ;
 *   - ViewContent sur les pages d'intention ;
 *   - ViewContent à la lecture du film ;
 *   - Contact à chaque clic vers WhatsApp, un e-mail ou un téléphone —
 *     écouté au niveau du document, sans toucher aux liens eux-mêmes.
 */
export function MetaPixel() {
  const pathname = usePathname();
  const [granted, setGranted] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    rememberOrigin();
    if (!metaEnabled) return;
    setGranted(hasConsent("publicite"));
    const onConsent = () => setGranted(hasConsent("publicite"));
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  // Chargement du script, une seule fois, au premier consentement.
  useEffect(() => {
    if (!granted || loaded.current) return;
    loaded.current = true;
    if (!window.fbq) {
      const fbq = function (...args: unknown[]) {
        if (fbq.callMethod) (fbq.callMethod as (...a: unknown[]) => void)(...args);
        else fbq.queue.push(args);
      } as ((...args: unknown[]) => void) & { callMethod?: unknown; queue: unknown[]; loaded: boolean; version: string; push: unknown };
      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.push = fbq;
      window.fbq = fbq;
      (window as unknown as { _fbq: unknown })._fbq = fbq;
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(s);
    }
    window.fbq("init", META_PIXEL_ID);
  }, [granted]);

  // Retrait du consentement : le pixel cesse d'envoyer quoi que ce soit.
  useEffect(() => {
    if (!granted && loaded.current) window.fbq?.("consent", "revoke");
    if (granted && loaded.current) window.fbq?.("consent", "grant");
  }, [granted]);

  // PageView et ViewContent à chaque changement de page.
  useEffect(() => {
    if (!granted) return;
    track("PageView");
    const path = pathname.replace(/^\/(fr|ar)(?=\/|$)/, "") || "/";
    const label = INTENT_PAGES[path];
    if (label) track("ViewContent", { content_name: label, content_category: "page" });
  }, [granted, pathname]);

  // Contact : clics sortants vers WhatsApp, e-mail, téléphone.
  useEffect(() => {
    if (!granted) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const channel = href.startsWith("https://wa.me")
        ? "whatsapp"
        : href.startsWith("mailto:")
          ? "email"
          : href.startsWith("tel:")
            ? "telephone"
            : null;
      if (channel) track("Contact", { content_name: channel });
    };
    // Lecture du film de lancement : une fois par page.
    let filmCounted = false;
    const onPlay = (e: Event) => {
      if (filmCounted || !(e.target instanceof HTMLVideoElement)) return;
      filmCounted = true;
      track("ViewContent", { content_name: "Film de lancement", content_category: "video" });
    };
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("play", onPlay, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("play", onPlay, { capture: true });
    };
  }, [granted]);

  return null;
}
