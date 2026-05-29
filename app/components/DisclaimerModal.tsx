"use client";

import { useState } from "react";
import { X, Shield, AlertTriangle, CheckCircle } from "lucide-react";

export function DisclaimerLink({ label = "Aviso legal y sobre mí" }: { label?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="underline underline-offset-2 decoration-dashed hover:text-white transition text-current cursor-pointer"
      >
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-10 overflow-y-auto">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <div className="relative z-10 w-full max-w-3xl bg-[#0a0f1a] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl mb-12">

            <div className="flex items-start justify-between p-7 border-b border-zinc-800/60">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Shield size={18} className="text-blue-400" />
                </div>
                <div>
                  <h2 className="font-black text-base">Quién soy y de dónde viene todo esto</h2>
                  <p className="text-zinc-500 text-xs mt-0.5">Roberto Santander · Chile Financiero · CANOPIA</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-zinc-600 hover:text-white transition p-1">
                <X size={20} />
              </button>
            </div>

            <div className="p-7 space-y-7 text-sm leading-relaxed">

              <div className="space-y-4 text-zinc-400">
                <p>
                  Mira, te voy a contar algo que pocas veces se dice así de directo:
                  yo no tenía un manual cuando empecé. Tenía ganas, muchas preguntas y una cabeza
                  que procesaba todo al mismo tiempo — negocios, finanzas, proyectos, ideas nuevas —
                  sin saber muy bien cómo ordenar todo eso.
                </p>
                <p>
                  Con el tiempo entendí que eso tiene nombre:{" "}
                  <strong className="text-white">doble excepcionalidad</strong>. Significa que puedes
                  conectar cosas que otros no conectan, aprender de forma transversal, ver el sistema
                  detrás de algo antes de que alguien te lo explique. Pero también significa que a veces
                  tu cabeza es un caos productivo — y que organizarla requiere trabajo.
                </p>
                <p>
                  Fue en terapia donde bajé las ideas al papel. Y ahí nació{" "}
                  <strong className="text-white">CANOPIA</strong> —
                  la <strong className="text-white">copa del árbol</strong>. Esa parte de arriba donde
                  todo converge, donde las ramas se encuentran, donde la luz llega primero. Así quería
                  que fuera: el lugar donde todo lo que sé y hago tiene sentido junto.
                </p>
                <p>
                  Tomé años trabajando en{" "}
                  <strong className="text-white">Banco BCI, BanChile y MetLife</strong>, entendiendo
                  desde adentro cómo funciona el sistema financiero — los productos, las tasas, lo que
                  te explican y lo que no. Lo mezclé con todo lo que aprendí emprendiendo:{" "}
                  <strong className="text-white">Galpón 3</strong> (abrir un gimnasio justo antes de
                  la pandemia, literal),{" "}
                  <strong className="text-white">El Mercante</strong> (importar más de 2.300 sensores
                  de CO₂ y sacar casi 8 veces lo invertido),{" "}
                  <strong className="text-white">Japi Fiesta</strong>,{" "}
                  <strong className="text-white">Bloom Studio</strong>, bienes raíces,
                  impuestos a la herencia, estructuración de empresas, y hasta un proyecto de forraje
                  hidropónico que la pandemia me impidió ejecutar.
                </p>
                <p>
                  Todo eso — metido en una licuadora — es lo que comparto en Chile Financiero.
                </p>
              </div>

              <div className="bg-[#0d1321] border border-blue-500/10 rounded-2xl p-6 space-y-3 text-zinc-400">
                <p className="text-white font-semibold text-sm">¿Por qué Chile Financiero es gratis?</p>
                <p>
                  Porque hay cosas que no deberían tener precio. El sistema financiero chileno
                  existe, tiene reglas, tiene beneficios — y mucha gente no los conoce simplemente
                  porque nadie se los explicó en simple.
                </p>
                <p>
                  Hoy tenemos la herramienta más valiosa que existe: información inmediata,
                  comprobable casi al instante. Yo la usé para ordenar mi vida y mis negocios.
                  Chile Financiero existe para que tú también puedas usarla.
                </p>
                <p className="text-white">
                  No te vendo nada aquí. Solo te cuento lo que aprendí para que puedas hacer
                  mejores preguntas, tomar mejores decisiones y entender el sistema que ya es tuyo.
                </p>
              </div>

              <div className="bg-blue-500/5 border border-blue-500/15 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle size={15} className="text-blue-400 flex-shrink-0" />
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-wider">Aviso legal</p>
                </div>
                <div className="text-zinc-500 text-xs space-y-2 leading-relaxed">
                  <p>
                    Todo el contenido de Chile Financiero es{" "}
                    <strong className="text-zinc-300">educativo e informativo</strong>. No reemplaza
                    asesoría tributaria, legal ni financiera profesional. Ante cualquier decisión
                    importante, te recomendamos siempre consultar con un profesional calificado.
                  </p>
                  <p>
                    Roberto Santander Hoffmann y Chile Financiero{" "}
                    <strong className="text-zinc-300">no asumen responsabilidad</strong> por decisiones
                    tomadas en base a este contenido. La información es de carácter general y puede
                    no aplicar a tu situación específica.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {[
                  "Ejecutivo en Banco BCI, BanChile y MetLife",
                  "Miembro del Club de Trading — certificados por la CMF",
                  "Co-fundador Galpón 3 SPA — centro deportivo en Ñuñoa",
                  "Dueño Japi Fiesta SPA — experiencias gastronómicas",
                  "Co-fundador Bloom Studio — productora",
                  "El Mercante — importación, ecommerce y marketing digital",
                  "Experiencia en bienes raíces, tributaria y estructuración de empresas",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-zinc-500 text-xs">
                    <CheckCircle size={12} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>

              <p className="text-zinc-700 text-xs text-center border-t border-zinc-800/50 pt-5">
                © 2026 Roberto Santander Hoffmann · CANOPIA · Chile Financiero · Swing Trader Club
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
