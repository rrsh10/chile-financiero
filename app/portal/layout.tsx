"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/supabase";
import { LogOut, Home } from "lucide-react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [user, setUser]   = useState<{ name: string; email: string } | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
      } else {
        const name = session.user.user_metadata?.full_name
          || session.user.user_metadata?.name
          || session.user.email?.split("@")[0]
          || "Alumno";
        setUser({ name, email: session.user.email ?? "" });
        setReady(true);
      }
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (!ready) return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex flex-col">
      <header className="border-b border-white/5 bg-[#0a0f1a]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="/" className="font-black text-base tracking-tight text-white">
              Chile<span className="text-sky-400">Financiero</span>
            </a>
            <span className="text-zinc-700 text-xs hidden sm:block">·</span>
            <span className="text-zinc-500 text-xs hidden sm:block">Mis clases</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/portal" className={`text-xs font-semibold flex items-center gap-1.5 transition ${pathname === "/portal" ? "text-white" : "text-zinc-500 hover:text-white"}`}>
              <Home size={13} /> Dashboard
            </a>
            <div className="h-4 w-px bg-zinc-800" />
            <span className="text-zinc-400 text-xs hidden sm:block truncate max-w-[140px]">{user?.name}</span>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-red-400 transition">
              <LogOut size={13} /> Salir
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
