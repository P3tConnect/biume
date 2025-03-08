"use client"

import { MapPin, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "@/src/hooks/use-search-params"

export function HeroSection() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { search, location } = useSearchParams()

  const handleSearch = () => {
    startTransition(() => {
      router.push(`/pros?search=${search.value}&location=${location.value}`)
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="relative w-full border-b border-border overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(110deg,var(--primary)_0%,transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_30%,var(--accent)_150%)]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute h-[500px] w-[500px] rounded-full bg-primary/30 blur-3xl -top-48 -left-48" />
        <div className="absolute h-[400px] w-[400px] rounded-full bg-secondary/20 blur-3xl -bottom-48 right-0" />
      </div>
      <div className="relative w-full px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-center">
          Trouvez et réservez avec le professionnel qui vous correspond
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Prenez rendez-vous en quelques clics avec les meilleurs professionnels du secteur
        </p>

        <div className="max-w-3xl mx-auto bg-card/95 backdrop-blur-md rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Quel type de soin recherchez-vous ?"
              className="pl-9 pr-4 h-12"
              value={search.value}
              onChange={e => search.set(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="relative sm:w-[200px]">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Où ?"
              className="pl-9 pr-4 h-12"
              value={location.value}
              onChange={e => location.set(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button className="h-12 px-6 custom-button" onClick={handleSearch} disabled={isPending}>
            {isPending ? "Recherche..." : "Rechercher"}
          </Button>
        </div>
      </div>
    </div>
  )
}
