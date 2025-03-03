"use client";

import { ArrowRight, MapPin, Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchInput = () => {
  const router = useRouter();
  const [profession, setProfession] = useQueryState("profession");
  const [location, setLocation] = useQueryState("location");

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (profession) searchParams.set("profession", profession);
    if (location) searchParams.set("location", location);
    router.push(`/pros?${searchParams.toString()}`);
  };

  return (
    <div className="bg-card/40 backdrop-blur-sm rounded-2xl shadow-sm border border-primary/10 p-4 max-w-4xl w-full mx-auto">
      <div className="grid md:grid-cols-3 gap-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Quel professionnel ?"
            className="w-full h-12 pl-10 pr-4 bg-background/80 placeholder:text-muted-foreground/70"
            value={profession || ""}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MapPin className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Où ?"
            className="w-full h-12 pl-10 pr-4 bg-background/80 placeholder:text-muted-foreground/70"
            value={location || ""}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <Button className="h-12 px-6 group" onClick={handleSearch}>
          Rechercher
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
