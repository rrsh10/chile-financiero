// Usuarios del portal Chile Financiero
// Para agregar alumnos: { email, password, name }
export const USERS = [
  { email: "roberto@canopia.cl", password: "chile2026", name: "Roberto Santander" },
  { email: "demo@chilefinanciero.cl", password: "demo2026", name: "Usuario Demo" },
];

export const SESSION_KEY = "cf_session";

export function login(email: string, password: string): { name: string; email: string } | null {
  const user = USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) return null;
  return { name: user.name, email: user.email };
}

export function getSession(): { name: string; email: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(user: { name: string; email: string }) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
