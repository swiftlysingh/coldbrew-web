"use client";

import { useState } from "react";
import { Copy, Check, Apple, Monitor } from "lucide-react";

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
        <code className="text-sm whitespace-pre-wrap">{code}</code>
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

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Installation</h1>
        <p className="text-lg text-[var(--foreground-muted)]">
          Install Coldbrew on macOS or Linux in minutes.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Requirements</h2>
        <ul className="list-disc list-inside space-y-2 text-[var(--foreground-muted)]">
          <li>macOS 11+ (Intel or Apple Silicon) or Linux (x86_64 or ARM64)</li>
          <li><code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">curl</code> for downloading</li>
          <li>A POSIX-compatible shell (bash, zsh, fish)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Install</h2>
        <p className="text-[var(--foreground-muted)]">
          The fastest way to install Coldbrew is using our install script:
        </p>
        <CodeBlock code="curl -fsSL coldbrew.sh/install | bash" />
        <p className="text-[var(--foreground-muted)]">
          This script will:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-[var(--foreground-muted)]">
          <li>Detect your operating system and architecture</li>
          <li>Download the appropriate Coldbrew binary</li>
          <li>Install it to <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">~/.coldbrew/bin</code></li>
          <li>Print instructions for setting up your shell</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Shell Setup</h2>
        <p className="text-[var(--foreground-muted)]">
          After installation, add Coldbrew to your PATH. Choose your shell:
        </p>

        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              Bash / Zsh
            </h3>
            <p className="text-sm text-[var(--foreground-muted)] mb-3">
              Add to <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">~/.bashrc</code> or <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">~/.zshrc</code>:
            </p>
            <CodeBlock code='export PATH="$HOME/.coldbrew/bin:$PATH"' />
          </div>

          <div className="card">
            <h3 className="font-semibold mb-3">Fish</h3>
            <p className="text-sm text-[var(--foreground-muted)] mb-3">
              Add to <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">~/.config/fish/config.fish</code>:
            </p>
            <CodeBlock code="fish_add_path ~/.coldbrew/bin" />
          </div>
        </div>

        <p className="text-[var(--foreground-muted)]">
          Then restart your shell or source the config file:
        </p>
        <CodeBlock code="source ~/.zshrc  # or ~/.bashrc" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Alternative: Install via Cargo</h2>
        <p className="text-[var(--foreground-muted)]">
          If you have Rust installed, you can install Coldbrew via Cargo:
        </p>
        <CodeBlock code="cargo install coldbrew" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Alternative: Build from Source</h2>
        <p className="text-[var(--foreground-muted)]">
          Clone the repository and build:
        </p>
        <CodeBlock code={`git clone https://github.com/swiftlysingh/coldbrew
cd coldbrew
cargo build --release
cp target/release/crew ~/.coldbrew/bin/`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Verify Installation</h2>
        <p className="text-[var(--foreground-muted)]">
          Check that Coldbrew is installed correctly:
        </p>
        <CodeBlock code="crew --version" />
        <p className="text-[var(--foreground-muted)]">
          Run the doctor command to check for any issues:
        </p>
        <CodeBlock code="crew doctor" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Uninstallation</h2>
        <p className="text-[var(--foreground-muted)]">
          Coldbrew installs everything to a single directory. To uninstall, simply remove it:
        </p>
        <CodeBlock code="rm -rf ~/.coldbrew" />
        <p className="text-[var(--foreground-muted)]">
          Then remove the PATH export from your shell configuration file.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Install Location</h2>
        <p className="text-[var(--foreground-muted)]">
          By default, Coldbrew installs to <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">~/.coldbrew</code>.
          You can change this by setting the <code className="px-1.5 py-0.5 rounded bg-[var(--background-secondary)]">COLDBREW_HOME</code> environment variable before installation:
        </p>
        <CodeBlock code='export COLDBREW_HOME="/opt/coldbrew"
curl -fsSL coldbrew.sh/install | bash' />
      </section>
    </div>
  );
}
