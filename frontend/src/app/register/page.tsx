"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, saveToken } from "@/lib/api";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await register(username, email, password);
      saveToken(data.jwt);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-black px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl animate-blob [animation-delay:6s]" />
      </div>

      <div className="animate-fade-up relative z-10 w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Create account</h1>
          <p className="mt-2 text-sm text-slate-300">
            Join CyberSec today
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/15 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="john_doe"
              className="input-base bg-white/5 text-white placeholder-slate-400"
            />
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
              placeholder="you@example.com"
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
              placeholder="At least 6 characters"
              className="input-base bg-white/5 text-white placeholder-slate-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:brightness-110 hover:shadow-xl disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-300">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-300 hover:text-indigo-200 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
