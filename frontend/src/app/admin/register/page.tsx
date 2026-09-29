"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminRegister } from "@/lib/api";
import Link from "next/link";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminRegister(firstname, lastname, email, password);
      router.push("/admin/register/complete");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Admin register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-black px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl animate-blob [animation-delay:6s]" />
      </div>

      <div className="animate-fade-up relative z-10 w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Create admin</h1>
          <p className="mt-2 text-sm text-slate-300">
            Register an admin account for CyberSec
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/15 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-200">
                First name
              </label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                placeholder="John"
                className="input-base bg-white/5 text-white placeholder-slate-400"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-200">
                Last name
              </label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                placeholder="Doe"
                className="input-base bg-white/5 text-white placeholder-slate-400"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="input-base bg-white/5 text-white placeholder-slate-400"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="At least 8 characters"
              className="input-base bg-white/5 text-white placeholder-slate-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-all hover:brightness-110 hover:shadow-xl disabled:opacity-50"
          >
            {loading ? "Creating admin..." : "Create admin account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-300">
          Are you a member?{" "}
          <Link
            href="/register"
            className="font-medium text-indigo-300 hover:text-indigo-200 hover:underline"
          >
            User register
          </Link>
        </p>
      </div>
    </div>
  );
}