"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const res = await signIn("credentials", {
      username: username.trim(),
      password,
      redirect: false,
    });
    setPending(false);
    if (res?.error) {
      setError("Username atau password salah.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary-cream px-4 text-stone-800">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-primary-cream p-8 shadow-sm">
        <h1 className="text-center text-xl font-semibold tracking-tight text-stone-900">
          Sentuh Undang
        </h1>
        <p className="mt-1 text-center text-sm text-stone-600">Masuk ke panel admin</p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-stone-700">Username</span>
            <input
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-lg border border-stone-300 bg-white px-3 py-2 outline-none ring-stone-400 focus:ring-2"
              required
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-stone-700">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-stone-300 bg-white px-3 py-2 outline-none ring-stone-400 focus:ring-2"
              required
            />
          </label>
          {error ? (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-lg bg-sage-green py-2.5 text-sm font-medium text-white transition hover:bg-sage-green/85 disabled:opacity-60"
          >
            {pending ? "Memproses…" : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-primary-cream text-stone-600">
          Memuat…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
