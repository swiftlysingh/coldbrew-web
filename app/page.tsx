import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Benchmarks } from "@/components/Benchmarks";
import { Principles } from "@/components/Principles";
import { Features } from "@/components/Features";
import { Comparison } from "@/components/Comparison";
import { QuickStart } from "@/components/QuickStart";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Benchmarks />
      <Principles />
      <Features />
      <Comparison />
      <QuickStart />
      <Footer />
    </main>
  );
}
