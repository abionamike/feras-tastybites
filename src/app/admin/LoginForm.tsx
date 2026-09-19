"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="block text-left">
        <span className="label">Password</span>
        <input name="password" type="password" autoComplete="current-password" autoFocus required className="field" />
      </label>
      {state.error && <p className="text-sm font-semibold text-pepper">{state.error}</p>}
      <button className="btn-primary w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
