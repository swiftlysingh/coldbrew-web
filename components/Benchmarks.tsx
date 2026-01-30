"use client";

import { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";

interface Benchmark {
  label: string;
  coldbrew: number;
  homebrew: number;
  unit: string;
}

const benchmarks: Benchmark[] = [
  { label: "Install node", coldbrew: 1.2, homebrew: 8.4, unit: "s" },
  { label: "Update index", coldbrew: 0.3, homebrew: 4.2, unit: "s" },
  { label: "Search packages", coldbrew: 0.05, homebrew: 0.8, unit: "s" },
  { label: "List installed", coldbrew: 0.02, homebrew: 0.5, unit: "s" },
];

export function Benchmarks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSpeedMultiple = (coldbrew: number, homebrew: number) => {
    return Math.round(homebrew / coldbrew);
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--background-secondary) 50%, transparent 100%)",
        }}
      />

      <div className="container relative z-10 px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-4">
            <Zap size={14} />
            Performance
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Blazingly Fast
          </h2>
          <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Built in Rust with aggressive caching and parallel downloads.
            Cold brew is served fast.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {benchmarks.map((benchmark, index) => (
            <div
              key={benchmark.label}
              className="card"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${index * 0.1}s`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">{benchmark.label}</span>
                <span className="text-[var(--accent)] font-bold">
                  {getSpeedMultiple(benchmark.coldbrew, benchmark.homebrew)}x
                  faster
                </span>
              </div>

              <div className="space-y-2">
                {/* Coldbrew bar */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--foreground-muted)] w-20">
                    Coldbrew
                  </span>
                  <div className="flex-1 h-6 bg-[var(--background-secondary)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full flex items-center justify-end pr-3"
                      style={{
                        width: isVisible
                          ? `${(benchmark.coldbrew / benchmark.homebrew) * 100}%`
                          : "0%",
                        background:
                          "linear-gradient(90deg, var(--accent), var(--copper))",
                        transition: `width 1s ease ${index * 0.1 + 0.3}s`,
                        minWidth: "60px",
                      }}
                    >
                      <span className="text-xs font-mono text-white font-bold">
                        {benchmark.coldbrew}
                        {benchmark.unit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Homebrew bar */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--foreground-muted)] w-20">
                    Homebrew
                  </span>
                  <div className="flex-1 h-6 bg-[var(--background-secondary)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--mocha)] rounded-full flex items-center justify-end pr-3"
                      style={{
                        width: isVisible ? "100%" : "0%",
                        transition: `width 1s ease ${index * 0.1 + 0.3}s`,
                      }}
                    >
                      <span className="text-xs font-mono text-white font-bold">
                        {benchmark.homebrew}
                        {benchmark.unit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[var(--foreground-muted)] mt-8">
          * Benchmarks measured on Apple M2 MacBook Pro. Your results may vary.
        </p>
      </div>
    </section>
  );
}
