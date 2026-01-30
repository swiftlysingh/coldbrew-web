"use client";

import { useState } from "react";
import { Copy, Check, AlertTriangle } from "lucide-react";

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

export default function MigrationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Migration from Homebrew</h1>
        <p className="text-lg text-[var(--foreground-muted)]">
          Coldbrew is designed to work alongside Homebrew. Migrate at your own pace.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Coldbrew Works Alongside Homebrew</h2>
        <p className="text-[var(--foreground-muted)]">
          You don&apos;t need to uninstall Homebrew to use Coldbrew. Both can coexist on the same system.
          Just make sure Coldbrew&apos;s bin directory comes first in your PATH:
        </p>
        <CodeBlock code='export PATH="$HOME/.coldbrew/bin:$PATH"  # Coldbrew first' />
        <p className="text-[var(--foreground-muted)]">
          This way, packages installed with Coldbrew take precedence, but Homebrew packages are still available as a fallback.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Command Comparison</h2>
        <p className="text-[var(--foreground-muted)]">
          Most commands work the same way. Here&apos;s a quick reference:
        </p>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--card-border)]">
                <th className="text-left py-2 pr-4">Homebrew</th>
                <th className="text-left py-2">Coldbrew</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono">brew install node</td>
                <td className="py-2 font-mono text-[var(--accent)]">crew install node</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono">brew uninstall node</td>
                <td className="py-2 font-mono text-[var(--accent)]">crew uninstall node</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono">brew update</td>
                <td className="py-2 font-mono text-[var(--accent)]">crew update</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono">brew upgrade</td>
                <td className="py-2 font-mono text-[var(--accent)]">crew upgrade</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono">brew search node</td>
                <td className="py-2 font-mono text-[var(--accent)]">crew search node</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono">brew info node</td>
                <td className="py-2 font-mono text-[var(--accent)]">crew info node</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono">brew list</td>
                <td className="py-2 font-mono text-[var(--accent)]">crew list</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 pr-4 font-mono">brew tap user/repo</td>
                <td className="py-2 font-mono text-[var(--accent)]">crew tap user/repo</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono">brew cleanup</td>
                <td className="py-2 font-mono text-[var(--accent)]">crew gc</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Key Differences</h2>

        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-2">No Auto-Updates</h3>
            <p className="text-[var(--foreground-muted)] text-sm">
              Homebrew may auto-update when you run <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">brew install</code>.
              Coldbrew never does this. <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">crew install</code> only installs.
              Run <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">crew update</code> explicitly when you want to refresh the index.
            </p>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-2">Interactive Upgrades</h3>
            <p className="text-[var(--foreground-muted)] text-sm">
              <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">crew upgrade</code> shows you a plan and asks for confirmation.
              No more surprise dependency cascades. Use <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">--yes</code> for CI environments.
            </p>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-2">User Space Installation</h3>
            <p className="text-[var(--foreground-muted)] text-sm">
              Homebrew installs to <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">/opt/homebrew</code> or <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">/usr/local</code> (may require sudo).
              Coldbrew always installs to <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">~/.coldbrew</code>. No sudo ever.
            </p>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-2">Multiple Versions</h3>
            <p className="text-[var(--foreground-muted)] text-sm">
              Homebrew only keeps one version per package.
              Coldbrew lets you install <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">node@18</code>, <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">node@20</code>, and <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">node@22</code> side-by-side.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Migration Steps</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">1. Install Coldbrew</h3>
            <CodeBlock code="curl -fsSL coldbrew.sh/install | bash" />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">2. Set Up Your PATH</h3>
            <p className="text-[var(--foreground-muted)] mb-2">
              Add Coldbrew to your PATH <em>before</em> Homebrew:
            </p>
            <CodeBlock code='# In ~/.zshrc or ~/.bashrc
export PATH="$HOME/.coldbrew/bin:$PATH"' />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">3. Reinstall Key Packages</h3>
            <p className="text-[var(--foreground-muted)] mb-2">
              Start with packages you use most often:
            </p>
            <CodeBlock code={`crew update
crew install node python go rust`} />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">4. Migrate Project by Project</h3>
            <p className="text-[var(--foreground-muted)] mb-2">
              For each project, create a <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">coldbrew.toml</code>:
            </p>
            <CodeBlock code={`cd my-project
crew init
# Edit coldbrew.toml to add your dependencies
crew lock`} />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">5. Optional: Remove Homebrew Duplicates</h3>
            <p className="text-[var(--foreground-muted)] mb-2">
              Once you&apos;re comfortable, you can remove packages from Homebrew:
            </p>
            <CodeBlock code="brew uninstall node python go" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="card border-yellow-500/30 bg-yellow-500/5">
          <div className="flex gap-3">
            <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold mb-2">Packages That May Need Homebrew</h3>
              <p className="text-[var(--foreground-muted)] text-sm">
                Some packages with complex post-install hooks or system integrations may work better with Homebrew.
                Coldbrew focuses on development tools with straightforward installs. For packages like
                database servers or system daemons, you may want to keep using Homebrew.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Rollback</h2>
        <p className="text-[var(--foreground-muted)]">
          If you need to go back to Homebrew, simply remove Coldbrew&apos;s PATH entry and optionally delete the directory:
        </p>
        <CodeBlock code={`# Remove from ~/.zshrc
# export PATH="$HOME/.coldbrew/bin:$PATH"

# Optional: delete Coldbrew
rm -rf ~/.coldbrew`} />
      </section>
    </div>
  );
}
