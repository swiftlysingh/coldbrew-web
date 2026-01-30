"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Github } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function Navigation() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--card-border)]"
          : ""
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:scale-110"
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
                <path
                  d="M12 4C12 4 13 2 16 2C19 2 20 4 20 4"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="steam"
                />
                <path
                  d="M14 5C14 5 15 3.5 16 3.5C17 3.5 18 5 18 5"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="steam"
                  style={{ animationDelay: "0.3s" }}
                />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Coldbrew
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/docs"
              className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/swiftlysingh/coldbrew"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors flex items-center gap-2"
            >
              <Github size={18} />
              GitHub
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--background-secondary)] hover:bg-[var(--card-border)] transition-colors"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "dark" ? <Sun size={18} /> : <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[var(--card-border)] pt-4">
            <div className="flex flex-col gap-4">
              <a
                href="/docs"
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                Docs
              </a>
              <a
                href="https://github.com/swiftlysingh/coldbrew"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors flex items-center gap-2"
              >
                <Github size={18} />
                GitHub
              </a>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {mounted ? (
                  <>
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                  </>
                ) : (
                  <>
                    <Sun size={18} />
                    Light mode
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
