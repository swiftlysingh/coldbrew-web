import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coldbrew - Fast, Reproducible Package Manager",
  description: "A Homebrew-compatible package manager in Rust. User-controlled, fast, and reproducible. No auto-updates, no sudo, no surprises.",
  keywords: ["package manager", "homebrew", "brew", "macos", "linux", "rust", "cli"],
  authors: [{ name: "Coldbrew" }],
  openGraph: {
    title: "Coldbrew - Fast, Reproducible Package Manager",
    description: "A Homebrew-compatible package manager in Rust. User-controlled, fast, and reproducible.",
    type: "website",
    url: "https://coldbrew.sh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coldbrew - Fast, Reproducible Package Manager",
    description: "A Homebrew-compatible package manager in Rust. User-controlled, fast, and reproducible.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
