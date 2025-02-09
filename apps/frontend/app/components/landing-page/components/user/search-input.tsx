import { ArrowRight, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchInput = () => {

  const handleSearch = () => {
    // const searchParams = new URLSearchParams();
    // if (profession) searchParams.set("profession", profession);
    // if (location) searchParams.set("location", location);
    // router.push(`/companies?${searchParams.toString()}`);
  };

  return (
    <div className="bg-background rounded-2xl shadow-xl border p-4 md:p-6 max-w-4xl mx-auto mb-12">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Quel professionnel ?"
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-background"
          // value={profession || ""}
          // onChange={(e) => setProfession(e.target.value)}
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Où ?"
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-background"
          // value={location || ""}
          // onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <Button className="w-full h-12 text-base" onClick={handleSearch}>
          Rechercher
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}

export default SearchInput