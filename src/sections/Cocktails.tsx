import { cocktailLists, mockTailLists } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

export default function Cocktails() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useGSAP(() => {
    if (!isMobile) {
      const parallaxTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#cocktails",
          start: "top 50%", // More conservative start
          end: "bottom 70%", // More conservative end
          scrub: 1,
          refreshPriority: -1, // Lower priority than hero animations
        },
      });

      // Set initial positions to avoid jumps
      gsap.set("#c-left-leaf", { x: -100, y: 100 });
      gsap.set("#c-right-leaf", { x: 100, y: 100 });

      parallaxTimeline
        .to("#c-left-leaf", {
          x: 0,
          y: 0,
          ease: "none",
        })
        .to(
          "#c-right-leaf",
          {
            x: 0,
            y: 0,
            ease: "none",
          },
          0
        ); // Start at same time
    } else {
      // On mobile, just set leaves to final position
      gsap.set("#c-left-leaf", { x: 0, y: 0 });
      gsap.set("#c-right-leaf", { x: 0, y: 0 });
    }
  }, [isMobile]);

  return (
    <section id="cocktails" className="noisy">
      <Image
        src="/images/cocktail-left-leaf.png"
        alt="l-leaf"
        id="c-left-leaf"
        width={600}
        height={600}
      />
      <Image
        src="/images/cocktail-right-leaf.png"
        alt="r-leaf"
        id="c-right-leaf"
        width={600}
        height={600}
      />

      <div className="list">
        <div className="popular">
          <h2>Most popular cocktails:</h2>

          <ul>
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}{" "}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2>Most popular mocktails:</h2>

          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}{" "}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
