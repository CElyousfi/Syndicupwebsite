"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Dari, DariAvatar, type DariPose } from "@/components/dari";
import type { FaqTab, MessengerCopy } from "@/content/types";
import { href, type Locale } from "@/lib/i18n";
import { whatsappHref } from "@/lib/site";

/**
 * Le messager du site, en bas à droite — même grammaire que celui de
 * DoorLoop : un accueil (salut, actions, recherche), une conversation avec
 * l'assistant, et l'aide. L'assistant passe par /api/chat (Groq, côté
 * serveur) ; la conversation reste dans le navigateur de la personne.
 */

type View = "home" | "chat" | "help";
type Msg = { role: "user" | "assistant"; content: string; error?: boolean };
/** Ce que fait Dari pendant une réponse : il réfléchit, il écrit, il montre la réponse. */
type Mood = "idle" | "think" | "type" | "point";

/** Pour ouvrir l'assistant depuis n'importe quelle page : window.dispatchEvent(new CustomEvent(ASK_EVENT, { detail: { q } })). */
export const ASK_EVENT = "su:ask-dari";
const NUDGE_KEY = "su-dari-nudge";

const STORE = "su-chat-v1";

function load(): Msg[] {
  try {
    const raw = window.localStorage.getItem(STORE);
    const v = raw ? (JSON.parse(raw) as Msg[]) : [];
    return Array.isArray(v) ? v.filter((m) => !m.error).slice(-30) : [];
  } catch {
    return [];
  }
}
function save(msgs: Msg[]) {
  try {
    window.localStorage.setItem(STORE, JSON.stringify(msgs.filter((m) => !m.error).slice(-30)));
  } catch {
    /* stockage indisponible : la conversation vit en mémoire */
  }
}

const strip = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export function Messenger({
  locale,
  copy,
  faq,
  whatsappMessage,
}: {
  locale: Locale;
  copy: MessengerCopy;
  faq: FaqTab[];
  whatsappMessage: string;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("home");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState<Mood>("idle");
  const [nudge, setNudge] = useState(false);
  const [hover, setHover] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => setMsgs(load()), []);

  // Échap ferme ; sur téléphone, la page ne défile pas derrière le panneau.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const small = window.matchMedia("(max-width: 639px)").matches;
    if (small) document.documentElement.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const q = text.trim();
      if (!q || busy) return;
      setView("chat");
      setDraft("");
      const history: Msg[] = [...msgs.filter((m) => !m.error), { role: "user", content: q }];
      setMsgs([...history, { role: "assistant", content: "" }]);
      setBusy(true);
      setMood("think");
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      let answer = "";
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
          signal: ctrl.signal,
        });
        if (!res.ok || !res.body) {
          let code = "";
          try {
            code = ((await res.json()) as { error?: string }).error ?? "";
          } catch {
            /* corps vide */
          }
          const err = code === "busy" ? copy.errors.busy : res.status === 429 ? copy.errors.rate : copy.errors.down;
          setMsgs([...history, { role: "assistant", content: err, error: true }]);
          setMood("idle");
          return;
        }
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          answer += dec.decode(value, { stream: true });
          if (answer) setMood("type");
          setMsgs([...history, { role: "assistant", content: answer }]);
        }
        const final: Msg[] = answer.trim()
          ? [...history, { role: "assistant", content: answer.trim() }]
          : [...history, { role: "assistant", content: copy.errors.down, error: true }];
        setMsgs(final);
        save(final);
        setMood(answer.trim() ? "point" : "idle");
        if (answer.trim()) window.setTimeout(() => setMood("idle"), 2600);
      } catch {
        if (!ctrl.signal.aborted) {
          setMsgs([...history, { role: "assistant", content: copy.errors.network, error: true }]);
        }
        setMood("idle");
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, msgs, copy.errors],
  );

  // Les autres pages peuvent ouvrir Dari, avec ou sans question.
  useEffect(() => {
    const onAsk = (e: Event) => {
      const q = (e as CustomEvent<{ q?: string }>).detail?.q;
      setOpen(true);
      setNudge(false);
      setView("chat");
      if (q) void send(q);
    };
    window.addEventListener(ASK_EVENT, onAsk);
    return () => window.removeEventListener(ASK_EVENT, onAsk);
  }, [send]);

  // Une fois par visite, Dari se présente au bout de quelques secondes.
  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(NUDGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    const t = window.setTimeout(() => setNudge(true), 6000);
    return () => window.clearTimeout(t);
  }, []);
  const closeNudge = () => {
    setNudge(false);
    try {
      window.sessionStorage.setItem(NUDGE_KEY, "1");
    } catch {
      /* rien */
    }
  };
  useEffect(() => {
    if (open) closeNudge();
  }, [open]);

  const reset = () => {
    abortRef.current?.abort();
    setMsgs([]);
    save([]);
    setBusy(false);
    setMood("idle");
  };

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-label={copy.chatTitle}
          className="messenger-panel fixed inset-0 z-80 flex flex-col overflow-hidden bg-white outline-none sm:inset-auto sm:bottom-[92px] sm:end-[22px] sm:h-[min(690px,calc(100svh-120px))] sm:w-[400px] sm:rounded-[22px] sm:shadow-[0_30px_80px_-20px_rgb(14_16_20_/_0.45),0_0_0_1px_rgb(14_16_20_/_0.06)]"
        >
          {view === "home" && (
            <HomeView
              copy={copy}
              faq={faq}
              locale={locale}
              whatsapp={whatsappHref(whatsappMessage)}
              onClose={() => setOpen(false)}
              onAsk={() => setView("chat")}
              onSearch={(q) => {
                setQuery(q);
                setView("help");
              }}
              onQuestion={(q) => {
                setQuery(q);
                setView("help");
              }}
              hasConversation={msgs.length > 0}
            />
          )}
          {view === "chat" && (
            <ChatView
              copy={copy}
              locale={locale}
              msgs={msgs}
              busy={busy}
              draft={draft}
              setDraft={setDraft}
              onSend={send}
              onBack={() => setView("home")}
              onClose={() => setOpen(false)}
              onReset={reset}
              whatsapp={whatsappHref(whatsappMessage)}
              mood={mood}
            />
          )}
          {view === "help" && (
            <HelpView
              copy={copy}
              faq={faq}
              query={query}
              setQuery={setQuery}
              onClose={() => setOpen(false)}
              onAsk={(q) => send(q)}
            />
          )}
          {view !== "chat" && (
            <nav className="grid shrink-0 grid-cols-3 border-t border-hairline bg-white" aria-label={copy.chatTitle}>
              <TabButton active={view === "home"} label={copy.tabs.home} onClick={() => setView("home")} icon="home" />
              <TabButton active={false} label={copy.tabs.messages} onClick={() => setView("chat")} icon="chat" dot={msgs.length > 0} />
              <TabButton active={view === "help"} label={copy.tabs.help} onClick={() => setView("help")} icon="help" />
            </nav>
          )}
        </div>
      )}

      {nudge && !open && (
        <div className="dari-nudge fixed bottom-[96px] end-[22px] z-80 w-[min(300px,calc(100vw-44px))] rounded-[20px] bg-white p-4 pe-9 shadow-[0_24px_60px_-20px_rgb(14_16_20_/_0.45),0_0_0_1px_rgb(14_16_20_/_0.06)]">
          <button
            type="button"
            onClick={closeNudge}
            aria-label={copy.close}
            className="absolute end-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-soft hover:bg-hover hover:text-ink"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M11.9 11.9 8 8m0 0L4.1 4.1M8 8l3.9-3.9M8 8l-3.9 3.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setView("chat");
            }}
            className="flex items-center gap-3 text-start"
          >
            <Dari pose="wave" size={64} />
            <span>
              <span className="block text-[15px] font-bold text-ink">{copy.nudgeTitle}</span>
              <span className="mt-0.5 block text-[13.5px] leading-[1.4] text-body">{copy.nudgeBody}</span>
            </span>
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-expanded={open}
        aria-label={open ? copy.close : copy.launcher}
        className={`fixed bottom-[22px] end-[22px] z-80 inline-flex h-[56px] items-center rounded-full bg-vivid text-white shadow-[0_18px_40px_-12px_rgb(20_90_58_/_0.6)] transition-[background-color,transform] hover:bg-action-deep active:scale-[0.97] ${
          open ? "w-[56px] justify-center max-sm:hidden" : "ps-[64px] pe-[22px]"
        }`}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M11.9 11.9 8 8m0 0L4.1 4.1M8 8l3.9-3.9M8 8l-3.9 3.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <>
            {/* Dari dépasse du bouton, comme penché par-dessus. */}
            <span className="pointer-events-none absolute -top-[22px] start-[2px] flex h-[78px] w-[62px] items-end justify-center">
              <Dari pose={hover ? "wave" : "head"} size={hover ? 64 : 58} />
            </span>
            <span className="text-[15px] font-semibold">{copy.launcher}</span>
          </>
        )}
      </button>
    </>
  );
}

/* ── Accueil ─────────────────────────────────────────────────────────────── */

function HomeView({
  copy,
  faq,
  locale,
  whatsapp,
  onClose,
  onAsk,
  onSearch,
  onQuestion,
  hasConversation,
}: {
  copy: MessengerCopy;
  faq: FaqTab[];
  locale: Locale;
  whatsapp: string;
  onClose: () => void;
  onAsk: () => void;
  onSearch: (q: string) => void;
  onQuestion: (q: string) => void;
  hasConversation: boolean;
}) {
  const popular = useMemo(() => faq.flatMap((t) => t.items.slice(0, 1)).slice(0, 4), [faq]);
  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-ground">
      <header className="relative bg-[linear-gradient(160deg,#1f7a50_0%,#17603f_55%,#0f4a30_100%)] px-6 pb-24 pt-6 text-white">
        <svg viewBox="0 0 256 256" aria-hidden="true" className="pointer-events-none absolute -end-10 -top-10 h-[220px] w-[220px] opacity-[0.12]">
          <path d="M -60 70 C 30 -40 150 10 128 100 C 106 190 -20 220 26 140 C 72 60 210 20 240 110 C 270 200 160 310 92 250 C 24 190 120 100 330 150" stroke="#dff28a" strokeWidth="30" strokeLinecap="round" fill="none" />
        </svg>
        <div className="relative flex items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/syndicup-logo-reversed.svg" alt="SyndicUp" className="h-[24px] w-auto" dir="ltr" />
          <CloseButton label={copy.close} onClick={onClose} light />
        </div>
        <span className="pointer-events-none absolute end-2 top-[58px]">
          <Dari pose="wave" size={132} sparkles priority />
        </span>
        <p className="relative mt-12 max-w-[210px] text-[30px] font-bold leading-[1.15] tracking-[-0.02em]">{copy.greeting}</p>
        <p className="relative mt-1 max-w-[220px] text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-white/65">{copy.subtitle}</p>
        <p className="relative mt-4 flex max-w-[230px] items-center gap-2 text-[13px] text-white/75">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          {copy.status}
        </p>
      </header>

      <div className="relative -mt-16 grid gap-3 px-4 pb-5">
        <button
          type="button"
          onClick={onAsk}
          className="group flex items-center gap-4 rounded-2xl bg-white p-5 text-start shadow-[0_8px_24px_-12px_rgb(14_16_20_/_0.25),0_0_0_1px_rgb(14_16_20_/_0.05)] hover:shadow-[0_12px_30px_-12px_rgb(14_16_20_/_0.3),0_0_0_1px_rgb(14_16_20_/_0.08)]"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[15.5px] font-bold text-ink">{hasConversation ? copy.tabs.messages : copy.askTitle}</span>
            <span className="mt-1 block text-[13.5px] leading-[1.4] text-soft">{copy.askDesc}</span>
          </span>
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-vivid text-white group-hover:bg-action-deep">
            <SendGlyph />
          </span>
        </button>

        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_-12px_rgb(14_16_20_/_0.25),0_0_0_1px_rgb(14_16_20_/_0.05)]">
          <Link href={href(locale, "/demo")} className="flex items-center gap-4 px-5 py-4 hover:bg-hover">
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold text-ink">{copy.demoTitle}</span>
              <span className="mt-0.5 block text-[13px] text-soft">{copy.demoDesc}</span>
            </span>
            <ArrowGlyph />
          </Link>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 border-t border-hairline px-5 py-4 hover:bg-hover">
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold text-ink">{copy.whatsappTitle}</span>
              <span className="mt-0.5 block text-[13px] text-soft">{copy.whatsappDesc}</span>
            </span>
            <ExternalGlyph />
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_-12px_rgb(14_16_20_/_0.25),0_0_0_1px_rgb(14_16_20_/_0.05)]">
          <form
            className="p-2"
            onSubmit={(e) => {
              e.preventDefault();
              const q = new FormData(e.currentTarget).get("q");
              onSearch(typeof q === "string" ? q : "");
            }}
          >
            <label className="flex items-center gap-2 rounded-xl bg-hover px-3.5 py-3">
              <span className="sr-only">{copy.searchPlaceholder}</span>
              <input
                name="q"
                placeholder={copy.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-[14.5px] text-ink outline-none placeholder:text-soft"
              />
              <SearchGlyph />
            </label>
          </form>
          <ul className="pb-2">
            {popular.map((item) => (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => onQuestion(item.q)}
                  className="flex w-full items-center gap-3 px-5 py-2.5 text-start text-[14px] text-ink hover:bg-hover"
                >
                  <span className="min-w-0 flex-1">{item.q}</span>
                  <ChevronGlyph />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── Conversation ────────────────────────────────────────────────────────── */

function ChatView({
  copy,
  locale,
  msgs,
  busy,
  draft,
  setDraft,
  onSend,
  onBack,
  onClose,
  onReset,
  whatsapp,
  mood,
}: {
  copy: MessengerCopy;
  locale: Locale;
  mood: Mood;
  msgs: Msg[];
  busy: boolean;
  draft: string;
  setDraft: (v: string) => void;
  onSend: (t: string) => void;
  onBack: () => void;
  onClose: () => void;
  onReset: () => void;
  whatsapp: string;
}) {
  const pose: DariPose = mood === "idle" ? "head" : mood;
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = listRef.current;
    // Conversation vide : on laisse Dari en haut, entier ; sinon, on suit la réponse.
    if (el) el.scrollTop = msgs.length ? el.scrollHeight : 0;
  }, [msgs]);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
  }, [draft]);

  return (
    <>
      <header className="flex shrink-0 items-center gap-2 border-b border-hairline px-3 py-3">
        <IconButton label={copy.back} onClick={onBack}>
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" className="rtl:rotate-180">
            <path d="M16.9 10H3.1M8.75 4.4 3.1 10l5.65 5.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconButton>
        <DariAvatar size={40} pose="head" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold text-ink">{copy.chatTitle}</p>
          <p className="truncate text-[12.5px] text-soft">
            {mood === "think" ? copy.thinking : mood === "type" ? copy.writing : copy.chatStatus}
          </p>
        </div>
        {msgs.length > 0 && (
          <IconButton label={copy.clear} onClick={onReset}>
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3.5 10a6.5 6.5 0 1 0 2-4.7M3.5 3.5v3.2h3.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconButton>
        )}
        <CloseButton label={copy.close} onClick={onClose} />
      </header>

      <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto bg-ground px-4 py-5" aria-live="polite">
        {msgs.length === 0 && (
          <div className="flex flex-col items-center pb-2 pt-3 text-center">
            <Dari pose="wave" size={124} sparkles />
            <p className="mt-2 text-[17px] font-bold text-ink">{copy.name}</p>
            <p className="mt-0.5 text-[13px] text-soft">{copy.intro}</p>
          </div>
        )}
        <Bubble role="assistant">{copy.welcome}</Bubble>
        {msgs.length === 0 && (
          <div className="mt-4 flex flex-wrap gap-2 ps-10">
            {copy.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSend(s)}
                dir="auto"
                className="rounded-full border border-vivid/30 bg-white px-3.5 py-2 text-[13.5px] font-medium text-action-deep hover:border-vivid hover:bg-action-wash"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {msgs.map((m, i) => (
          <Bubble key={i} role={m.role} error={m.error} pose={i === msgs.length - 1 && m.role === "assistant" ? pose : "head"}>
            {m.role === "assistant" ? (
              m.content ? (
                <Rich text={m.content} locale={locale} />
              ) : (
                <Typing label={copy.thinking} />
              )
            ) : (
              m.content
            )}
          </Bubble>
        ))}
      </div>

      {(mood === "think" || mood === "type") && (
        <div className="flex shrink-0 items-center gap-2 border-t border-hairline bg-ground px-4 py-1.5" aria-live="polite">
          <Dari pose={mood} size={44} />
          <span className="text-[13px] font-medium text-soft">{mood === "think" ? copy.thinking : copy.writing}</span>
        </div>
      )}
      <form
        className="shrink-0 border-t border-hairline bg-white px-3 pb-2 pt-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSend(draft);
        }}
      >
        <div className="flex items-end gap-2 rounded-2xl border border-hairline-strong bg-white px-3 py-2 focus-within:border-vivid">
          <label className="min-w-0 flex-1">
            <span className="sr-only">{copy.inputPlaceholder}</span>
            <textarea
              ref={inputRef}
              rows={1}
              dir="auto"
              value={draft}
              maxLength={2000}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  onSend(draft);
                }
              }}
              placeholder={copy.inputPlaceholder}
              className="block max-h-[132px] w-full resize-none bg-transparent py-1.5 text-[15px] leading-[1.45] text-ink outline-none placeholder:text-soft"
            />
          </label>
          <button
            type="submit"
            disabled={busy || !draft.trim()}
            aria-label={copy.send}
            className="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-vivid text-white disabled:bg-hairline-strong disabled:text-white"
          >
            <SendGlyph />
          </button>
        </div>
        <p className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-1 text-[11.5px] text-faint">
          <span>{copy.disclaimer}</span>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-action-deep hover:underline">
            {copy.human}
          </a>
        </p>
      </form>
    </>
  );
}

/* ── Aide ────────────────────────────────────────────────────────────────── */

function HelpView({
  copy,
  faq,
  query,
  setQuery,
  onClose,
  onAsk,
}: {
  copy: MessengerCopy;
  faq: FaqTab[];
  query: string;
  setQuery: (q: string) => void;
  onClose: () => void;
  onAsk: (q: string) => void;
}) {
  const [openQ, setOpenQ] = useState<string | null>(null);
  const q = strip(query.trim());
  const groups = useMemo(
    () =>
      faq
        .map((t) => ({
          label: t.label,
          items: q ? t.items.filter((i) => strip(`${i.q} ${i.a}`).includes(q)) : t.items,
        }))
        .filter((g) => g.items.length > 0),
    [faq, q],
  );
  useEffect(() => {
    // Une question choisie depuis l'accueil s'ouvre directement.
    const exact = faq.flatMap((t) => t.items).find((i) => i.q === query);
    if (exact) setOpenQ(exact.q);
  }, [faq, query]);

  return (
    <>
      <header className="shrink-0 border-b border-hairline px-4 pb-3 pt-4">
        <div className="flex items-center justify-between">
          <p className="text-[17px] font-bold text-ink">{copy.helpTitle}</p>
          <CloseButton label={copy.close} onClick={onClose} />
        </div>
        <label className="mt-3 flex items-center gap-2 rounded-xl bg-hover px-3.5 py-2.5">
          <span className="sr-only">{copy.searchPlaceholder}</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-[14.5px] text-ink outline-none placeholder:text-soft"
          />
          <SearchGlyph />
        </label>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {groups.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <p className="text-[14.5px] text-soft">{copy.helpEmpty}</p>
            <button type="button" onClick={() => onAsk(query)} className="btn btn-lime mt-4">
              {copy.helpAsk}
            </button>
          </div>
        ) : (
          groups.map((g) => (
            <section key={g.label} className="mb-2">
              <p className="px-3 pb-1 pt-3 text-[12.5px] font-semibold text-soft">{g.label}</p>
              <ul>
                {g.items.map((i) => {
                  const isOpen = openQ === i.q;
                  return (
                    <li key={i.q} className="rounded-xl">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenQ(isOpen ? null : i.q)}
                        className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-start text-[14.5px] font-medium text-ink hover:bg-hover"
                      >
                        <span className="min-w-0 flex-1">{i.q}</span>
                        <span className={`mt-1 transition-transform ${isOpen ? "rotate-90" : ""}`}>
                          <ChevronGlyph />
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-3 pb-3">
                          <p className="text-[14px] leading-[1.55] text-body">{i.a}</p>
                          <button
                            type="button"
                            onClick={() => onAsk(i.q)}
                            className="mt-2 text-[13px] font-semibold text-action-deep hover:underline"
                          >
                            {copy.helpAsk}
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        )}
      </div>
    </>
  );
}

/* ── Petites pièces ──────────────────────────────────────────────────────── */

function Bubble({
  role,
  error,
  pose = "head",
  children,
}: {
  role: "user" | "assistant";
  error?: boolean;
  pose?: DariPose;
  children: ReactNode;
}) {
  if (role === "user") {
    return (
      <div className="mt-3 flex justify-end">
        <div dir="auto" className="max-w-[82%] whitespace-pre-wrap rounded-2xl rounded-ee-md bg-vivid px-4 py-2.5 text-[14.5px] leading-[1.45] text-white">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="mt-3 flex items-end gap-2">
      <DariAvatar size={30} pose={pose} />
      <div
        dir="auto"
        className={`max-w-[85%] rounded-2xl rounded-es-md px-4 py-2.5 text-[14.5px] leading-[1.5] ${
          error ? "bg-[#fbeceb] text-[#8a2a22]" : "bg-white text-ink shadow-[0_0_0_1px_rgb(14_16_20_/_0.06)]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/** Markdown léger : paragraphes, listes, **gras**, [liens](url). Aucun HTML injecté. */
function Rich({ text, locale }: { text: string; locale: Locale }) {
  const blocks = text.replace(/\r/g, "").split(/\n{2,}/);
  return (
    <div className="grid gap-2">
      {blocks.map((b, i) => {
        const lines = b.split("\n").filter((l) => l.trim());
        const isList = lines.length > 0 && lines.every((l) => /^\s*([-*•]|\d+[.)])\s+/.test(l));
        if (isList) {
          const ordered = /^\s*\d/.test(lines[0]!);
          const items = lines.map((l) => l.replace(/^\s*([-*•]|\d+[.)])\s+/, ""));
          const Tag = ordered ? "ol" : "ul";
          return (
            <Tag key={i} className={`grid gap-1 ps-5 ${ordered ? "list-decimal" : "list-disc"} marker:text-action`}>
              {items.map((it, j) => (
                <li key={j}>
                  <Inline text={it} locale={locale} />
                </li>
              ))}
            </Tag>
          );
        }
        return (
          <p key={i}>
            {lines.map((l, j) => (
              <span key={j}>
                {j > 0 && <br />}
                <Inline text={l.replace(/^#+\s*/, "")} locale={locale} />
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function safeHref(raw: string): string | null {
  const url = raw.trim();
  if (url.startsWith("/")) return url;
  try {
    const u = new URL(url);
    if (u.hostname === "syndicup.pro" || u.hostname.endsWith(".syndicup.pro") || u.hostname === "syndicup.ma") {
      return u.hostname === "syndicup.pro" ? `${u.pathname}${u.search}${u.hash}` : u.toString();
    }
    if (u.protocol === "https:" && (u.hostname === "wa.me" || u.hostname.endsWith("gov.ma"))) return u.toString();
  } catch {
    return null;
  }
  return null;
}

function Inline({ text, locale }: { text: string; locale: Locale }) {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(<strong key={k++} className="font-semibold">{m[1]}</strong>);
    } else {
      const target = safeHref(m[3]!);
      if (!target) out.push(m[2]);
      else if (target.startsWith("/")) {
        const path = target.startsWith(`/${locale}`) ? target : href(locale, target);
        out.push(
          <Link key={k++} href={path} className="font-semibold text-action-deep underline underline-offset-2">
            {m[2]}
          </Link>,
        );
      } else
        out.push(
          <a key={k++} href={target} target="_blank" rel="noopener noreferrer" className="font-semibold text-action-deep underline underline-offset-2">
            {m[2]}
          </a>,
        );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

function Typing({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label={label}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-soft" style={{ animationDelay: `${i * 140}ms` }} />
      ))}
    </span>
  );
}

function TabButton({
  active,
  label,
  onClick,
  icon,
  dot = false,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  icon: "home" | "chat" | "help";
  dot?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex flex-col items-center gap-1 py-3 text-[12.5px] font-semibold ${active ? "text-vivid" : "text-soft hover:text-ink"}`}
    >
      <span className="relative">
        {icon === "home" && (
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3.5 10.2 12 3.8l8.5 6.4V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M8.5 15.2c1 .9 2.2 1.4 3.5 1.4s2.5-.5 3.5-1.4" stroke={active ? "#fff" : "currentColor"} strokeWidth="1.7" strokeLinecap="round" fill="none" />
          </svg>
        )}
        {icon === "chat" && (
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 3.5h14A1.5 1.5 0 0 1 20.5 5v15.2l-4.1-3.7H5A1.5 1.5 0 0 1 3.5 15V5A1.5 1.5 0 0 1 5 3.5Z" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M7.5 8h9M7.5 12h5" stroke={active ? "#fff" : "currentColor"} strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        )}
        {icon === "help" && (
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8.8" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" />
            <path d="M9.7 9.4a2.4 2.4 0 1 1 3.9 1.9c-.8.6-1.4 1-1.4 2" stroke={active ? "#fff" : "currentColor"} strokeWidth="1.7" strokeLinecap="round" fill="none" />
            <circle cx="12.2" cy="16.4" r="1" fill={active ? "#fff" : "currentColor"} />
          </svg>
        )}
        {dot && <span className="absolute -end-0.5 -top-0.5 h-2 w-2 rounded-full bg-lime ring-2 ring-white" />}
      </span>
      {label}
    </button>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-soft hover:bg-hover hover:text-ink">
      {children}
    </button>
  );
}

function CloseButton({ label, onClick, light = false }: { label: string; onClick: () => void; light?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${light ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-soft hover:bg-hover hover:text-ink"}`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M11.9 11.9 8 8m0 0L4.1 4.1M8 8l3.9-3.9M8 8l-3.9 3.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </button>
  );
}

const SendGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 17 16" aria-hidden="true" className="rtl:-scale-x-100">
    <path fill="currentColor" fillRule="evenodd" d="m4.563 14.605 9.356-5.402c1-.577 1-2.02 0-2.598L4.563 1.203a1.5 1.5 0 0 0-2.25 1.3v10.803a1.5 1.5 0 0 0 2.25 1.3M6.51 8.387 2.313 9.512V6.297L6.51 7.42c.494.133.494.834 0 .966" clipRule="evenodd" />
  </svg>
);
const ArrowGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" className="shrink-0 text-action-deep rtl:rotate-180">
    <path d="M3.125 10h13.75M11.25 4.375 16.875 10l-5.625 5.625" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ExternalGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0 text-action-deep">
    <path fill="currentColor" fillRule="evenodd" d="M3 3.7h4V2H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2h-1.7v2a.3.3 0 0 1-.3.3H3a.3.3 0 0 1-.3-.3V4a.3.3 0 0 1 .3-.3M9.218 3c0 .47.38.85.85.85h1.88L8.296 7.502a.85.85 0 0 0 1.202 1.202l3.652-3.652v1.88a.85.85 0 0 0 1.7 0V3a.85.85 0 0 0-.85-.85h-3.932a.85.85 0 0 0-.85.85" clipRule="evenodd" />
  </svg>
);
const SearchGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-action-deep">
    <circle cx="7.5" cy="7.5" r="4.625" stroke="currentColor" strokeWidth="1.75" />
    <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);
const ChevronGlyph = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0 text-faint rtl:rotate-180">
    <path d="m6 3.5 4.5 4.5L6 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
