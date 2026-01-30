"use client";

import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-16 border-t border-[var(--card-border)]">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="6"
                  y="8"
                  width="20"
                  height="20"
                  rx="3"
                  fill="var(--accent)"
                />
                <rect
                  x="8"
                  y="10"
                  width="16"
                  height="16"
                  rx="2"
                  fill="var(--code-bg)"
                />
              </svg>
              <span className="font-semibold">Coldbrew</span>
            </div>
            <p className="text-sm text-[var(--foreground-muted)]">
              Smooth. Fast. Reproducible.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a
              href="/docs"
              className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/swiftlysingh/coldbrew"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/swiftlysingh/coldbrew/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Releases
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/swiftlysingh/coldbrew"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-[var(--background-secondary)] transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} className="text-[var(--foreground-muted)]" />
            </a>
            <a
              href="https://twitter.com/coldbrew"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-[var(--background-secondary)] transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} className="text-[var(--foreground-muted)]" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--card-border)] text-center">
          <p className="text-sm text-[var(--foreground-muted)]">
            MIT License. Made with love and caffeine.
          </p>
        </div>
      </div>
    </footer>
  );
}
