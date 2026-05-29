import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chile Financiero — Educación Financiera Real para Chilenos",
  description:
    "Aprende a manejar el sistema financiero chileno. Bancos, beneficios sociales, Corfo, SERCOTEC, AFP, BancoEstado y más. Para personas, emprendedores y PyMEs.",
  keywords:
    "educación financiera Chile, beneficios sociales Chile, Corfo, SERCOTEC, BancoEstado, emprendimiento Chile, PyMEs Chile",
  openGraph: {
    title: "Chile Financiero",
    description: "Educación financiera práctica para chilenos, emprendedores y PyMEs.",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
