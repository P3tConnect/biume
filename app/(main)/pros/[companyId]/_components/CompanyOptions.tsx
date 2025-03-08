import { Option } from "@/src/db"

interface CompanyOptionsProps {
  options: Option[]
}

export function CompanyOptions({ options }: CompanyOptionsProps) {
  return (
    <>
      {options.length === 0 ? (
        <div className="p-4 rounded-xl border text-center">
          <p className="text-muted-foreground">Aucune option disponible pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map(option => (
            <div
              key={option.id}
              className="p-4 rounded-xl border hover:border-primary/50 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl">💉</span>
                </div>
                <div>
                  <p className="font-medium">{option.title}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
