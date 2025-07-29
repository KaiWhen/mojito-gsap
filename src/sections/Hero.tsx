"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "@/plugins";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  gsap.registerPlugin(ScrollTrigger, SplitText);

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });
    const coolSplit = new SplitText("#cool", { type: "lines" });
    const cocktailLinkSplit = new SplitText("#cocktail-link", {
      type: "lines",
    });

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
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

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    let videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current!.onloadedmetadata = () => {
      videoTl.to(videoRef.current, {
        currentTime: videoRef.current?.duration,
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />

        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p id="cool">Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative and timeless recipes designed to delight your senses.
              </p>
              <a href="#cocktails" id="cocktail-link">
                View Cocktails
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        ></video>
      </div>
    </>
  );
}
