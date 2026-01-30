"use client";

import {
  Shield,
  MousePointerClick,
  Zap,
  Globe,
  Lock,
} from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "User is always in control",
    description:
      "No auto-updates, no forced upgrades, no sudo. You decide what happens on your machine.",
    color: "#D4A574",
  },
  {
    icon: MousePointerClick,
    title: "Explicit over implicit",
    description:
      "Each command does exactly what it says and nothing more. No hidden side effects.",
    color: "#E5983B",
  },
  {
    icon: Zap,
    title: "Fast by default",
    description:
      "Bottles-only, parallelism where safe, and aggressive caching. Cold brew, served quick.",
    color: "#B87333",
  },
  {
    icon: Globe,
    title: "Cross-platform first-class",
    description:
      "macOS and Linux are equal citizens with consistent behavior across platforms.",
    color: "#8B6F5C",
  },
  {
    icon: Lock,
    title: "Reproducible via lockfiles",
    description:
      "coldbrew.lock is authoritative for project installs. Same versions, every time.",
    color: "#C4956A",
  },
];

export function Principles() {
  return (
    <section className="py-24">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Core Principles
          </h2>
          <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Coldbrew is built on five unwavering principles that guide every
            decision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              className="card group cursor-default"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${principle.color}20` }}
              >
                <principle.icon
                  size={24}
                  style={{ color: principle.color }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
              <p className="text-[var(--foreground-muted)]">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
