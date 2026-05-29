"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { MODULES } from "../lib/modules";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

export default function PortalDashboard() {
  const [name, setName] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const n = session.user.user_metadata?.full_name
          || session.user.user_metadata?.name
          || session.user.email?.split("@")[0]
          || "Alumno";
        setName(n.split(" ")[0]);
      }
    });
  }, []);

  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="mb-10">
        <p className="text-zinc-500 text-sm mb-1">Bienvenido{name ? `, ${name}` : ""}.</p>
        <h1 className="text-3xl font-black text-white">
          ¿Qué aprendemos <span className="text-sky-400">hoy?</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-2">
          {MODULES.length} módulos · {totalLessons} clases en total
        </p>
      </div>

      {/* Progreso */}
      <div className="bg-[#0d1321] border border-zinc-800/50 rounded-2xl p-5 mb-10 flex items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-semibold">Tu progreso</span>
            <span className="text-zinc-500 text-xs">0 de {totalLessons} clases</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full">
            <div className="h-1.5 bg-red-500 rounded-full" style={{ width: "0%" }} />
          </div>
        </div>
        <BookOpen size={20} className="text-zinc-700 flex-shrink-0" />
      </div>

      {/* Módulos */}
      <div className="grid lg:grid-cols-2 gap-5">
        {MODULES.map((mod) => {
          const isBlue = mod.color === "sky";
          const accent = isBlue ? "text-sky-400" : "text-red-400";
          const border = isBlue ? "hover:border-sky-500/25" : "hover:border-red-500/25";
          const tagBg  = isBlue ? "bg-sky-400/8 border-sky-400/15 text-sky-400" : "bg-red-400/8 border-red-400/15 text-red-400";
          const total  = mod.lessons.reduce((a, l) => a + parseInt(l.duration), 0);

          return (
            <a key={mod.id} href={`/portal/${mod.id}`}
              className={`group bg-[#0d1321] border border-zinc-800/60 rounded-3xl p-7 transition-all duration-300 ${border} block`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`inline-flex items-center gap-2 border rounded-lg px-3 py-1 ${tagBg}`}>
                  <span className="text-xs font-black font-mono">{mod.id}</span>
                  <span className="text-xs font-bold uppercase tracking-wider">{mod.tag}</span>
                </div>
                <ArrowRight size={16} className={`${accent} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
              </div>
              <h2 className="text-white font-bold text-base leading-snug mb-2">{mod.title}</h2>
              <p className="text-zinc-500 text-xs leading-relaxed mb-5 line-clamp-2">{mod.desc}</p>
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/50">
                <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
                  <BookOpen size={12} />{mod.lessons.length} clases
                </div>
                <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
                  <Clock size={12} />~{total} min
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <p className="text-zinc-700 text-xs text-center mt-12">
        Chile Financiero · Contenido educativo · 100% gratuito
      </p>
    </div>
  );
}
