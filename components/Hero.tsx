"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const installCommand = "curl -fsSL coldbrew.sh/install | bash";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to top, var(--background), transparent)",
          }}
        />
      </div>

      <div className="container relative z-10 text-center px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background-secondary)] border border-[var(--card-border)] mb-8 fade-in-up">
          <span className="w-2 h-2 rounded-full bg-[var(--copper)] animate-pulse" />
          <span className="text-sm text-[var(--foreground-muted)]">
            Written in Rust
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 fade-in-up delay-100">
          <span className="block">Smooth.</span>
          <span className="block text-[var(--accent)]">Fast.</span>
          <span className="block">Reproducible.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-[var(--foreground-muted)] max-w-2xl mx-auto mb-12 fade-in-up delay-200">
          A Homebrew-compatible package manager that respects your control.
          <br className="hidden md:block" />
          No auto-updates. No sudo. No surprises.
        </p>

        {/* Install Command */}
        <div className="max-w-xl mx-auto mb-12 fade-in-up delay-300">
          <div className="relative group">
            <div className="code-block flex items-center justify-between gap-4 pr-14">
              <div className="flex items-center gap-3 overflow-x-auto">
                <Terminal size={18} className="text-[var(--accent)] shrink-0" />
                <code className="text-sm md:text-base whitespace-nowrap">
                  {installCommand}
                </code>
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="copy-btn absolute top-1/2 -translate-y-1/2 right-3"
              aria-label="Copy install command"
            >
              {copied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
          <p className="text-sm text-[var(--foreground-muted)] mt-3">
            Works on macOS and Linux
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 fade-in-up delay-400">
          <a href="/docs" className="btn-accent inline-flex items-center gap-2">
            Get Started
          </a>
          <a
            href="https://github.com/swiftlysingh/coldbrew"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-[var(--card-border)] hover:bg-[var(--background-secondary)] transition-colors"
          >
            View on GitHub
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-in-up delay-500">
          <div className="w-6 h-10 rounded-full border-2 border-[var(--foreground-muted)] flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-[var(--accent)] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
