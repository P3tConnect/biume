import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Calendar, Clock, Star, Filter, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function CompaniesListPage() {
  return (
    <div className="min-h-screen w-screen bg-white">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-b w-full">
        <div className="w-full px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Trouvez et réservez votre vétérinaire
          </h1>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-3 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Quel type de soin recherchez-vous ?"
                className="pl-9 pr-4 h-12"
              />
            </div>
            <div className="relative sm:w-[200px]">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Où ?"
                className="pl-9 pr-4 h-12"
              />
            </div>
            <Button className="h-12 px-6">
              Rechercher
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="border-b bg-white sticky top-0 z-10 w-full">
        <div className="w-full px-8">
          <div className="flex items-center justify-between py-4 gap-4 overflow-x-auto">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtres
                <ChevronDown className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                <Badge variant="secondary" className="cursor-pointer">Disponible aujourd'hui</Badge>
                <Badge variant="secondary" className="cursor-pointer">Réservation instantanée</Badge>
              </div>
            </div>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommandés</SelectItem>
                <SelectItem value="nearest">Les plus proches</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex flex-col bg-white rounded-lg border hover:shadow-md transition-shadow overflow-hidden">
              {/* Image */}
              <div className="w-full h-[200px] relative bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-200" />
                <Badge className="absolute top-3 left-3 bg-green-500">
                  Disponible aujourd'hui
                </Badge>
              </div>

              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">Cabinet Vétérinaire {index + 1}</h3>
                    <p className="text-gray-600 text-sm flex items-center gap-1 mb-2">
                      <MapPin className="h-3 w-3" /> Paris {index + 1}e arrondissement
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">4.8</span>
                      <span className="text-gray-500 text-sm">(124)</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="whitespace-nowrap">
                    À partir de 35€
                  </Badge>
                </div>

                {/* Availabilities */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Prochaines disponibilités</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                      <Clock className="h-3 w-3 mr-1" />
                      14:30
                    </Button>
                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                      <Clock className="h-3 w-3 mr-1" />
                      15:15
                    </Button>
                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                      <Clock className="h-3 w-3 mr-1" />
                      16:00
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}