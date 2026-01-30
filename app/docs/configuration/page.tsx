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
        <pre className="text-sm whitespace-pre-wrap">{code}</pre>
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

export default function ConfigurationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Configuration</h1>
        <p className="text-lg text-[var(--foreground-muted)]">
          Learn how to configure Coldbrew for your projects and system.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Project Configuration: coldbrew.toml</h2>
        <p className="text-[var(--foreground-muted)]">
          Create a <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">coldbrew.toml</code> file
          in your project root to define dependencies. This file is similar to a <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">package.json</code> for
          system packages.
        </p>

        <CodeBlock
          language="toml"
          code={`# coldbrew.toml - Project package configuration

# Required packages for this project
[packages]
node = "20"           # Major version only
python = "3.12"       # Minor version
go = "1.21.5"         # Exact version

# Development-only packages
[dev_packages]
rust = "1.75"
jq = "1.7"`}
        />

        <h3 className="text-xl font-semibold mt-6">Creating a Configuration File</h3>
        <p className="text-[var(--foreground-muted)]">
          Run <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">crew init</code> to create a new configuration file:
        </p>
        <CodeBlock code="crew init" />

        <h3 className="text-xl font-semibold mt-6">Version Specifiers</h3>
        <p className="text-[var(--foreground-muted)]">
          Coldbrew supports flexible version specifications:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[var(--foreground-muted)]">
          <li><code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">&quot;20&quot;</code> &ndash; Latest version matching major version 20</li>
          <li><code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">&quot;20.10&quot;</code> &ndash; Latest version matching 20.10.x</li>
          <li><code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">&quot;20.10.0&quot;</code> &ndash; Exact version</li>
          <li><code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">&quot;latest&quot;</code> &ndash; Always use the latest version</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Lock Files: coldbrew.lock</h2>
        <p className="text-[var(--foreground-muted)]">
          Lock files pin exact versions and checksums for reproducible builds. Generate one with:
        </p>
        <CodeBlock code="crew lock" />

        <p className="text-[var(--foreground-muted)]">
          The lock file contains:
        </p>
        <CodeBlock
          language="toml"
          code={`# coldbrew.lock - Auto-generated, do not edit manually

[[package]]
name = "node"
version = "20.10.0"
sha256 = "abc123..."
bottle_url = "https://ghcr.io/..."

[[package]]
name = "python"
version = "3.12.1"
sha256 = "def456..."
bottle_url = "https://ghcr.io/..."`}
        />

        <div className="card bg-[var(--accent)]/5 border-[var(--accent)]/20">
          <p className="text-sm">
            <strong>Best Practice:</strong> Commit both <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">coldbrew.toml</code> and <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">coldbrew.lock</code> to
            version control. This ensures everyone on your team uses the exact same versions.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Global Configuration: config.toml</h2>
        <p className="text-[var(--foreground-muted)]">
          Global settings are stored in <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">~/.coldbrew/config.toml</code>:
        </p>
        <CodeBlock
          language="toml"
          code={`# ~/.coldbrew/config.toml - Global Coldbrew settings

# Number of parallel downloads (default: 4)
parallel_downloads = 8

# Cache settings
[cache]
# Keep downloaded bottles for this many days
retention_days = 30

# Bottle selection preferences
[bottles]
# Prefer bottles with specific OS version
prefer_os_version = "14"  # macOS Sonoma`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Environment Variables</h2>
        <p className="text-[var(--foreground-muted)]">
          Coldbrew respects these environment variables:
        </p>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4">Variable</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono text-[var(--accent)]">COLDBREW_HOME</td>
                <td className="py-2 text-[var(--foreground-muted)]">Installation directory (default: ~/.coldbrew)</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono text-[var(--accent)]">COLDBREW_CACHE</td>
                <td className="py-2 text-[var(--foreground-muted)]">Cache directory (default: ~/.coldbrew/cache)</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono text-[var(--accent)]">COLDBREW_NO_COLOR</td>
                <td className="py-2 text-[var(--foreground-muted)]">Disable colored output</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-[var(--accent)]">GITHUB_TOKEN</td>
                <td className="py-2 text-[var(--foreground-muted)]">GitHub token for private taps and higher rate limits</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Directory Structure</h2>
        <p className="text-[var(--foreground-muted)]">
          Coldbrew organizes files in a predictable structure:
        </p>
        <CodeBlock
          code={`~/.coldbrew/
├── bin/           # Shims and active version symlinks
├── cellar/        # Installed packages by version
│   ├── node/
│   │   ├── 20.10.0/
│   │   └── 18.19.0/
│   └── python/
│       └── 3.12.1/
├── cache/         # Downloaded bottles and index
├── taps/          # Third-party repositories
└── config.toml    # Global configuration`}
        />
      </section>
    </div>
  );
}
