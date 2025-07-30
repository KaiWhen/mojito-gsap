"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "@/plugins";
import { useMediaQuery } from "react-responsive";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import "./styles.css";
import useVideoPreload from "@/hooks/useVideoPreload";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  gsap.registerPlugin(ScrollTrigger, SplitText);

  const videoLoaded = useVideoPreload(videoRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const titleSplit = new SplitText(".title", { type: "chars, words" });
        const paragraphSplit = new SplitText(".subtitle", { type: "lines" });
        const coolSplit = new SplitText("#cool", { type: "lines" });
        const cocktailLinkSplit = new SplitText("#cocktail-link", {
          type: "lines",
        });

        gsap.set(".title", { visibility: "visible" });
        gsap.set(".subtitle", { visibility: "visible" });
        gsap.set("#cool", { visibility: "visible" });
        gsap.set("#cocktail-link", { visibility: "visible" });

        gsap.from(titleSplit.chars, {
          yPercent: 100,
          duration: 1.8,
          ease: "expo.out",
          stagger: 0.06,
          autoAlpha: 0,
          delay: 0.3,
        });

        gsap.from(paragraphSplit.lines, {
          yPercent: 100,
          opacity: 0,
          duration: 1.8,
          ease: "expo.out",
          stagger: 0.06,
          delay: 1,
        });

        gsap.from(coolSplit.lines, {
          yPercent: 100,
          opacity: 0,
          duration: 1.8,
          ease: "expo.out",
          delay: 1,
        });

        gsap.from(cocktailLinkSplit.lines, {
          yPercent: 100,
          opacity: 0,
          duration: 1.8,
          ease: "expo.out",
          delay: 1,
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
          .to(".right-leaf", { y: 200 }, 0)
          .to(".left-leaf", { y: -200 }, 0);

        // Only create video timeline when video is loaded
        if (videoLoaded && videoRef.current) {
          const startValue = isMobile ? "top 50%" : "center 60%";
          const endValue = isMobile ? "120% top" : "bottom top";

          const videoTl = gsap.timeline({
            scrollTrigger: {
              trigger: "video",
              start: startValue,
              end: endValue,
              scrub: true,
              pin: true,
            },
          });

          const video = videoRef.current;
          const duration = video.duration;

          if (duration && !isNaN(duration)) {
            videoTl.to(video, {
              currentTime: duration,
            });
          }
        }
      });
    });
  }, [videoLoaded, isMobile]); // Re-run when video loads

  return (
    <>
      <section id="hero" className="noisy">
        <noscript>
          <style>{`
          .title,
          .subtitle,
          #cool,
          #cocktail-link {
            visibility: visible !important;
          }
        `}</style>
        </noscript>
        <h1 className="title" style={{ visibility: "hidden" }}>
          MOJITO
        </h1>

        <Image
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
          width={600}
          height={600}
          loading="eager"
          priority
        />

        <Image
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
          width={600}
          height={600}
          loading="eager"
          priority
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p id="cool" style={{ visibility: "hidden" }}>
                Cool. Crisp. Classic.
              </p>
              <p className="subtitle" style={{ visibility: "hidden" }}>
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle" style={{ visibility: "hidden" }}>
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a
                href="#cocktails"
                id="cocktail-link"
                style={{ visibility: "hidden" }}
              >
                View Cocktails
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0 max-md:hidden">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
          poster="/videos/output.png"
        />
      </div>

      <div className="md:hidden absolute inset-0">
        <video
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
          poster="/videos/output.png"
          autoPlay
          loop
        />
      </div>
    </>
  );
}
