"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

function CodeBlock({ code }: { code: string }) {
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

export default function VersionManagementPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Version Management</h1>
        <p className="text-lg text-[var(--foreground-muted)]">
          Install and manage multiple versions of packages side-by-side.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installing Multiple Versions</h2>
        <p className="text-[var(--foreground-muted)]">
          Unlike Homebrew, Coldbrew lets you install multiple versions of the same package:
        </p>
        <CodeBlock code={`# Install multiple Node.js versions
crew install node@18 node@20 node@22

# List what's installed
crew list node
# node@18.19.0
# node@20.10.0
# node@22.0.0`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Setting Default Versions</h2>
        <p className="text-[var(--foreground-muted)]">
          Set which version to use globally when no project configuration is present:
        </p>
        <CodeBlock code={`# Set Node 20 as the global default
crew default node@20

# Check the current default
crew default node
# node@20.10.0`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How Shims Work</h2>
        <p className="text-[var(--foreground-muted)]">
          Coldbrew uses shims to automatically select the right version based on your project.
          When you run <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">node</code>, Coldbrew&apos;s shim:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-[var(--foreground-muted)]">
          <li>Checks for <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">coldbrew.toml</code> in the current directory and parents</li>
          <li>Looks for version files (<code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">.nvmrc</code>, <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">.node-version</code>, etc.)</li>
          <li>Falls back to your global default</li>
          <li>Uses the latest installed version as last resort</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Version File Detection</h2>
        <p className="text-[var(--foreground-muted)]">
          Coldbrew automatically detects version files from popular tools:
        </p>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4">File</th>
                <th className="text-left py-2">Package</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono text-[var(--accent)]">.nvmrc</td>
                <td className="py-2 text-[var(--foreground-muted)]">node</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono text-[var(--accent)]">.node-version</td>
                <td className="py-2 text-[var(--foreground-muted)]">node</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono text-[var(--accent)]">.python-version</td>
                <td className="py-2 text-[var(--foreground-muted)]">python</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono text-[var(--accent)]">.ruby-version</td>
                <td className="py-2 text-[var(--foreground-muted)]">ruby</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono text-[var(--accent)]">.go-version</td>
                <td className="py-2 text-[var(--foreground-muted)]">go</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-[var(--accent)]">package.json (engines.node)</td>
                <td className="py-2 text-[var(--foreground-muted)]">node</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[var(--foreground-muted)]">
          This means your existing projects work automatically &ndash; no migration needed.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Version Resolution Order</h2>
        <p className="text-[var(--foreground-muted)]">
          When determining which version to use, Coldbrew checks in this order:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-[var(--foreground-muted)]">
          <li><strong>coldbrew.toml</strong> &ndash; Project-specific Coldbrew configuration</li>
          <li><strong>Version files</strong> &ndash; .nvmrc, .python-version, etc.</li>
          <li><strong>Global default</strong> &ndash; Set with <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">crew default</code></li>
          <li><strong>Latest installed</strong> &ndash; Highest version number available</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Pinning Versions</h2>
        <p className="text-[var(--foreground-muted)]">
          Prevent a package from being upgraded:
        </p>
        <CodeBlock code={`# Pin Node 20 to prevent upgrades
crew pin node@20

# See pinned packages
crew list --pinned

# Unpin when ready to upgrade
crew unpin node`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Removing Old Versions</h2>
        <p className="text-[var(--foreground-muted)]">
          Clean up versions you no longer need:
        </p>
        <CodeBlock code={`# Remove a specific version
crew uninstall node@18

# Interactive cleanup of old versions
crew gc

# See what would be removed
crew gc --dry-run`} />
        <div className="card bg-[var(--accent)]/5 border-[var(--accent)]/20">
          <p className="text-sm">
            <strong>Safe by Default:</strong> Garbage collection is always interactive. Coldbrew will
            never delete versions without your explicit approval.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Checking Which Version is Active</h2>
        <p className="text-[var(--foreground-muted)]">
          See which version will be used in the current directory:
        </p>
        <CodeBlock code={`# Check active version
crew which node
# /Users/you/.coldbrew/cellar/node/20.10.0/bin/node
# (from coldbrew.toml)

# See resolution details
crew which node --verbose`} />
      </section>
    </div>
  );
}
