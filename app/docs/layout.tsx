"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Book,
  Download,
  Terminal,
  Settings,
  Layers,
  ArrowRightLeft,
  ChevronRight,
} from "lucide-react";

const sidebarLinks = [
  {
    title: "Getting Started",
    href: "/docs",
    icon: Book,
  },
  {
    title: "Installation",
    href: "/docs/installation",
    icon: Download,
  },
  {
    title: "Commands",
    href: "/docs/commands",
    icon: Terminal,
  },
  {
    title: "Configuration",
    href: "/docs/configuration",
    icon: Settings,
  },
  {
    title: "Version Management",
    href: "/docs/version-management",
    icon: Layers,
  },
  {
    title: "Migration from Homebrew",
    href: "/docs/migration",
    icon: ArrowRightLeft,
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-1 pt-20">
        <div className="container px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <nav className="lg:sticky lg:top-24">
                <ul className="space-y-1">
                  {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                            isActive
                              ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                              : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-secondary)]"
                          }`}
                        >
                          <link.icon size={18} />
                          <span className="font-medium">{link.title}</span>
                          {isActive && (
                            <ChevronRight size={16} className="ml-auto" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">
              <article className="prose prose-lg max-w-none">
                {children}
              </article>
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
