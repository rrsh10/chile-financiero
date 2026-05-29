"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { MODULES } from "../../lib/modules";
import { ArrowLeft, Clock, Play, CheckCircle, BookOpen } from "lucide-react";

export default function ModulePage({ params }: { params: Promise<{ mod: string }> }) {
  const { mod: modId } = use(params);
  const module = MODULES.find((m) => m.id === modId);
  if (!module) notFound();

  const isBlue   = module.color === "sky";
  const accent   = isBlue ? "text-sky-400" : "text-red-400";
  const accentBg = isBlue ? "bg-sky-500" : "bg-red-500";
  const border   = isBlue ? "border-sky-500/20" : "border-red-500/20";
  const total    = module.lessons.reduce((a, l) => a + parseInt(l.duration), 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Back */}
      <a href="/portal" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition text-sm mb-8">
        <ArrowLeft size={15} /> Volver al dashboard
      </a>

      {/* Header */}
      <div className={`border ${border} bg-[#0d1321] rounded-3xl p-8 mb-8`}>
        <div className="flex items-center gap-3 mb-4">
          <span className={`${accent} font-black font-mono text-2xl opacity-40`}>{module.id}</span>
          <span className={`text-xs font-bold uppercase tracking-widest ${accent} bg-current/10 px-3 py-1 rounded-full`}>
            {module.tag}
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-black text-white mb-3 leading-tight">{module.title}</h1>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">{module.desc}</p>
        <div className="flex items-center gap-6 pt-5 border-t border-zinc-800/50">
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <BookOpen size={14} /> {module.lessons.length} clases
          </div>
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <Clock size={14} /> ~{total} min en total
          </div>
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-2">
        {module.lessons.map((lesson, i) => {
          const isAvailable = i === 0 && module.id === "01";
          return (
          <a key={i} href={isAvailable ? "/portal/clase" : undefined}
            className={`group bg-[#0d1321] border border-zinc-800/50 rounded-2xl px-6 py-5 flex items-center justify-between gap-4 transition-all ${isAvailable ? "hover:border-red-500/25 cursor-pointer" : "cursor-default opacity-60"}`}
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className={`w-9 h-9 rounded-xl ${accentBg}/10 border border-current/10 flex items-center justify-center flex-shrink-0`}>
                <span className={`${accent} font-bold text-xs font-mono`}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium leading-snug truncate">{lesson.title}</p>
                {isAvailable && <p className="text-red-400 text-xs mt-0.5">▶ Ver clase animada</p>}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-zinc-600 text-xs">{lesson.duration}</span>
              {isAvailable ? (
                <div className={`w-8 h-8 rounded-full ${accentBg} flex items-center justify-center opacity-0 group-hover:opacity-100 transition`}>
                  <Play size={12} className="text-white fill-white ml-0.5" />
                </div>
              ) : (
                <span className="text-zinc-700 text-xs bg-zinc-800/40 px-2 py-0.5 rounded-full">Próx.</span>
              )}
            </div>
          </a>
          );
        })}
      </div>

      {/* Coming soon note */}
      <div className="mt-8 bg-zinc-900/40 border border-zinc-800/40 rounded-2xl p-5 text-center">
        <p className="text-zinc-600 text-sm">
          El contenido en video de cada clase se cargará pronto.{" "}
          <a href="mailto:rsantanderh@gmail.com" className={`${accent} hover:opacity-80 transition`}>
            Avísanos si tienes dudas.
          </a>
        </p>
      </div>
    </div>
  );
}
