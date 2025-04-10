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
                    {service.duration} min · {service.price} €
                  </p>
                  <div className="flex flex-col gap-1 mt-1">
                    <p className="text-xs text-muted-foreground">
                      {service.type === "MULTIPLE"
                        ? `Séance collective (${service.places} places)`
                        : "Séance individuelle"}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {service.atHome ? (
                        <>
                          <span>🏠</span>
                          <span>Service à domicile</span>
                        </>
                      ) : (
                        <>
                          <span>🏥</span>
                          <span>Service en cabinet</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
