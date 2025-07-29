import { ScrollTrigger, SplitText } from "gsap/all";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  return (
    <div className="flex-center h-[100vh]">
      <h1 className="text-3xl">Hello World!</h1>
    </div>
  )
}