interface Option {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface CompanyOptionsProps {
  options: Option[];
}

export function CompanyOptions({ options }: CompanyOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option) => (
        <div
          key={option.id}
          className="p-4 rounded-xl border hover:border-primary/50 cursor-pointer transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl">{option.icon}</span>
            </div>
            <div>
              <p className="font-medium">{option.name}</p>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 