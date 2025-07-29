"use client";

import { navLinks } from "@/constants";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/plugins";
import gsap from "gsap";

export default function Navbar() {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });

    navTween.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backgroundFilter: "blur(10px)",
        duration: 1,
        ease: `power1.inOut`,
      }
    );
  }, []);

  return (
    <nav>
      <div>
        <a href="#home" className="flex items-center gap-2">
          <Image src={"/images/logo.png"} alt="Logo" width={30} height={30} />
          <p>Velvet Pour</p>
        </a>

        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
