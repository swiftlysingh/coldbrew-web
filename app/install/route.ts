import { NextResponse } from "next/server";

const installScript = `#!/bin/bash
# Coldbrew installer
# https://coldbrew.sh

set -e

COLDBREW_HOME="\${COLDBREW_HOME:-\$HOME/.coldbrew}"
COLDBREW_BIN="\$COLDBREW_HOME/bin"
GITHUB_REPO="swiftlysingh/coldbrew"

# Colors
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

info() {
    printf "\${BLUE}==>\${NC} %s\\n" "$1"
}

success() {
    printf "\${GREEN}==>\${NC} %s\\n" "$1"
}

warn() {
    printf "\${YELLOW}Warning:\${NC} %s\\n" "$1"
}

error() {
    printf "\${RED}Error:\${NC} %s\\n" "$1" >&2
    exit 1
}

# Detect OS and architecture
detect_platform() {
    local os arch

    case "$(uname -s)" in
        Linux*)  os="linux" ;;
        Darwin*) os="darwin" ;;
        *)       error "Unsupported operating system: $(uname -s)" ;;
    esac

    case "$(uname -m)" in
        x86_64)  arch="x86_64" ;;
        amd64)   arch="x86_64" ;;
        arm64)   arch="aarch64" ;;
        aarch64) arch="aarch64" ;;
        *)       error "Unsupported architecture: $(uname -m)" ;;
    esac

    echo "\${os}-\${arch}"
}

# Get latest release version from GitHub
get_latest_version() {
    curl -fsSL "https://api.github.com/repos/\$GITHUB_REPO/releases/latest" | \\
        grep '"tag_name":' | \\
        sed -E 's/.*"([^"]+)".*/\\1/'
}

# Download and install Coldbrew
install_coldbrew() {
    local platform version download_url tmp_dir

    info "Detecting platform..."
    platform="$(detect_platform)"
    success "Platform: \$platform"

    info "Fetching latest version..."
    version="$(get_latest_version)"
    if [ -z "\$version" ]; then
        error "Failed to fetch latest version"
    fi
    success "Version: \$version"

    download_url="https://github.com/\$GITHUB_REPO/releases/download/\$version/coldbrew-\$platform.tar.gz"

    info "Downloading Coldbrew..."
    tmp_dir="$(mktemp -d)"
    trap 'rm -rf "\$tmp_dir"' EXIT

    if ! curl -fsSL "\$download_url" -o "\$tmp_dir/coldbrew.tar.gz"; then
        error "Failed to download Coldbrew from \$download_url"
    fi

    info "Installing to \$COLDBREW_HOME..."
    mkdir -p "\$COLDBREW_BIN"
    tar -xzf "\$tmp_dir/coldbrew.tar.gz" -C "\$COLDBREW_BIN"
    chmod +x "\$COLDBREW_BIN/crew"

    success "Coldbrew installed successfully!"
}

# Print shell setup instructions
print_setup_instructions() {
    local shell_name shell_rc

    shell_name="$(basename "\$SHELL")"

    case "\$shell_name" in
        bash) shell_rc="\$HOME/.bashrc" ;;
        zsh)  shell_rc="\$HOME/.zshrc" ;;
        fish) shell_rc="\$HOME/.config/fish/config.fish" ;;
        *)    shell_rc="\$HOME/.profile" ;;
    esac

    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    success "Coldbrew is ready!"
    echo ""
    echo "Add Coldbrew to your PATH by adding this to \$shell_rc:"
    echo ""

    if [ "\$shell_name" = "fish" ]; then
        printf "  \${YELLOW}fish_add_path ~/.coldbrew/bin\${NC}\\n"
    else
        printf "  \${YELLOW}export PATH=\"\\\$HOME/.coldbrew/bin:\\\$PATH\"\${NC}\\n"
    fi

    echo ""
    echo "Then restart your shell or run:"
    echo ""

    if [ "\$shell_name" = "fish" ]; then
        printf "  \${YELLOW}source ~/.config/fish/config.fish\${NC}\\n"
    else
        printf "  \${YELLOW}source \$shell_rc\${NC}\\n"
    fi

    echo ""
    echo "Get started:"
    echo ""
    printf "  \${BLUE}crew update\${NC}      # Update the package index\\n"
    printf "  \${BLUE}crew install node\${NC} # Install a package\\n"
    printf "  \${BLUE}crew --help\${NC}      # See all commands\\n"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
}

# Main
main() {
    echo ""
    echo "  ☕ Coldbrew Installer"
    echo "  Smooth. Fast. Reproducible."
    echo ""

    install_coldbrew
    print_setup_instructions
}

main
`;

export async function GET() {
  return new NextResponse(installScript, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
