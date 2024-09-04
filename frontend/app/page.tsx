import { Appbar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";

export default function Home() {
  return (
    <main className="">
    <Appbar/>
    <Hero/>
    <div className=" flex justify-center">
      
    <HeroVideo/>
    </div>
    </main>
  );
}
