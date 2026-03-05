"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false
    });
    if (result?.error) toast.error(result.error);
    else toast.success("Welcome back!");
    setLoading(false);
  };

  return (
    <main className="mx-auto mt-20 max-w-md p-6">
      <form onSubmit={onSubmit} className="glass-card space-y-4 rounded-2xl p-6">
        <input name="email" type="email" required className="w-full rounded bg-slate-900 p-2" placeholder="Email" />
        <input name="password" type="password" required className="w-full rounded bg-slate-900 p-2" placeholder="Password" />
        <button disabled={loading} className="w-full rounded bg-cyan-500 p-2 font-semibold text-slate-950">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
