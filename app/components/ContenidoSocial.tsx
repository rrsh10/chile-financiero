"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, X, ExternalLink } from "lucide-react";

/* Logos de marca como SVG inline (lucide v1.x no incluye íconos de marca) */
function IgIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function YtIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

/* ============================================================
   COMPONENTE CONTENIDO SOCIAL  (YouTube + Instagram)
   Reutilizable en Chile Financiero (accent "sky") y
   Swing Trader Club (accent "amber").

   Para mantenerlo: solo pega la URL cruda del video o post.
   - YouTube:   https://www.youtube.com/watch?v=XXXX  | https://youtu.be/XXXX | /shorts/XXXX
   - Instagram: https://www.instagram.com/p/XXXX/  |  /reel/XXXX/
   El ID se extrae solo. Ver ejemplos en page.tsx.
   ============================================================ */

export type VideoItem = { url: string; title: string; tag?: string };
export type IgItem = { url: string };

type Accent = "sky" | "amber";

const ACCENT: Record<Accent, {
  label: string; chip: string; btn: string; iconBg: string; icon: string;
  ring: string; play: string;
}> = {
  sky: {
    label: "text-sky-400",
    chip: "text-sky-400 border-sky-400/20 bg-sky-400/5",
    btn: "bg-sky-600 hover:bg-sky-500 text-white",
    iconBg: "bg-sky-500/10",
    icon: "text-sky-400",
    ring: "hover:border-sky-500/30",
    play: "bg-sky-600/90 group-hover:bg-sky-500",
  },
  amber: {
    label: "text-amber-400",
    chip: "text-amber-400 border-amber-400/20 bg-amber-400/5",
    btn: "bg-amber-500 hover:bg-amber-400 text-black",
    iconBg: "bg-amber-500/10",
    icon: "text-amber-400",
    ring: "hover:border-amber-500/30",
    play: "bg-amber-500/90 group-hover:bg-amber-400",
  },
};

function ytId(url: string): string {
  const m = url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([\w-]{11})/);
  return m ? m[1] : "";
}
function igCode(url: string): string {
  const m = url.match(/instagram\.com\/(?:p|reel|tv)\/([\w-]+)/);
  return m ? m[1] : "";
}
function igKind(url: string): "reel" | "p" {
  return /\/reel\//.test(url) ? "reel" : "p";
}

export default function ContenidoSocial({
  accent,
  sectionClassName = "",
  eyebrow = "Contenido",
  title,
  subtitle,
  videos = [],
  instagram = [],
  instagramProfile,
}: {
  accent: Accent;
  sectionClassName?: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  videos?: VideoItem[];
  instagram?: IgItem[];
  instagramProfile?: string;
}) {
  const a = ACCENT[accent];
  const [active, setActive] = useState<string | null>(null); // YouTube id en reproductor

  // Cerrar modal con Escape
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setActive(null);
  }, []);
  useEffect(() => {
    if (!active) return;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, onKey]);

  const validVideos = videos.filter((v) => ytId(v.url));
  const validIg = instagram.filter((i) => igCode(i.url));
  const hasContent = validVideos.length > 0 || validIg.length > 0;

  return (
    <section id="contenido" className={`border-t border-white/5 ${sectionClassName}`}>
      <div className="max-w-7xl mx-auto px-6 py-28">
        <div data-anim className="mb-16 text-center">
          <p className={`uppercase tracking-[0.35em] text-xs font-bold mb-4 ${a.label}`}>{eyebrow}</p>
          <h2 className="text-4xl lg:text-6xl font-black uppercase">{title}</h2>
          {subtitle && <p className="mt-4 text-zinc-500 text-sm max-w-lg mx-auto">{subtitle}</p>}
        </div>

        {!hasContent && (
          <div data-anim className="max-w-md mx-auto text-center bg-white/[0.02] border border-zinc-800/50 rounded-3xl p-10">
            <div className={`w-12 h-12 rounded-2xl mx-auto mb-5 flex items-center justify-center ${a.iconBg}`}>
              <Play size={20} className={a.icon} />
            </div>
            <p className="font-bold text-sm mb-2">Contenido en camino</p>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Pronto vas a poder ver aquí los videos y publicaciones directamente, sin salir de la página.
            </p>
          </div>
        )}

        {/* ---------- VIDEOS (YouTube) ---------- */}
        {validVideos.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-center gap-2.5 mb-8">
              <YtIcon size={18} className={a.icon} />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">En video</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {validVideos.map((v, i) => {
                const id = ytId(v.url);
                return (
                  <button
                    key={id + i}
                    data-anim
                    data-delay={`${i * 70}ms`}
                    onClick={() => setActive(id)}
                    className={`group text-left bg-white/[0.02] border border-zinc-800/50 rounded-3xl overflow-hidden transition-all duration-500 ${a.ring}`}
                  >
                    <div className="relative aspect-video overflow-hidden bg-black">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                        alt={v.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition ${a.play}`}>
                          <Play size={22} className={accent === "amber" ? "text-black ml-0.5" : "text-white ml-0.5"} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      {v.tag && (
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border mb-3 ${a.chip}`}>
                          {v.tag}
                        </span>
                      )}
                      <p className="font-bold text-sm leading-snug">{v.title}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------- INSTAGRAM ---------- */}
        {validIg.length > 0 && (
          <div>
            <div className="flex items-center justify-center gap-2.5 mb-8">
              <IgIcon size={18} className={a.icon} />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">En Instagram</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {validIg.map((item, i) => {
                const code = igCode(item.url);
                const kind = igKind(item.url);
                return (
                  <div
                    key={code + i}
                    data-anim
                    data-delay={`${i * 70}ms`}
                    className="bg-white/[0.02] border border-zinc-800/50 rounded-3xl overflow-hidden"
                  >
                    <iframe
                      src={`https://www.instagram.com/${kind}/${code}/embed/captioned`}
                      title={`Instagram ${code}`}
                      loading="lazy"
                      scrolling="no"
                      allow="encrypted-media; picture-in-picture; clipboard-write"
                      className="w-full"
                      style={{ height: 540, border: 0 }}
                    />
                  </div>
                );
              })}
            </div>
            {instagramProfile && (
              <div className="text-center mt-10">
                <a
                  href={instagramProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition ${a.btn}`}
                >
                  <IgIcon size={16} /> Ver más en Instagram
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---------- MODAL REPRODUCTOR YOUTUBE ---------- */}
      {active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div className="relative z-10 w-full max-w-4xl">
            <button
              onClick={() => setActive(null)}
              aria-label="Cerrar"
              className="absolute -top-12 right-0 text-zinc-400 hover:text-white transition flex items-center gap-1.5 text-sm"
            >
              Cerrar <X size={20} />
            </button>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active}?autoplay=1&rel=0&modestbranding=1`}
                title="Reproductor de video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${active}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-zinc-500 hover:text-white transition text-xs"
            >
              Abrir en YouTube <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
