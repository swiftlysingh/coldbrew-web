"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <div className="code-block pr-12">
        <code className="text-sm">{code}</code>
      </div>
      <button
        onClick={handleCopy}
        className="copy-btn"
        aria-label="Copy code"
      >
        {copied ? (
          <Check size={14} className="text-green-500" />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
        <p className="text-lg text-[var(--foreground-muted)]">
          Learn how to install and use Coldbrew, a fast and reproducible package manager.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What is Coldbrew?</h2>
        <p className="text-[var(--foreground-muted)]">
          Coldbrew is a Homebrew-compatible package manager written in Rust. It&apos;s designed
          to give you full control over your development environment with:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[var(--foreground-muted)]">
          <li><strong>No auto-updates</strong> &ndash; Updates only happen when you ask for them</li>
          <li><strong>No sudo required</strong> &ndash; Everything installs to your home directory</li>
          <li><strong>Multi-version support</strong> &ndash; Run different versions of the same tool</li>
          <li><strong>Reproducible builds</strong> &ndash; Lock files ensure consistent environments</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Install</h2>
        <p className="text-[var(--foreground-muted)]">
          Install Coldbrew with a single command:
        </p>
        <CodeBlock code="curl -fsSL coldbrew.sh/install | bash" />
        <p className="text-[var(--foreground-muted)]">
          After installation, add Coldbrew to your PATH:
        </p>
        <CodeBlock code='export PATH="$HOME/.coldbrew/bin:$PATH"' />
        <p className="text-sm text-[var(--foreground-muted)]">
          Add this line to your <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">~/.zshrc</code> or <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">~/.bashrc</code> to make it permanent.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Your First Commands</h2>
        <p className="text-[var(--foreground-muted)]">
          Update the package index to get the latest package information:
        </p>
        <CodeBlock code="crew update" />

        <p className="text-[var(--foreground-muted)]">
          Search for a package:
        </p>
        <CodeBlock code="crew search node" />

        <p className="text-[var(--foreground-muted)]">
          Install a package:
        </p>
        <CodeBlock code="crew install node" />

        <p className="text-[var(--foreground-muted)]">
          Install a specific version:
        </p>
        <CodeBlock code="crew install node@20" />

        <p className="text-[var(--foreground-muted)]">
          List installed packages:
        </p>
        <CodeBlock code="crew list" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Project Configuration</h2>
        <p className="text-[var(--foreground-muted)]">
          Create a <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">coldbrew.toml</code> file to define project-specific dependencies:
        </p>
        <CodeBlock code="crew init" />
        <p className="text-[var(--foreground-muted)]">
          This creates a configuration file where you can specify your project&apos;s packages:
        </p>
        <div className="code-block my-4">
          <pre className="text-sm">
{`[packages]
node = "20"
python = "3.12"

[dev_packages]
rust = "1.75"`}
          </pre>
        </div>
        <p className="text-[var(--foreground-muted)]">
          Generate a lock file to pin exact versions:
        </p>
        <CodeBlock code="crew lock" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="/docs/commands"
            className="card hover:border-[var(--accent)]/30 transition-colors"
          >
            <h3 className="font-semibold mb-2">Command Reference</h3>
            <p className="text-sm text-[var(--foreground-muted)]">
              Complete list of all Coldbrew commands and options.
            </p>
          </a>
          <a
            href="/docs/configuration"
            className="card hover:border-[var(--accent)]/30 transition-colors"
          >
            <h3 className="font-semibold mb-2">Configuration</h3>
            <p className="text-sm text-[var(--foreground-muted)]">
              Learn about coldbrew.toml and lock files.
            </p>
          </a>
          <a
            href="/docs/version-management"
            className="card hover:border-[var(--accent)]/30 transition-colors"
          >
            <h3 className="font-semibold mb-2">Version Management</h3>
            <p className="text-sm text-[var(--foreground-muted)]">
              Managing multiple versions and shims.
            </p>
          </a>
          <a
            href="/docs/migration"
            className="card hover:border-[var(--accent)]/30 transition-colors"
          >
            <h3 className="font-semibold mb-2">Migration Guide</h3>
            <p className="text-sm text-[var(--foreground-muted)]">
              Moving from Homebrew to Coldbrew.
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}
