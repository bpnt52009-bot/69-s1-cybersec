const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9091";

interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    blocked: boolean;
  };
}

interface ErrorResponse {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export async function register(
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error((data as ErrorResponse).error?.message || "Register failed");
  return data as AuthResponse;
}

interface AdminRegisterResponse {
  ok: boolean;
}

export async function adminRegister(
  firstname: string,
  lastname: string,
  email: string,
  password: string
): Promise<AdminRegisterResponse> {
  const res = await fetch(`${API_URL}/admin/register-admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, lastname, email, password }),
  });
  const data = await res.json();
  if (!res.ok)
    throw new Error(
      (data as ErrorResponse)?.error?.message || "Admin register failed"
    );
  return data as AdminRegisterResponse;
}

export async function login(
  identifier: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error((data as ErrorResponse).error?.message || "Login failed");
  return data as AuthResponse;
}

export async function forgotPassword(email: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error((data as ErrorResponse).error?.message || "Forgot password failed");
}

export async function resetPassword(
  code: string,
  password: string,
  passwordConfirmation: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, password, passwordConfirmation }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error((data as ErrorResponse).error?.message || "Reset password failed");
  return data as AuthResponse;
}

export async function getMe(token: string): Promise<AuthResponse["user"]> {
  const res = await fetch(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch user");
  return data;
}

export function saveToken(jwt: string) {
  localStorage.setItem("jwt", jwt);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("jwt");
}

export function removeToken() {
  localStorage.removeItem("jwt");
}
