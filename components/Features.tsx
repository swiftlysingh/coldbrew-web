"use client";

import {
  Layers,
  GitBranch,
  Download,
  FolderLock,
  Terminal,
  RefreshCw,
  Package,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Multi-version support",
    description:
      "Install node@18 and node@22 side-by-side. Switch between versions per project.",
  },
  {
    icon: FolderLock,
    title: "No sudo required",
    description:
      "Everything installs to ~/.coldbrew. Remove it all with rm -rf if you want.",
  },
  {
    icon: GitBranch,
    title: "Lockfiles",
    description:
      "coldbrew.lock pins exact versions and checksums. Reproducible builds, always.",
  },
  {
    icon: Terminal,
    title: "Smart shims",
    description:
      "Auto-detects .nvmrc, .python-version, and more. Right version, right project.",
  },
  {
    icon: Download,
    title: "Parallel downloads",
    description:
      "Download multiple packages simultaneously. Aggressive caching saves bandwidth.",
  },
  {
    icon: RefreshCw,
    title: "Interactive upgrades",
    description:
      "See the upgrade plan before it runs. No surprise dependency cascades.",
  },
  {
    icon: Package,
    title: "Homebrew compatible",
    description:
      "Uses Homebrew's formula index and bottles. Access to thousands of packages.",
  },
  {
    icon: Shield,
    title: "Safe garbage collection",
    description:
      "crew gc is interactive by default. Never accidentally delete needed versions.",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-[var(--background-secondary)]">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Modern package management without the friction.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)]/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--accent)]/20 transition-colors">
                <feature.icon size={20} className="text-[var(--accent)]" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
