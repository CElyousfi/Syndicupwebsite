/**
 * Les e-mails d'une demande de démo — serveur uniquement.
 *
 * Écrits en tableaux et styles en ligne : c'est la seule mise en page que
 * Gmail, Outlook et l'app Mail affichent pareil. Couleurs et ton reprennent
 * le site (vert #1E7A50, citron #DFF28A, encre #121212, grège #ECEBE4).
 */

import { SITE } from "@/lib/site";
import { displayPhone, firstName, ROLES, SLOTS, type LeadInput } from "@/lib/lead";

const C = {
  ink: "#121212",
  body: "#45515c",
  faint: "#7d8583",
  ground: "#ecebe4",
  rule: "#e0ded4",
  vivid: "#1e7a50",
  lime: "#dff28a",
  tint: "#e6efea",
};
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export interface LeadMeta {
  id: string;
  phoneIntl: string;
  receivedAt: Date;
  origin: Record<string, string>;
  page?: string;
  referrer?: string;
}

function casablanca(d: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Casablanca",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function originLabel(o: Record<string, string>): string {
  if (o.utm_source || o.utm_campaign) return [o.utm_source, o.utm_medium, o.utm_campaign, o.utm_content].filter(Boolean).join(" / ");
  if (o.fbclid) return "Annonce Meta (fbclid)";
  return "Visite directe";
}

/** Le message WhatsApp pré-rédigé que l'équipe envoie en un geste. */
function whatsappReply(v: LeadInput, phoneIntl: string) {
  const text =
    v.lang === "ar"
      ? `السلام عليكم ${firstName(v.name)}، معك فريق SyndicUp. توصلنا بطلبك للعرض التوضيحي. ما هو الوقت المناسب لك هذا الأسبوع؟`
      : `Bonjour ${firstName(v.name)}, ici l'équipe SyndicUp. Nous avons bien reçu votre demande de démo${v.lots ? ` pour ${v.lots} lots` : ""}. Quel créneau vous arrange cette semaine ?`;
  return `https://wa.me/${phoneIntl}?text=${encodeURIComponent(text)}`;
}

function button(href: string, label: string, kind: "dark" | "lime" | "light") {
  const bg = kind === "dark" ? C.ink : kind === "lime" ? C.lime : "#ffffff";
  const fg = kind === "dark" ? "#ffffff" : C.ink;
  const border = kind === "light" ? `1px solid ${C.rule}` : `1px solid ${bg}`;
  return `<a href="${esc(href)}" style="display:inline-block;background:${bg};color:${fg};border:${border};border-radius:6px;padding:13px 20px;font:600 15px/1 ${FONT};text-decoration:none;margin:0 8px 8px 0">${esc(label)}</a>`;
}

function shell(preheader: string, inner: string) {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>SyndicUp</title></head>
<body style="margin:0;padding:0;background:${C.ground}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ground}"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
<tr><td style="padding:0 4px 16px;font:800 20px/1 ${FONT};color:${C.ink};letter-spacing:-0.02em">
<span style="display:inline-block;width:12px;height:12px;background:${C.vivid};border-radius:3px;margin-right:8px;vertical-align:1px"></span>Syndic<span style="color:${C.vivid}">Up</span>
</td></tr>
${inner}
<tr><td style="padding:18px 4px 0;font:400 12px/1.6 ${FONT};color:${C.faint}">${esc(SITE.name)} · Le logiciel de syndic qui peut prouver · ${esc(SITE.city)}, Maroc</td></tr>
</table></td></tr></table></body></html>`;
}

function row(label: string, valueHtml: string) {
  return `<tr>
<td style="padding:11px 0;border-top:1px solid ${C.rule};font:500 13px/1.4 ${FONT};color:${C.faint};width:150px;vertical-align:top">${esc(label)}</td>
<td style="padding:11px 0;border-top:1px solid ${C.rule};font:600 15px/1.45 ${FONT};color:${C.ink};vertical-align:top">${valueHtml}</td>
</tr>`;
}

/* ── E-mail interne : la fiche du prospect ─────────────────────────────── */

export function teamEmail(v: LeadInput, m: LeadMeta) {
  const role = v.role ? ROLES[v.role] : "—";
  const phone = displayPhone(m.phoneIntl);
  const lotsLabel = v.lots ? `${v.lots} lots${v.residences ? ` · ${v.residences} résidences` : ""}` : "—";
  const subject = `Démo · ${v.name} · ${role}${v.lots ? ` · ${v.lots} lots` : ""}${v.city ? ` · ${v.city}` : ""}`;
  const isPriority = v.role === "cabinet" || Number(v.lots) >= 120;

  const rows = [
    row("Rôle", esc(role)),
    row("Nom", esc(v.name)),
    v.organisation ? row(v.role === "cabinet" ? "Cabinet" : "Résidence", esc(v.organisation)) : "",
    row("Taille", esc(lotsLabel)),
    v.city ? row("Ville", esc(v.city)) : "",
    row("WhatsApp", `<a href="tel:+${m.phoneIntl}" style="color:${C.vivid};text-decoration:none;font-family:${MONO}">${esc(phone)}</a>`),
    row("E-mail", v.email ? `<a href="mailto:${esc(v.email)}" style="color:${C.vivid};text-decoration:none">${esc(v.email)}</a>` : `<span style="color:${C.faint};font-weight:400">non renseigné</span>`),
    row("Langue de la démo", v.lang === "ar" ? "العربية" : "Français"),
    v.slot ? row("Créneau préféré", esc(SLOTS[v.slot])) : "",
  ].join("");

  const message = v.message
    ? `<tr><td style="padding:0 28px 24px"><div style="background:${C.ground};border-radius:10px;padding:16px 18px;font:400 15px/1.6 ${FONT};color:${C.ink};white-space:pre-wrap">${esc(v.message)}</div></td></tr>`
    : "";

  const replyMail = v.email
    ? `mailto:${v.email}?subject=${encodeURIComponent("Votre démo SyndicUp")}&body=${encodeURIComponent(`Bonjour ${firstName(v.name)},\n\nMerci pour votre demande de démo. `)}`
    : "";

  const html = shell(
    `${role} · ${lotsLabel} · ${phone}`,
    `<tr><td style="background:#ffffff;border-radius:16px;overflow:hidden">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="background:${C.vivid};padding:22px 28px">
<div style="font:600 11px/1 ${MONO};letter-spacing:0.08em;color:${C.lime}">NOUVELLE DEMANDE DE DÉMO${isPriority ? " · PRIORITAIRE" : ""}</div>
<div style="font:800 24px/1.2 ${FONT};color:#ffffff;margin-top:10px;letter-spacing:-0.01em">${esc(v.name)}</div>
<div style="font:400 15px/1.4 ${FONT};color:${C.tint};margin-top:6px">${esc(role)}${v.lots ? ` · ${esc(v.lots)} lots` : ""}${v.city ? ` · ${esc(v.city)}` : ""}</div>
</td></tr>
<tr><td style="padding:22px 28px 10px">
${button(whatsappReply(v, m.phoneIntl), "Répondre sur WhatsApp", "dark")}${replyMail ? button(replyMail, "Répondre par e-mail", "light") : ""}
</td></tr>
<tr><td style="padding:4px 28px 18px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
${message}
<tr><td style="padding:16px 28px 22px;background:#fafaf7;border-top:1px solid ${C.rule}">
<div style="font:600 11px/1 ${MONO};letter-spacing:0.08em;color:${C.faint}">PROVENANCE</div>
<div style="font:400 13.5px/1.6 ${FONT};color:${C.body};margin-top:8px">
${esc(originLabel(m.origin))}<br>
${m.page ? `Page : ${esc(m.page)}<br>` : ""}${m.referrer ? `Référent : ${esc(m.referrer)}<br>` : ""}Reçue le ${esc(casablanca(m.receivedAt))} (heure de Casablanca)<br>
<span style="font-family:${MONO};font-size:12px;color:${C.faint}">Réf. ${esc(m.id)}</span>
</div></td></tr>
</table></td></tr>
<tr><td style="padding:14px 4px 0;font:400 13px/1.55 ${FONT};color:${C.body}">À faire : répondre dans l'heure ouvrable, proposer deux créneaux, puis noter le résultat (démo tenue, essai, payant) dans le suivi.</td></tr>`,
  );

  const text = [
    `NOUVELLE DEMANDE DE DÉMO${isPriority ? " (prioritaire)" : ""}`,
    "",
    `Rôle : ${role}`,
    `Nom : ${v.name}`,
    v.organisation ? `${v.role === "cabinet" ? "Cabinet" : "Résidence"} : ${v.organisation}` : null,
    `Taille : ${lotsLabel}`,
    v.city ? `Ville : ${v.city}` : null,
    `WhatsApp : ${phone}`,
    `E-mail : ${v.email || "non renseigné"}`,
    `Langue : ${v.lang === "ar" ? "arabe" : "français"}`,
    v.slot ? `Créneau : ${SLOTS[v.slot]}` : null,
    v.message ? `\nMessage :\n${v.message}` : null,
    "",
    `Répondre sur WhatsApp : ${whatsappReply(v, m.phoneIntl)}`,
    "",
    `Provenance : ${originLabel(m.origin)}`,
    m.page ? `Page : ${m.page}` : null,
    `Reçue le ${casablanca(m.receivedAt)}`,
    `Réf. ${m.id}`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return { subject, html, text };
}

/* ── E-mail au prospect : l'accusé de réception ────────────────────────── */

export function prospectEmail(v: LeadInput, m: LeadMeta) {
  const first = firstName(v.name);
  const phone = displayPhone(m.phoneIntl);
  const subject = "Votre démo SyndicUp : nous vous écrivons sur WhatsApp";
  const stepList: [string, string][] = [
    ["Sous une heure ouvrable", `Un message WhatsApp au ${phone} pour choisir le créneau.`],
    ["Vingt minutes", `Une résidence complète en ${v.lang === "ar" ? "arabe" : "français"} : comptabilité, 12 annexes, AG et PV.`],
    ["Si vous le souhaitez", "Envoyez votre fichier Excel avant : la démo se fera sur votre copropriété."],
  ];
  const steps = stepList
    .map(
      ([k, t], i) => `<tr>
<td style="padding:12px 0;border-top:1px solid ${C.rule};width:36px;vertical-align:top"><span style="display:inline-block;width:26px;height:26px;border-radius:13px;background:${C.lime};font:700 13px/26px ${FONT};color:${C.ink};text-align:center">${i + 1}</span></td>
<td style="padding:12px 0;border-top:1px solid ${C.rule};font:400 15px/1.5 ${FONT};color:${C.body}"><strong style="color:${C.ink}">${esc(k)}.</strong> ${esc(t)}</td></tr>`,
    )
    .join("");

  const html = shell(
    `Merci ${first}. Nous vous écrivons sur WhatsApp pour fixer le créneau.`,
    `<tr><td style="background:#ffffff;border-radius:16px;padding:30px 28px">
<div style="font:600 11px/1 ${MONO};letter-spacing:0.08em;color:${C.vivid}">DEMANDE REÇUE</div>
<h1 style="font:800 26px/1.2 ${FONT};color:${C.ink};margin:12px 0 0;letter-spacing:-0.015em">Merci ${esc(first)}, c'est noté.</h1>
<p style="font:400 16px/1.6 ${FONT};color:${C.body};margin:12px 0 18px">Votre démonstration de 20 minutes se prépare. Voici la suite :</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps}</table>
<p style="font:400 14px/1.6 ${FONT};color:${C.body};margin:20px 0 0">Une question d'ici là ? Répondez simplement à cet e-mail.</p>
</td></tr>`,
  );

  const text = [
    `Merci ${first}, c'est noté.`,
    "",
    `1. Sous une heure ouvrable : un message WhatsApp au ${phone} pour choisir le créneau.`,
    "2. Vingt minutes : une résidence complète — comptabilité, 12 annexes, AG et PV.",
    "3. Si vous le souhaitez : envoyez votre fichier Excel avant, la démo se fera sur votre copropriété.",
    "",
    "Une question d'ici là ? Répondez simplement à cet e-mail.",
    "",
    "SyndicUp — le logiciel de syndic qui peut prouver.",
  ].join("\n");

  return { subject, html, text };
}
