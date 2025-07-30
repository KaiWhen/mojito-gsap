"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "@/plugins";
import Cocktails from "@/sections/Cocktails";
import About from "@/sections/About";
import Art from "@/sections/Art";

export default function Home() {
  // Initialize a new Lenis instance for smooth scrolling
  if (typeof window !== "undefined") {
    const lenis = new Lenis();

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
  }

  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktails />
      <About />
      <Art />
    </main>
  );
}
