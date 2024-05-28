import { BackgroundBeams } from "@/components/background-beams";
import ShimmerButton from "@/components/shimmer-button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Rejoignez la liste d&apos;attente
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Bienvenue sur PawThera, l&apos;application qui fait gagner du temps aux indépendants du secteur animalier
        </p>
        <div className="flex flex-col items-center gap-5">
          <Input
            type="email"
            placeholder="john.doe@icloud.com"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4 text-white bg-neutral-950 placeholder:text-neutral-700"
          />
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Je m&apos;inscrit
            </span>
          </ShimmerButton>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
