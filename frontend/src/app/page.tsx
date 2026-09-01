import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl animate-blob [animation-delay:4s]" />
        <div className="absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl animate-blob [animation-delay:8s]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-indigo-200 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Cyber Security Course Project
        </div>

        <h1 className="animate-fade-up mb-4 text-5xl font-bold tracking-tight sm:text-7xl">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
            CyberSec
          </span>
        </h1>

        <p className="animate-fade-up mb-10 max-w-md text-lg text-slate-300 [animation-delay:0.15s]">
          Secure authentication demo with Strapi backend. Login or create an
          account to get started.
        </p>

        <div className="animate-fade-up flex flex-wrap justify-center gap-4 [animation-delay:0.3s]">
          <Link
            href="/login"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-8 py-3.5 font-semibold shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40 hover:brightness-110"
          >
            Login
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 font-semibold backdrop-blur transition-all hover:bg-white/20"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
