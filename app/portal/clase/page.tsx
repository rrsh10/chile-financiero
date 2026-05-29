"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, X } from "lucide-react";

/* ─── SLIDES ─────────────────────────────────── */
const SLIDES: Slide[] = [
  {
    id: 1,
    duration: 22,
    type: "title",
    eyebrow: "Módulo 01 · Clase 1",
    title: "Cómo funciona el dinero",
    subtitle: "y el sistema financiero en Chile",
    body: "Lo usamos todos los días. Pero nadie nos explicó cómo funciona de verdad.",
    accent: "red",
  },
  {
    id: 2,
    duration: 28,
    type: "concept",
    eyebrow: "Concepto base",
    title: "¿Qué es el dinero?",
    body: "El dinero es una herramienta de intercambio que todos aceptamos por acuerdo. Antes se usaba el trueque — te daba mis manzanas, me dabas tu trigo. El problema: ¿y si no necesitabas mis manzanas?",
    bullets: [
      "Es un acuerdo social — vale porque todos creemos que vale",
      "Permite comprar, vender, ahorrar e invertir",
      "En Chile usamos el Peso Chileno (CLP)",
      "El valor del dinero cambia con el tiempo → inflación",
    ],
    accent: "sky",
    visual: "money",
  },
  {
    id: 3,
    duration: 30,
    type: "concept",
    eyebrow: "El árbitro del sistema",
    title: "Banco Central de Chile",
    body: "El Banco Central es quien controla la cantidad de dinero que circula en el país. No es un banco donde puedes abrir cuenta — es el banco de los bancos.",
    bullets: [
      "Emite los billetes y monedas que usamos",
      "Fija la Tasa de Política Monetaria (TPM)",
      "La TPM sube → el crédito se encarece",
      "La TPM baja → el crédito se abarata",
    ],
    accent: "red",
    visual: "bank",
  },
  {
    id: 4,
    duration: 30,
    type: "diagram",
    eyebrow: "Mapa del sistema",
    title: "El sistema financiero chileno",
    body: "Son cuatro actores que interactúan entre sí. Entender quién hace qué te da poder.",
    diagram: [
      { label: "Banco Central", desc: "Regula y emite", color: "red" },
      { label: "CMF", desc: "Fiscaliza y protege", color: "sky" },
      { label: "Bancos", desc: "Intermedian tu dinero", color: "red" },
      { label: "Tú", desc: "Depositante o deudor", color: "sky" },
    ],
    accent: "sky",
  },
  {
    id: 5,
    duration: 28,
    type: "concept",
    eyebrow: "El árbitro",
    title: "CMF — Comisión para el Mercado Financiero",
    body: "La CMF es quien supervisa que los bancos, corredoras y aseguradoras jueguen con las reglas. Es el organismo que te protege como consumidor financiero.",
    bullets: [
      "Supervisa bancos, corredoras, AFP, aseguradoras",
      "Si un banco te cobra algo indebido → reclama a la CMF",
      "Publica las tasas máximas convencionales",
      "Su sitio web tiene información pública valiosa",
    ],
    accent: "red",
    visual: "shield",
  },
  {
    id: 6,
    duration: 28,
    type: "concept",
    eyebrow: "Cómo ganan los bancos",
    title: "Los bancos son intermediarios",
    body: "Los bancos no tienen dinero propio — tienen el tuyo. Te lo piden prestado (depósitos) y se lo prestan a otros (créditos). La diferencia entre ambas tasas es su ganancia.",
    bullets: [
      "Te pagan 1-3% por tu depósito a plazo",
      "Te cobran 10-30% por un crédito",
      "La diferencia = SPREAD = su negocio",
      "Entender esto = poder negociar mejor",
    ],
    accent: "sky",
    visual: "flow",
  },
  {
    id: 7,
    duration: 25,
    type: "takeaway",
    eyebrow: "Lo que nadie te dice",
    title: "La regla más importante",
    body: "El sistema financiero no está diseñado para explicarse solo. Está diseñado para que uses sus productos. Mientras menos entiendas, más fácil es que tomes decisiones que beneficien al banco — no a ti.",
    quote: "\"Conocer las reglas del juego no te hace desconfiado. Te hace libre.\"",
    accent: "red",
  },
  {
    id: 8,
    duration: 20,
    type: "summary",
    eyebrow: "Resumen · Clase 1",
    title: "Lo que aprendiste hoy",
    bullets: [
      "El dinero es un acuerdo social — su valor depende de la confianza",
      "El Banco Central regula cuánto dinero circula y a qué costo",
      "La CMF supervisa el sistema y te protege como consumidor",
      "Los bancos ganan con el spread entre depósitos y créditos",
      "Entender el sistema es el primer paso para manejarlo a tu favor",
    ],
    accent: "sky",
    cta: true,
  },
];

type Slide = {
  id: number;
  duration: number;
  type: "title" | "concept" | "diagram" | "takeaway" | "summary";
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  bullets?: string[];
  diagram?: { label: string; desc: string; color: string }[];
  quote?: string;
  accent: "red" | "sky";
  visual?: string;
  cta?: boolean;
};

/* ─── HELPERS ─────────────────────────────────── */
function accentClass(accent: "red" | "sky", type: "text" | "bg" | "border") {
  if (type === "text") return accent === "red" ? "text-red-500" : "text-sky-400";
  if (type === "bg")   return accent === "red" ? "bg-red-500"   : "bg-sky-500";
  return accent === "red" ? "border-red-500/30" : "border-sky-400/30";
}

/* ─── VISUAL ICONS ────────────────────────────── */
function Visual({ type, accent }: { type: string; accent: "red" | "sky" }) {
  const col = accent === "red" ? "#ef4444" : "#38bdf8";
  if (type === "money") return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 opacity-60">
      <circle cx="40" cy="40" r="36" stroke={col} strokeWidth="2" fill="none" />
      <text x="40" y="52" textAnchor="middle" fill={col} fontSize="32" fontWeight="bold">$</text>
    </svg>
  );
  if (type === "bank") return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 opacity-60">
      <rect x="10" y="35" width="60" height="30" stroke={col} strokeWidth="2" fill="none" />
      <polygon points="40,8 8,32 72,32" stroke={col} strokeWidth="2" fill="none" />
      <rect x="20" y="45" width="8" height="20" fill={col} opacity="0.4" />
      <rect x="36" y="45" width="8" height="20" fill={col} opacity="0.4" />
      <rect x="52" y="45" width="8" height="20" fill={col} opacity="0.4" />
    </svg>
  );
  if (type === "shield") return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 opacity-60">
      <path d="M40 8 L68 20 L68 44 Q68 62 40 72 Q12 62 12 44 L12 20 Z" stroke={col} strokeWidth="2" fill="none" />
      <path d="M28 40 L36 48 L54 30" stroke={col} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
  if (type === "flow") return (
    <svg viewBox="0 0 100 60" className="w-20 h-12 opacity-60">
      <rect x="4" y="20" width="30" height="20" rx="4" stroke={col} strokeWidth="2" fill="none" />
      <text x="19" y="33" textAnchor="middle" fill={col} fontSize="8">BANCO</text>
      <rect x="66" y="20" width="30" height="20" rx="4" stroke={col} strokeWidth="2" fill="none" />
      <text x="81" y="33" textAnchor="middle" fill={col} fontSize="8">CLIENTE</text>
      <path d="M34 26 L66 26" stroke={col} strokeWidth="1.5" markerEnd="url(#arr)" />
      <path d="M66 34 L34 34" stroke={col} strokeWidth="1.5" markerEnd="url(#arr)" />
      <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill={col}/></marker></defs>
    </svg>
  );
  return null;
}

/* ─── SLIDE RENDERER ──────────────────────────── */
function SlideView({ slide, visible }: { slide: Slide; visible: boolean }) {
  const ac  = (t: "text" | "bg" | "border") => accentClass(slide.accent, t);
  const cls = `transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;

  if (slide.type === "title") return (
    <div className={`flex flex-col items-center justify-center text-center h-full px-8 ${cls}`}>
      <p className={`${ac("text")} uppercase tracking-[0.35em] text-xs font-bold mb-6`}>{slide.eyebrow}</p>
      <h1 className="text-5xl lg:text-7xl font-black uppercase leading-none tracking-tight mb-3">
        {slide.title}
      </h1>
      <h2 className="text-2xl lg:text-3xl font-black uppercase text-zinc-500 mb-8">{slide.subtitle}</h2>
      <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">{slide.body}</p>
    </div>
  );

  if (slide.type === "diagram") return (
    <div className={`flex flex-col h-full px-8 lg:px-20 py-10 ${cls}`}>
      <p className={`${ac("text")} uppercase tracking-[0.35em] text-xs font-bold mb-3`}>{slide.eyebrow}</p>
      <h2 className="text-3xl lg:text-5xl font-black uppercase mb-3">{slide.title}</h2>
      <p className="text-zinc-400 text-base mb-10 max-w-xl">{slide.body}</p>
      <div className="grid grid-cols-2 gap-4 flex-1 max-w-2xl">
        {slide.diagram?.map(({ label, desc, color }, i) => (
          <div key={i} style={{ transitionDelay: `${i * 150}ms` }}
            className={`transition-all duration-500 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"} border ${color === "red" ? "border-red-500/25 bg-red-500/5" : "border-sky-400/25 bg-sky-400/5"} rounded-2xl p-5 flex flex-col gap-2`}>
            <p className={`font-black text-base ${color === "red" ? "text-red-400" : "text-sky-400"}`}>{label}</p>
            <p className="text-zinc-400 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (slide.type === "takeaway") return (
    <div className={`flex flex-col items-center justify-center text-center h-full px-8 lg:px-24 ${cls}`}>
      <p className={`${ac("text")} uppercase tracking-[0.35em] text-xs font-bold mb-6`}>{slide.eyebrow}</p>
      <h2 className="text-4xl lg:text-6xl font-black uppercase mb-8 leading-tight">{slide.title}</h2>
      <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl mb-10">{slide.body}</p>
      {slide.quote && (
        <div className={`border-l-4 ${ac("border")} pl-6 text-left max-w-xl`}>
          <p className={`${ac("text")} text-xl font-bold italic`}>{slide.quote}</p>
        </div>
      )}
    </div>
  );

  if (slide.type === "summary") return (
    <div className={`flex flex-col h-full px-8 lg:px-20 py-10 ${cls}`}>
      <p className={`${ac("text")} uppercase tracking-[0.35em] text-xs font-bold mb-3`}>{slide.eyebrow}</p>
      <h2 className="text-3xl lg:text-5xl font-black uppercase mb-8">{slide.title}</h2>
      <ul className="space-y-4 flex-1">
        {slide.bullets?.map((b, i) => (
          <li key={i} style={{ transitionDelay: `${i * 120}ms` }}
            className={`transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"} flex items-start gap-4`}>
            <span className={`${ac("text")} font-black text-lg mt-0.5 flex-shrink-0`}>✓</span>
            <span className="text-white/85 text-base leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
      {slide.cta && (
        <div className={`mt-8 border ${ac("border")} rounded-2xl p-5 text-center`}>
          <p className="text-zinc-400 text-sm">¿Listo para la siguiente clase? Continúa en el módulo cuando quieras.</p>
        </div>
      )}
    </div>
  );

  // default: concept
  return (
    <div className={`flex flex-col h-full px-8 lg:px-20 py-10 ${cls}`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className={`${ac("text")} uppercase tracking-[0.35em] text-xs font-bold mb-3`}>{slide.eyebrow}</p>
          <h2 className="text-3xl lg:text-5xl font-black uppercase leading-tight">{slide.title}</h2>
        </div>
        {slide.visual && <Visual type={slide.visual} accent={slide.accent} />}
      </div>
      <p className="text-zinc-300 text-base leading-relaxed mb-8 max-w-2xl">{slide.body}</p>
      {slide.bullets && (
        <ul className="space-y-3">
          {slide.bullets.map((b, i) => (
            <li key={i} style={{ transitionDelay: `${i * 100}ms` }}
              className={`transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"} flex items-start gap-3`}>
              <span className={`w-1.5 h-1.5 rounded-full ${ac("bg")} flex-shrink-0 mt-2`} />
              <span className="text-white/80 text-base leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── MAIN ────────────────────────────────────── */
export default function ClasePage() {
  const router = useRouter();
  const [current,  setCurrent]  = useState(0);
  const [playing,  setPlaying]  = useState(false);
  const [elapsed,  setElapsed]  = useState(0);
  const [visible,  setVisible]  = useState(true);

  const slide    = SLIDES[current];
  const total    = SLIDES.length;
  const progress = (elapsed / slide.duration) * 100;

  // tick
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= slide.duration) {
          if (current < total - 1) {
            goTo(current + 1);
          } else {
            setPlaying(false);
          }
          return slide.duration;
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, current, slide.duration]);

  const goTo = useCallback((idx: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(idx);
      setElapsed(0);
      setVisible(true);
    }, 350);
  }, []);

  const totalTime = SLIDES.reduce((a, s) => a + s.duration, 0);
  const globalElapsed = SLIDES.slice(0, current).reduce((a, s) => a + s.duration, 0) + elapsed;

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 bg-[#060810] text-white flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-zinc-600 hover:text-white transition">
            <X size={18} />
          </button>
          <div>
            <p className="text-white text-sm font-bold leading-none">Cómo funciona el dinero y el sistema financiero en Chile</p>
            <p className="text-zinc-600 text-xs mt-0.5">Módulo 01 · Clase 1 · Chile Financiero</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-zinc-600 font-mono">
          <span>{current + 1}/{total}</span>
          <span>·</span>
          <span>{fmt(globalElapsed)} / {fmt(totalTime)}</span>
        </div>
      </div>

      {/* Slide area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Gradient bg based on accent */}
        <div className={`absolute inset-0 transition-colors duration-700 ${
          slide.accent === "red"
            ? "bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.05)_0%,_transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_top_left,_rgba(56,189,248,0.05)_0%,_transparent_60%)]"
        }`} />

        {/* Slide number decoration */}
        <div className="absolute bottom-6 right-8 font-black text-[8rem] text-white/3 leading-none select-none pointer-events-none">
          {String(current + 1).padStart(2, "0")}
        </div>

        <SlideView slide={slide} visible={visible} />
      </div>

      {/* Slide dots */}
      <div className="flex items-center justify-center gap-1.5 py-3 flex-shrink-0">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`rounded-full transition-all ${
              i === current ? "w-6 h-1.5 bg-white" : i < current ? "w-1.5 h-1.5 bg-zinc-600" : "w-1.5 h-1.5 bg-zinc-800"
            }`} />
        ))}
      </div>

      {/* Controls bar */}
      <div className="border-t border-white/5 px-6 py-4 flex-shrink-0">
        {/* Progress bar */}
        <div className="w-full h-0.5 bg-zinc-800 rounded-full mb-4 cursor-pointer" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          setElapsed(Math.round(ratio * slide.duration));
        }}>
          <div className={`h-0.5 rounded-full transition-all ${slide.accent === "red" ? "bg-red-500" : "bg-sky-400"}`}
            style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between">
          {/* Left: time */}
          <span className="text-zinc-600 text-xs font-mono w-20">{fmt(elapsed)} / {fmt(slide.duration)}</span>

          {/* Center: controls */}
          <div className="flex items-center gap-4">
            <button onClick={() => goTo(Math.max(0, current - 1))} disabled={current === 0}
              className="text-zinc-600 hover:text-white disabled:opacity-20 transition">
              <ChevronLeft size={22} />
            </button>

            <button onClick={() => setPlaying(p => !p)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition ${
                slide.accent === "red" ? "bg-red-600 hover:bg-red-500" : "bg-sky-600 hover:bg-sky-500"
              }`}>
              {playing ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" className="ml-0.5" />}
            </button>

            <button onClick={() => goTo(Math.min(total - 1, current + 1))} disabled={current === total - 1}
              className="text-zinc-600 hover:text-white disabled:opacity-20 transition">
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Right: reset */}
          <button onClick={() => { goTo(0); setPlaying(false); }}
            className="text-zinc-700 hover:text-white transition w-20 flex justify-end">
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
