// src/app/components/AuthGate.tsx
'use client';

import React, { useState } from 'react';
import { ACCOUNTS } from '@/lib/auth';
import { UserSession } from '@/lib/types';

interface AuthGateProps {
  onLogin: (session: UserSession) => void;
}

export default function AuthGate({ onLogin }: AuthGateProps) {
  const [username, setUsername] = useState('tech_team');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const account = ACCOUNTS.find(
      (a) => a.username.toLowerCase() === username.trim().toLowerCase() && a.password === password
    );

    if (account) {
      onLogin({
        username: account.username,
        role: account.role,
        committeeCategory: account.committee,
      });
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950 px-3 py-1 rounded border border-indigo-800">
            IoT Club Committee Portal
          </span>
          <h1 className="text-2xl font-bold text-white mt-3">Committee Sign In</h1>
          <p className="text-xs text-slate-400 mt-1">
            Log in with your committee credentials to access tasks and points
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Select Account / Username
            </label>
            <select
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {ACCOUNTS.map((acc) => (
                <option key={acc.username} value={acc.username}>
                  {acc.label} ({acc.username})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {error && <p className="text-xs text-red-400 font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg text-sm transition shadow-lg shadow-indigo-600/20"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-300 mb-2">Default Passwords:</p>
          <ul className="text-[11px] space-y-1 font-mono text-indigo-300">
            <li>• Executives: <span className="text-white">exec2026password</span></li>
            <li>• Technical: <span className="text-white">tech2026password</span></li>
            <li>• Activities: <span className="text-white">act2026password</span></li>
            <li>• PR: <span className="text-white">pr2026password</span></li>
            <li>• Media: <span className="text-white">media2026password</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}