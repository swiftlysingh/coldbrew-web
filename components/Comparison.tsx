"use client";

import { Check, X, Minus } from "lucide-react";

interface ComparisonRow {
  feature: string;
  coldbrew: "yes" | "no" | "partial" | string;
  homebrew: "yes" | "no" | "partial" | string;
}

const comparisons: ComparisonRow[] = [
  { feature: "Written in", coldbrew: "Rust", homebrew: "Ruby" },
  { feature: "No sudo required", coldbrew: "yes", homebrew: "partial" },
  { feature: "Multi-version support", coldbrew: "yes", homebrew: "no" },
  { feature: "Lockfile support", coldbrew: "yes", homebrew: "no" },
  { feature: "No auto-updates", coldbrew: "yes", homebrew: "no" },
  { feature: "Interactive upgrades", coldbrew: "yes", homebrew: "no" },
  { feature: "Version file detection", coldbrew: "yes", homebrew: "no" },
  { feature: "Parallel downloads", coldbrew: "yes", homebrew: "partial" },
  { feature: "Cross-platform", coldbrew: "yes", homebrew: "yes" },
  { feature: "Package ecosystem", coldbrew: "Homebrew", homebrew: "Homebrew" },
];

function StatusCell({ value }: { value: string }) {
  if (value === "yes") {
    return (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check size={14} className="text-green-500" />
        </div>
      </div>
    );
  }
  if (value === "no") {
    return (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
          <X size={14} className="text-red-500" />
        </div>
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
          <Minus size={14} className="text-yellow-500" />
        </div>
      </div>
    );
  }
  return (
    <span className="text-sm text-[var(--foreground-muted)]">{value}</span>
  );
}

export function Comparison() {
  return (
    <section className="py-24">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Coldbrew vs Homebrew
          </h2>
          <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Same great packages. Better developer experience.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--card-border)]">
                    <th className="text-left p-4 bg-[var(--background-secondary)]">
                      Feature
                    </th>
                    <th className="text-center p-4 bg-[var(--accent)]/10 min-w-[120px]">
                      <span className="text-[var(--accent)] font-bold">
                        Coldbrew
                      </span>
                    </th>
                    <th className="text-center p-4 bg-[var(--background-secondary)] min-w-[120px]">
                      <span className="text-[var(--foreground-muted)]">
                        Homebrew
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, index) => (
                    <tr
                      key={row.feature}
                      className={
                        index !== comparisons.length - 1
                          ? "border-b border-[var(--card-border)]"
                          : ""
                      }
                    >
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center bg-[var(--accent)]/5">
                        <StatusCell value={row.coldbrew} />
                      </td>
                      <td className="p-4 text-center">
                        <StatusCell value={row.homebrew} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
