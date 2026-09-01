"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, getToken, removeToken } from "@/lib/api";

interface User {
  id: number;
  username: string;
  email: string;
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xl font-bold text-white shadow-lg shadow-indigo-500/30">
      {initials || "?"}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    getMe(token)
      .then((u) => {
        setUser(u);
        setLoading(false);
      })
      .catch(() => {
        removeToken();
        router.push("/login");
      });
  }, [router]);

  function handleLogout() {
    removeToken();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
        <div className="flex items-center gap-3 text-slate-300">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-sm">
              C
            </span>
            CyberSec
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-red-400/30 bg-red-500/15 px-4 py-2 text-sm font-medium text-red-200 transition-all hover:bg-red-500/25"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="animate-fade-up rounded-2xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-5 border-b border-white/10 pb-6">
            <Avatar name={user?.username ?? ""} />
            <div>
              <h2 className="text-2xl font-bold text-white">
                {user?.username}
              </h2>
              <p className="text-sm text-slate-300">Member profile</p>
            </div>
          </div>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-white/5 px-5 py-4">
              <dt className="text-sm text-slate-300">ID</dt>
              <dd className="font-mono text-white">#{user?.id}</dd>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/5 px-5 py-4">
              <dt className="text-sm text-slate-300">Username</dt>
              <dd className="font-semibold text-white">{user?.username}</dd>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/5 px-5 py-4">
              <dt className="text-sm text-slate-300">Email</dt>
              <dd className="font-semibold text-white">{user?.email}</dd>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/5 px-5 py-4">
              <dt className="text-sm text-slate-300">Status</dt>
              <dd className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Active
              </dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}
