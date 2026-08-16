"use client";

import { useState } from "react";

type Props = { placeholder?: string; autoComplete: string };

export default function PasswordField({
  placeholder = "Password",
  autoComplete,
}: Props) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="flex items-center gap-3 rounded-xl border border-[#D8E2DA] bg-white px-4 text-[#718075] transition focus-within:border-[#346739] focus-within:ring-2 focus-within:ring-[#346739]/10">
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </svg>
      <span className="sr-only">{placeholder}</span>
      <input
        required
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-[#293A2D] outline-none placeholder:text-[#819085]"
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={
          visible
            ? `Hide ${placeholder.toLowerCase()}`
            : `Show ${placeholder.toLowerCase()}`
        }
        aria-pressed={visible}
        className="shrink-0 rounded-md p-1 text-[#718075] transition hover:bg-[#F0FFF6] hover:text-[#346739]"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="2.5" />
          {visible ? null : <path d="m4 4 16 16" />}
        </svg>
      </button>
    </label>
  );
}
