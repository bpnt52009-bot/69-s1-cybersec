import Link from "next/link";

const ADMIN_PANEL_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:9091";

export default function AdminRegisterCompletePage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-black px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl animate-blob [animation-delay:6s]" />
      </div>

      <div className="animate-fade-up relative z-10 w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-white">Admin created!</h1>
        <p className="mt-3 text-sm text-slate-300">
          Your admin account has been created successfully. You can now sign in
          to the admin panel with the credentials you registered.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <a
            href={`${ADMIN_PANEL_URL}/admin`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-all hover:brightness-110 hover:shadow-xl"
          >
            Go to admin panel
          </a>
          <Link
            href="/"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}