"use client";

import { useState, type FormEvent } from "react";
import ArrowRightIcon from "./ArrowRightIcon";

type EmailSubscribeProps = {
  className?: string;
};

export default function EmailSubscribe({ className }: EmailSubscribeProps) {
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to newsletter API
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={[
        "flex items-center rounded-full border border-brand bg-transparent pl-5 pr-1.5 py-1.5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        aria-label="Email address for newsletter"
        className="flex-1 min-w-0 bg-transparent text-[14px] font-outfit text-nav-text placeholder:text-footer-muted outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-btn-text transition-opacity duration-200 hover:opacity-80"
      >
        <ArrowRightIcon className="text-btn-text" size={15} />
      </button>
    </form>
  );
}
