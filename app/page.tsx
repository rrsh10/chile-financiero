"use client";

import { useState, useEffect } from "react";
import {
  Building2, Users, Briefcase, Shield, BookOpen, ChevronDown,
  MessageCircle, Mail, MapPin, CheckCircle, Home, CreditCard, Landmark, Heart, Store, BarChart3,
} from "lucide-react";
import { DisclaimerLink } from "./components/DisclaimerModal";

const WHATSAPP = "56997412604";

const profiles = [
  { Icon: Users,    label: "Persona Natural",  items: ["El sistema financiero te parece confuso o nunca te lo explicaron bien","No sabes cómo funciona tu AFP ni tu Fonasa realmente","Quieres conocer tus derechos y los beneficios que ya te corresponden","Tomas decisiones financieras sin información suficiente"], tags: ["AFP","Fonasa","Subsidios","Deudas","Ahorro"] },
  { Icon: Store,    label: "Emprendedor",       items: ["Tienes o quieres tener un negocio propio","No sabes cómo crear una empresa legalmente en Chile","Nunca abriste una cuenta corriente o vista empresarial","No sabes manejar el IVA, las boletas ni los regímenes tributarios","Quieres financiamiento pero no sabes por dónde partir","Necesitas separar tus finanzas personales de las del negocio"], tags: ["BancoEstado","IVA","Boletas","Créditos","Capital de trabajo"] },
  { Icon: Briefcase, label: "PyME establecida", items: ["Tu empresa opera pero buscas más financiamiento","Quieres postular a Corfo, SERCOTEC u otros beneficios del Estado","Necesitas estructurar mejor tus finanzas empresariales","Buscas optimizar cómo usas las herramientas disponibles"], tags: ["Corfo","SERCOTEC","Factoring","Leasing","Subsidios PyME"] },
];

const areas = [
  { Icon: Landmark,   title: "Sistema Bancario Chileno",     items: ["Cómo funcionan los bancos en Chile","CMF, tasas de interés y CAE explicados simple","Cuentas corrientes, líneas de crédito y renegociaciones","Lo que los bancos no te explican (pero deberían)"], color: "blue" },
  { Icon: Heart,      title: "Beneficios Sociales",           items: ["Fonasa, AFP y BPS — cómo usarlos bien","Subsidio habitacional y subsidio al arriendo","Bonos del gobierno: quién puede pedirlos y cómo","Qué te corresponde según tu situación"], color: "emerald" },
  { Icon: Store,      title: "Emprendimiento & Startups",     items: ["Cómo formalizar un negocio paso a paso","Regímenes tributarios: Pro PyME vs General","Boletas vs facturas, IVA e inicio de actividades","Las trampas del primer año que casi nadie te avisa"], color: "blue" },
  { Icon: Building2,  title: "Financiamiento PyME",           items: ["Corfo y garantías Fogape","Capital Semilla SERCOTEC — cómo postular","BancoEstado Microempresa: cuenta y créditos","Factoring y leasing como herramientas de capital"], color: "emerald" },
  { Icon: CreditCard, title: "Deuda & Crédito Inteligente",   items: ["Deuda buena vs deuda mala — cuándo sirve","Cómo negociar con un banco de verdad","DICOM, Equifax y cómo mejorar tu historial","Cuándo tiene sentido endeudarse para crecer"], color: "blue" },
  { Icon: Home,       title: "Inversión & Patrimonio",         items: ["APV y sus beneficios tributarios","Inversiones inmobiliarias y DFL2","Acciones y ETFs desde Chile — cómo empezar","Interés compuesto y planificación a largo plazo"], color: "emerald" },
];

const modules = [
  { num: "01", title: "El Sistema que Nadie te Explicó",
    desc: "Antes de tomar cualquier decisión financiera, necesitas entender cómo funciona el sistema. Aquí ponemos todo sobre la mesa — sin tecnicismos y sin letra chica.",
    content: ["Cómo funciona el dinero y el sistema financiero en Chile","CMF, bancos, cooperativas y financieras — diferencias reales","Cómo leer un contrato bancario y entender el CAE","Tasas de interés: qué significan y cómo te afectan","Los errores financieros más comunes de los chilenos"] },
  { num: "02", title: "Beneficios Sociales que ya Pagaste",
    desc: "Hay beneficios que ya te corresponden y que probablemente no estás usando. Este módulo te enseña a identificarlos y pedirlos correctamente.",
    content: ["Fonasa: tramos, prestaciones y cómo usarlo bien","AFP: cómo leer tu saldo real y qué opciones tienes","BPS: pensiones, subsidios y bonos disponibles","Subsidio habitacional y subsidio al arriendo — cómo postular","Bonos del gobierno: quién puede pedirlos y cuándo"] },
  { num: "03", title: "Finanzas para Emprendedores",
    desc: "Emprender en Chile tiene reglas propias. Este módulo te lleva desde cero — desde cómo crear tu empresa legalmente hasta abrir tu primera cuenta bancaria y empezar a operar con orden.",
    content: ["Tipos de empresa en Chile: SPA, SpA, SA — cuál elegir y por qué","Cómo crear tu empresa paso a paso (SII, Registro Civil, notaría)","Inicio de actividades en el SII — qué es y cómo hacerlo","Abrir cuenta corriente o cuenta vista empresarial — qué piden los bancos","BancoEstado Pyme, BCI, Santander — opciones reales para empresas nuevas","Régimen tributario: Pro PyME vs General — cuál te conviene","IVA, PPM y declaración de renta explicados sin tecnicismos","Boletas de honorarios vs facturas — cuándo usar cada una","Cómo separar tus finanzas personales de las del negocio desde el día uno"] },
  { num: "04", title: "Financiamiento & Beneficios PyME",
    desc: "El Estado tiene herramientas para financiar tu negocio que la mayoría no conoce. Aquí aprendes a usarlas.",
    content: ["Capital Semilla SERCOTEC — cómo postular paso a paso","Corfo: líneas de crédito y garantías Fogape","BancoEstado Microempresa: cuenta y créditos disponibles","Factoring y leasing como herramientas de capital de trabajo","Errores más comunes al buscar financiamiento bancario"] },
  { num: "05", title: "Deuda Inteligente & Crédito",
    desc: "No toda deuda es mala. La clave está en saber cuándo endeudarse, cómo negociar y cómo salir cuando algo sale mal.",
    content: ["Deuda buena vs deuda mala — cuándo sirve endeudarse","Cómo negociar con un banco de verdad","DICOM y Equifax — cómo funciona tu historial crediticio","Repactación y renegociación de deudas sin perder el control","Cuándo tiene sentido pedir crédito para crecer"] },
  { num: "06", title: "Construir Patrimonio en Chile",
    desc: "Ahorrar no es lo mismo que construir patrimonio. Este módulo te muestra cómo pensar el dinero a largo plazo en el contexto chileno.",
    content: ["APV: ahorro previsional voluntario y sus beneficios tributarios","Inversiones inmobiliarias y DFL2 — lo que hay que saber","Acciones y ETFs desde Chile — cómo empezar sin complicarse","Interés compuesto aplicado a la realidad chilena","Cómo Roberto construyó patrimonio desde sus negocios reales"] },
];

const faqs = [
  { q: "¿Tiene algún costo?",                 a: "No. Chile Financiero es 100% gratuito. Esta información debería estar disponible para todos, no solo para quien puede pagar un asesor." },
  { q: "¿Necesito saber de finanzas?",         a: "Para nada. Los conceptos se explican con ejemplos reales del sistema chileno, sin tecnicismos. Está hecho exactamente para quien no sabe." },
  { q: "¿Es lo mismo que un asesor?",          a: "No reemplaza asesoría profesional, pero te da el conocimiento para hacer las preguntas correctas. La diferencia entre ir al banco a ciegas o ir sabiendo lo que buscas." },
  { q: "¿Puedo estar en regiones?",            a: "Sí, el programa es 100% online." },
  { q: "¿Puedo combinarlo con Swing Trader?",  a: "Sí, se complementan perfecto. Chile Financiero te da la base del sistema financiero chileno. Swing Trader Club te enseña a hacer crecer tu capital con un sistema de trading real." },
];

export default function ChileFinanciero() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq]       = useState<number | null>(null);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [form, setForm]             = useState({ name: "", email: "", profile: "", goal: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    const els = document.querySelectorAll<HTMLElement>("[data-anim]");
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = `opacity 0.7s ease ${el.dataset.delay ?? "0ms"}, transform 0.7s ease ${el.dataset.delay ?? "0ms"}`;
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const sendWhatsApp = () => {
    const t = `Hola Roberto, soy ${form.name}. Perfil: ${form.profile}. ${form.goal}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`, "_blank");
  };
  const sendEmail = () => {
    const s = encodeURIComponent(`Chile Financiero — ${form.name}`);
    const b = encodeURIComponent(`Nombre: ${form.name}\nEmail: ${form.email}\nPerfil: ${form.profile}\nObjetivo: ${form.goal}`);
    window.open(`mailto:rsantanderh@gmail.com?subject=${s}&body=${b}`);
  };

  const navLinks: [string, string][] = [["Para quién","#para-quien"],["Programa","#programa"],["Sobre Roberto","#sobre-roberto"],["Contacto","#contacto"]];

  return (
    <>
      <div className="min-h-screen bg-[#0a0f1a] text-[#e8edf5] antialiased overflow-x-hidden">

        {/* BARRA ECOSISTEMA CANOPIA */}
        <div className="fixed top-0 inset-x-0 z-[60] bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-white/5 text-[11px]">
          <div className="max-w-7xl mx-auto px-6 h-[30px] flex items-center justify-center gap-3">
            <span className="text-zinc-500 font-semibold tracking-wide hidden sm:inline">Ecosistema CANOPIA</span>
            <span className="text-white/10 hidden sm:inline">·</span>
            <a href="https://canopia.cl" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition">canopia.cl</a>
            <span className="text-white/10">·</span>
            <span className="text-sky-400 font-semibold">Chile Financiero</span>
            <span className="text-white/10">·</span>
            <a href="https://swingtraderclub.canopia.cl" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-amber-400 transition">Swing Trader Club</a>
          </div>
        </div>

        {/* NAV */}
        <header className={`fixed top-[30px] inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0a0f1a]/90 backdrop-blur-2xl border-b border-white/5" : ""}`}>
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 select-none">
              <span className="text-lg font-black tracking-tight">Chile<span className="text-sky-400">Financiero</span></span>
            </a>
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(([label, href]) => (
                <a key={href} href={href} className="text-sm text-white hover:text-sky-300 transition font-medium">{label}</a>
              ))}
              <a href="/login" className="text-sm border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white transition px-4 py-2 rounded-full font-medium">Mis clases</a>
              <a href="#contacto" className="text-sm bg-sky-600 hover:bg-sky-500 transition text-white px-5 py-2.5 rounded-full font-bold">Acceso gratis</a>
            </nav>
            <button onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menú" className="lg:hidden flex flex-col gap-1.5 p-1">
              <span className={`w-6 h-px bg-white block transition-all origin-center ${mobileMenu ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-6 h-px bg-white block transition-all ${mobileMenu ? "opacity-0" : ""}`} />
              <span className={`w-6 h-px bg-white block transition-all origin-center ${mobileMenu ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
          {mobileMenu && (
            <div className="lg:hidden bg-[#0a0f1a]/95 backdrop-blur-2xl border-t border-white/5 px-6 py-6 space-y-1">
              {navLinks.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMobileMenu(false)} className="block py-3 text-zinc-400 hover:text-white transition text-sm border-b border-white/5">{label}</a>
              ))}
              <a href="#contacto" onClick={() => setMobileMenu(false)} className="block mt-4 bg-sky-600 text-center py-3.5 rounded-2xl font-bold text-sm">Acceso gratis</a>
            </div>
          )}
        </header>

        {/* HERO */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(59,130,246,0.10)_0%,_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.06)_0%,_transparent_60%)]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
            <div className="max-w-4xl mx-auto text-center">
              <p data-anim data-delay="0ms" className="text-white uppercase tracking-[0.4em] text-xs font-medium mb-6">Educación Financiera · Chile · Gratis</p>
              <h1 data-anim data-delay="100ms" className="font-black leading-none tracking-tight uppercase" style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}>
                El sistema<br /><span className="text-sky-400">financiero</span><br /><span className="text-sky-500">chileno.</span><br />Por fin claro.
              </h1>
              <p data-anim data-delay="200ms" className="mt-8 text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
                Aprende a manejar bancos, beneficios sociales, financiamiento PyME y a construir patrimonio en Chile — con quien lo hizo desde adentro.
              </p>
              <div data-anim data-delay="300ms" className="flex flex-wrap justify-center gap-4 mt-12">
                <a href="#contacto" className="bg-sky-600 hover:bg-sky-500 transition text-white px-8 py-4 rounded-full font-bold text-sm">Acceso gratis</a>
                <a href="#programa" className="border border-white/15 hover:border-white/40 text-zinc-300 hover:text-white transition px-8 py-4 rounded-full font-bold text-sm">Ver programa</a>
              </div>
              <div data-anim data-delay="380ms" className="mt-5">
                <span className="inline-flex items-center gap-2 text-xs text-emerald-400 border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  100% gratuito · Comunidad abierta
                </span>
              </div>
              <div data-anim data-delay="450ms" className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[["6","Módulos completos"],["3","Perfiles atendidos"],["Gratis","Para siempre"],["Chile","100% aplicado"]].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-3xl lg:text-4xl font-black text-sky-500">{num}</p>
                    <p className="text-white text-xs uppercase tracking-widest mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="border-t border-white/5 bg-[#0d1321]">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="max-w-3xl mx-auto text-center">
              <p data-anim className="text-sky-400 uppercase tracking-[0.35em] text-xs font-bold mb-5">El problema</p>
              <h2 data-anim data-delay="100ms" className="text-3xl lg:text-5xl font-black uppercase leading-tight">Nadie te enseñó<br /><span className="text-sky-400">cómo funciona esto.</span></h2>
              <p data-anim data-delay="200ms" className="mt-6 text-white/85 text-lg leading-relaxed">
                El sistema financiero chileno tiene reglas, beneficios, herramientas y trampas. La mayoría navega ese sistema a ciegas — pagando más de lo que debería, perdiendo beneficios que ya le corresponden y tomando decisiones sin información real. Chile Financiero existe para cerrar esa brecha.
              </p>
            </div>
          </div>
        </section>

        {/* PARA QUIÉN */}
        <section id="para-quien" className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-28">
            <div data-anim className="mb-16 text-center">
              <p className="text-sky-400 uppercase tracking-[0.35em] text-xs font-bold mb-4">Para quién es</p>
              <h2 className="text-4xl lg:text-6xl font-black uppercase">Tres perfiles.<br /><span className="text-sky-400">Un mismo sistema.</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {profiles.map(({ Icon, label, items, tags }, i) => (
                <div key={label} data-anim data-delay={`${i * 100}ms`} className="bg-[#0d1321] border border-zinc-800/60 rounded-3xl p-8 hover:border-sky-500/25 transition-all duration-500 flex flex-col items-center text-center">
                  <Icon className="text-sky-400 mb-5" size={28} />
                  <h3 className="text-xl font-black uppercase mb-4">{label}</h3>
                  <ul className="space-y-2 mb-6">
                    {items.map(item => (
                      <li key={item} className="flex items-start justify-center gap-2.5 text-white/80 text-sm leading-relaxed">
                        <span className="text-sky-400 mt-1.5 flex-shrink-0 text-xs">▸</span>{item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap justify-center gap-2">
                    {tags.map(t => <span key={t} className="text-xs text-sky-400 border border-sky-400/20 bg-sky-400/5 px-3 py-1 rounded-full">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ÁREAS */}
        <section className="border-t border-white/5 bg-[#0d1321]">
          <div className="max-w-7xl mx-auto px-6 py-28">
            <div data-anim className="mb-16 text-center">
              <p className="text-sky-400 uppercase tracking-[0.35em] text-xs font-bold mb-4">Qué aprenderás</p>
              <h2 className="text-4xl lg:text-6xl font-black uppercase">6 áreas del<br /><span className="text-sky-400">sistema financiero.</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {areas.map(({ Icon, title, items, color }, i) => (
                <div key={title} data-anim data-delay={`${i * 80}ms`} className="group bg-[#0a0f1a] border border-zinc-800/50 rounded-3xl p-7 hover:border-sky-500/20 transition-all duration-500 flex flex-col items-center text-center">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-5 ${color === "blue" ? "bg-sky-500/8" : "bg-white/5"}`}>
                    <Icon className={color === "blue" ? "text-sky-400" : "text-sky-400"} size={20} />
                  </div>
                  <h3 className="font-bold text-base mb-4">{title}</h3>
                  <ul className="space-y-2">
                    {items.map(item => (
                      <li key={item} className="flex items-start justify-center gap-2.5 text-white/80 text-sm leading-relaxed">
                        <span className={`mt-1.5 flex-shrink-0 text-xs ${color === "blue" ? "text-sky-400" : "text-sky-400"}`}>▸</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MÓDULOS */}
        <section id="programa" className="border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-28">
            <div data-anim className="mb-16 text-center">
              <p className="text-sky-400 uppercase tracking-[0.35em] text-xs font-bold mb-4">El programa</p>
              <h2 className="text-4xl lg:text-6xl font-black uppercase">6 módulos.<br /><span className="text-sky-400">De cero a sistema.</span></h2>
            </div>
            <div className="space-y-3">
              {modules.map((mod, i) => (
                <div key={mod.num} data-anim data-delay={`${i * 60}ms`} className="border border-zinc-800/60 rounded-2xl overflow-hidden">
                  <button onClick={() => setOpenModule(openModule === i ? null : i)} className="w-full flex items-center justify-center gap-4 p-6 text-center hover:bg-white/2 transition">
                    <div className="flex items-center gap-5">
                      <span className="text-sky-400/40 font-black text-xl font-mono w-10">{mod.num}</span>
                      <span className="font-bold text-base">{mod.title}</span>
                    </div>
                    <ChevronDown size={18} className={`text-sky-400 flex-shrink-0 transition-transform duration-300 ${openModule === i ? "rotate-180" : ""}`} />
                  </button>
                  {openModule === i && (
                    <div className="px-6 pb-7 text-center">
                      <p className="text-white/70 text-sm leading-relaxed mb-4 italic">{mod.desc}</p>
                      <ul className="space-y-2">
                        {mod.content.map(item => (
                          <li key={item} className="flex items-start justify-center gap-3 text-white/80 text-sm leading-relaxed">
                            <CheckCircle size={13} className="text-sky-400 flex-shrink-0 mt-0.5" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE ROBERTO */}
        <section id="sobre-roberto" className="border-t border-white/5 bg-[#0d1321]">
          <div className="max-w-7xl mx-auto px-6 py-28">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div>
                <p data-anim className="text-sky-400 uppercase tracking-[0.35em] text-xs font-bold mb-5 text-center">Quién enseña</p>
                <h2 data-anim data-delay="100ms" className="text-4xl lg:text-5xl font-black uppercase leading-tight text-center">Roberto<br /><span className="text-sky-400">Santander</span></h2>
                <div data-anim data-delay="200ms" className="mt-8 space-y-4 text-white/80 text-base leading-relaxed text-center">
                  <p>Emprendedor chileno con experiencia en <strong className="text-white">banca, seguros, inversiones y negocios reales</strong>. Fundador de Galpón 3, Japi Fiesta y El Mercante.</p>
                  <p>Después de años en el mundo financiero y operando sus propios negocios, entendió que la mayoría de los chilenos y emprendedores no tienen acceso a la información que necesitan. Chile Financiero existe para compartir eso — gratis.</p>
                </div>
              </div>
              <div data-anim data-delay="150ms">
                <div className="bg-[#0a0f1a] border border-zinc-800/50 rounded-3xl p-8 mb-5 text-center">
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Empresas & proyectos</p>
                  {[["Galpón 3","Centro deportivo · Ñuñoa","https://galpontres.cl"],["Japi Fiesta","Experiencias gastronómicas","https://japifiesta.cl"],["El Mercante","Ecommerce & Marketing Digital","https://elmercante.cl"]].map(([name, cat, url]) => (
                    <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="group block py-4 border-b border-zinc-800/50 last:border-0 hover:-translate-y-0.5 transition-all">
                      <div>
                        <p className="font-bold text-sm group-hover:text-sky-400 transition">{name}</p>
                        <p className="text-zinc-600 text-xs mt-0.5">{cat}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="bg-sky-600/10 border border-sky-500/20 rounded-3xl p-6 text-center">
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    <strong className="text-white">Aviso:</strong> Chile Financiero es educación financiera. No reemplaza asesoría tributaria, legal ni financiera profesional. El objetivo es que tengas la información para tomar mejores decisiones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6 py-28">
            <div data-anim className="text-center mb-16">
              <p className="text-sky-400 uppercase tracking-[0.35em] text-xs font-bold mb-4">FAQ</p>
              <h2 className="text-4xl lg:text-5xl font-black uppercase">Preguntas frecuentes</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} data-anim data-delay={`${i * 60}ms`} className="border border-zinc-800/60 rounded-2xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-center gap-4 p-6 text-center hover:bg-white/2 transition">
                    <span className="font-semibold text-sm pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-sky-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && <div className="px-6 pb-6 text-zinc-500 text-sm leading-relaxed text-center">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="border-t border-white/5 bg-[#0d1321]">
          <div className="max-w-7xl mx-auto px-6 py-28">
            <div className="max-w-lg mx-auto">
              <div className="text-center">
                <p data-anim className="text-sky-400 uppercase tracking-[0.35em] text-xs font-bold mb-5">Comenzar</p>
                <h2 data-anim data-delay="100ms" className="text-4xl lg:text-5xl font-black uppercase leading-tight">Comencemos.<br /><span className="text-sky-400">Es gratis.</span></h2>
                <p data-anim data-delay="200ms" className="mt-6 text-white/80 text-base leading-relaxed max-w-sm mx-auto">Cuéntame en qué situación estás y qué quieres aprender. Te respondo personalmente.</p>
                <div data-anim data-delay="300ms" className="mt-8 space-y-3 text-zinc-500 text-sm">
                  <div className="flex items-center justify-center gap-3"><Mail size={15} className="text-sky-400" /><span>rsantanderh@gmail.com</span></div>
                  <div className="flex items-center justify-center gap-3"><MapPin size={15} className="text-sky-400" /><span>Santiago, Chile — clases online</span></div>
                </div>
              </div>
              <div data-anim data-delay="150ms" className="space-y-4 mt-12">
                <div className="grid grid-cols-2 gap-4">
                  {[{l:"Nombre",k:"name",t:"text",p:"Tu nombre"},{l:"Email",k:"email",t:"email",p:"tu@email.com"}].map(({l,k,t,p}) => (
                    <div key={k}>
                      <label className="text-zinc-500 text-xs uppercase tracking-widest block mb-2 text-center">{l}</label>
                      <input type={t} value={form[k as keyof typeof form]} onChange={e => setForm({...form,[k]:e.target.value})} placeholder={p}
                        className="w-full bg-[#0a0f1a] border border-zinc-800 rounded-2xl px-5 py-4 text-white text-sm placeholder-zinc-700 focus:border-sky-500 focus:outline-none transition" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-zinc-500 text-xs uppercase tracking-widest block mb-2 text-center">Tu perfil</label>
                  <select value={form.profile} onChange={e => setForm({...form,profile:e.target.value})}
                    className="w-full bg-[#0a0f1a] border border-zinc-800 rounded-2xl px-5 py-4 text-white text-sm focus:border-sky-500 focus:outline-none transition appearance-none">
                    <option value="">Selecciona tu perfil</option>
                    <option>Persona natural</option><option>Emprendedor</option><option>PyME establecida</option><option>Profesional independiente</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-500 text-xs uppercase tracking-widest block mb-2 text-center">¿Qué quieres aprender?</label>
                  <textarea rows={3} value={form.goal} onChange={e => setForm({...form,goal:e.target.value})} placeholder="Ej: Entender mis beneficios de AFP, postular a Corfo..."
                    className="w-full bg-[#0a0f1a] border border-zinc-800 rounded-2xl px-5 py-4 text-white text-sm placeholder-zinc-700 focus:border-sky-500 focus:outline-none transition resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button onClick={sendWhatsApp} className="bg-[#25D366] hover:bg-[#1ebe5d] transition rounded-2xl py-4 font-bold text-black text-sm flex items-center justify-center gap-2"><MessageCircle size={16} /> WhatsApp</button>
                  <button onClick={sendEmail} className="bg-sky-600 hover:bg-sky-500 transition text-white rounded-2xl py-4 font-bold text-sm flex items-center justify-center gap-2"><Mail size={16} /> Email</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 bg-[#0d1321]">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex flex-col items-center text-center gap-6 pb-8 mb-8 border-b border-white/5">
              <div>
                <p className="font-black text-xl">Chile<span className="text-sky-400">Financiero</span></p>
                <p className="text-zinc-600 text-xs mt-1">Por Roberto Santander Hoffmann · CANOPIA</p>
              </div>
              <nav className="flex flex-wrap justify-center gap-6 text-zinc-600 text-sm">
                {[["Swing Trader Club","https://swingtraderclub.canopia.cl"],["canopia.cl","https://canopia.cl"],["Instagram","https://instagram.com/rsantanderh"]].map(([l,h]) => (
                  <a key={l} href={h} target={h.startsWith("http")?"_blank":undefined} rel={h.startsWith("http")?"noopener noreferrer":undefined} className="hover:text-white transition">{l}</a>
                ))}
              </nav>
            </div>
            <div className="flex flex-col items-center text-center gap-3 text-zinc-700 text-xs">
              <p>© 2026 Chile Financiero · Roberto Santander Hoffmann</p>
              <DisclaimerLink label="Aviso legal y sobre Roberto →" />
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
