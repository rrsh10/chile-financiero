"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("Email o contraseña incorrectos. Verifica tus datos.");
      setLoading(false);
      return;
    }

    router.push("/portal");
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex flex-col">

      <header className="px-8 py-6 flex items-center justify-between border-b border-white/5">
        <a href="/" className="font-black text-lg tracking-tight text-white">
          Chile<span className="text-sky-400">Financiero</span>
        </a>
        <a href="/" className="text-zinc-500 text-sm hover:text-white transition">← Volver</a>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-8 bg-red-500 rounded-full" />
            <div>
              <p className="text-white font-bold text-sm">Área de alumnos</p>
              <p className="text-zinc-500 text-xs">Chile Financiero · Acceso privado</p>
            </div>
          </div>

          <h1 className="text-3xl font-black text-white mb-2 leading-tight">
            Bienvenido<br /><span className="text-sky-400">de vuelta.</span>
          </h1>
          <p className="text-zinc-400 text-sm mb-8">
            Usa las mismas credenciales de tu cuenta CANOPIA.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest block mb-2 font-semibold">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required
                  className="w-full bg-[#0d1321] border border-zinc-800 rounded-2xl pl-11 pr-5 py-4 text-white text-sm placeholder-zinc-700 focus:border-red-500/60 focus:outline-none transition" />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 text-xs uppercase tracking-widest block mb-2 font-semibold">Contraseña</label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  className="w-full bg-[#0d1321] border border-zinc-800 rounded-2xl pl-11 pr-5 py-4 text-white text-sm placeholder-zinc-700 focus:border-red-500/60 focus:outline-none transition" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 bg-red-500/8 border border-red-500/20 rounded-2xl px-4 py-3">
                <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-60 transition text-white rounded-2xl py-4 font-bold text-sm flex items-center justify-center gap-2 mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verificando...
                </span>
              ) : (
                <span className="flex items-center gap-2">Ingresar <ArrowRight size={15} /></span>
              )}
            </button>
          </form>

          <p className="text-zinc-600 text-xs text-center mt-8">
            ¿Problemas para acceder?{" "}
            <a href="mailto:rsantanderh@gmail.com" className="text-sky-400 hover:text-sky-300 transition">rsantanderh@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
