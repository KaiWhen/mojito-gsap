"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "@/plugins";
import { useLayoutEffect } from "react";

export default function useScrollSmooth() {
  useGSAP(() => {
    if (typeof window === "undefined") return;
    // Register plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    // Create ScrollSmoother instance
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: false,
      ignoreMobileResize: true,
    });

    return () => {
      // Clean up on unmount
      smoother.kill();
    };
  }, []);
}
