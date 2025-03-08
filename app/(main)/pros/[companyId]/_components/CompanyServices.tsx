import { Service } from "@/src/db"

interface CompanyServicesProps {
  services: Service[]
}

export function CompanyServices({ services }: CompanyServicesProps) {
  return (
    <div>
      {services.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-muted-foreground">Aucun service disponible pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(service => (
            <div
              key={service.id}
              className="p-4 rounded-xl border hover:border-primary/50 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl">💉</span>
                </div>
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {service.duration} · {service.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
