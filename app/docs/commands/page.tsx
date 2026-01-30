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
    <div className="relative group my-2">
      <div className="code-block pr-12 py-2">
        <code className="text-sm">{code}</code>
      </div>
      <button
        onClick={handleCopy}
        className="copy-btn !top-1/2 !-translate-y-1/2"
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

interface Command {
  name: string;
  description: string;
  usage: string;
  examples?: string[];
}

const commands: Command[] = [
  {
    name: "update",
    description: "Update the package index from Homebrew. Does not upgrade any packages.",
    usage: "crew update",
  },
  {
    name: "search",
    description: "Search for packages by name or description.",
    usage: "crew search <query>",
    examples: ["crew search node", "crew search python"],
  },
  {
    name: "info",
    description: "Show detailed information about a package.",
    usage: "crew info <package>",
    examples: ["crew info node", "crew info python@3.12"],
  },
  {
    name: "install",
    description: "Install one or more packages. Use @version to specify a version.",
    usage: "crew install <packages...>",
    examples: ["crew install node", "crew install node@20 python@3.12", "crew install rust --default"],
  },
  {
    name: "uninstall",
    description: "Uninstall packages. Use @version to uninstall a specific version.",
    usage: "crew uninstall <packages...>",
    examples: ["crew uninstall node", "crew uninstall node@18"],
  },
  {
    name: "upgrade",
    description: "Upgrade packages to their latest versions. Interactive by default.",
    usage: "crew upgrade [packages...]",
    examples: ["crew upgrade", "crew upgrade node", "crew upgrade --yes"],
  },
  {
    name: "list",
    description: "List all installed packages and their versions.",
    usage: "crew list",
  },
  {
    name: "which",
    description: "Show which package provides a binary.",
    usage: "crew which <binary>",
    examples: ["crew which node", "crew which python3"],
  },
  {
    name: "pin",
    description: "Pin a package to prevent it from being upgraded.",
    usage: "crew pin <package>",
    examples: ["crew pin node@20"],
  },
  {
    name: "unpin",
    description: "Unpin a package to allow upgrades.",
    usage: "crew unpin <package>",
    examples: ["crew unpin node"],
  },
  {
    name: "default",
    description: "Set or show the default version for a package.",
    usage: "crew default <package[@version]>",
    examples: ["crew default node", "crew default node@20"],
  },
  {
    name: "deps",
    description: "Show the dependency tree for a package.",
    usage: "crew deps <package>",
    examples: ["crew deps node"],
  },
  {
    name: "dependents",
    description: "Show packages that depend on a package.",
    usage: "crew dependents <package>",
    examples: ["crew dependents openssl"],
  },
  {
    name: "init",
    description: "Create a coldbrew.toml configuration file in the current directory.",
    usage: "crew init",
  },
  {
    name: "lock",
    description: "Generate a coldbrew.lock file from coldbrew.toml.",
    usage: "crew lock",
  },
  {
    name: "tap",
    description: "Add or manage third-party package repositories.",
    usage: "crew tap [user/repo]",
    examples: ["crew tap", "crew tap homebrew/cask", "crew tap --remove homebrew/cask"],
  },
  {
    name: "cache",
    description: "Manage the download cache.",
    usage: "crew cache [list|clean|info]",
    examples: ["crew cache list", "crew cache clean", "crew cache info"],
  },
  {
    name: "gc",
    description: "Garbage collection - remove old package versions. Interactive by default.",
    usage: "crew gc",
    examples: ["crew gc", "crew gc --yes", "crew gc --dry-run"],
  },
  {
    name: "link",
    description: "Link a keg-only package to make it available system-wide.",
    usage: "crew link <package>",
    examples: ["crew link openssl"],
  },
  {
    name: "unlink",
    description: "Unlink a previously linked package.",
    usage: "crew unlink <package>",
    examples: ["crew unlink openssl"],
  },
  {
    name: "shell",
    description: "Set up shell integration and completions.",
    usage: "crew shell",
  },
  {
    name: "doctor",
    description: "Check the system for potential problems.",
    usage: "crew doctor",
  },
  {
    name: "completions",
    description: "Generate shell completions.",
    usage: "crew completions <shell>",
    examples: ["crew completions bash", "crew completions zsh", "crew completions fish"],
  },
];

export default function CommandsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Command Reference</h1>
        <p className="text-lg text-[var(--foreground-muted)]">
          Complete reference for all Coldbrew CLI commands.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Global Options</h2>
        <div className="card">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 font-mono text-[var(--accent)]">--help, -h</td>
                <td className="py-2 text-[var(--foreground-muted)]">Show help for any command</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 font-mono text-[var(--accent)]">--version, -V</td>
                <td className="py-2 text-[var(--foreground-muted)]">Show Coldbrew version</td>
              </tr>
              <tr className="border-b border-[var(--card-border)]">
                <td className="py-2 font-mono text-[var(--accent)]">--quiet, -q</td>
                <td className="py-2 text-[var(--foreground-muted)]">Suppress non-essential output</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-[var(--accent)]">--verbose, -v</td>
                <td className="py-2 text-[var(--foreground-muted)]">Show detailed output</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Commands</h2>

        {commands.map((cmd) => (
          <div key={cmd.name} className="card" id={cmd.name}>
            <h3 className="text-xl font-semibold mb-2 font-mono text-[var(--accent)]">
              crew {cmd.name}
            </h3>
            <p className="text-[var(--foreground-muted)] mb-4">{cmd.description}</p>

            <div className="space-y-2">
              <p className="text-sm font-medium">Usage:</p>
              <CodeBlock code={cmd.usage} />
            </div>

            {cmd.examples && cmd.examples.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Examples:</p>
                {cmd.examples.map((example, i) => (
                  <CodeBlock key={i} code={example} />
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
