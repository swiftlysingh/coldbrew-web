"use client";

import { useState } from "react";
import { Copy, Check, ChevronRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Install Coldbrew",
    description: "One command to get started",
    code: "curl -fsSL coldbrew.sh/install | bash",
  },
  {
    number: "02",
    title: "Set up your shell",
    description: "Add Coldbrew to your PATH",
    code: 'echo \'export PATH="$HOME/.coldbrew/bin:$PATH"\' >> ~/.zshrc',
  },
  {
    number: "03",
    title: "Install packages",
    description: "Start installing what you need",
    code: "crew install node python rust",
  },
];

export function QuickStart() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-24 bg-[var(--background-secondary)]">
      <div className="container px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get started in seconds
          </h2>
          <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Three simple steps to a better package management experience.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="card flex flex-col md:flex-row md:items-center gap-6"
            >
              <div className="flex items-center gap-4 md:w-64 shrink-0">
                <span className="text-4xl font-bold text-[var(--accent)]/30">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-[var(--foreground-muted)]">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="flex-1 relative group">
                <div className="code-block pr-12">
                  <code className="text-sm">{step.code}</code>
                </div>
                <button
                  onClick={() => handleCopy(step.code, index)}
                  className="copy-btn"
                  aria-label="Copy command"
                >
                  {copiedIndex === index ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/docs"
            className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium transition-colors"
          >
            Read the full documentation
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
