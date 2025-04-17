interface TimeColumnProps {
  hours: number[]
  formatHour: (hour: number) => string
}

export function TimeColumn({ hours, formatHour }: TimeColumnProps) {
  return (
    <div className="w-14 flex-shrink-0 bg-card/80 backdrop-blur-sm">
      <div className="h-12" />
      <div className="relative">
        {hours.map(hour => {
          const [h, m] = formatHour(hour).split(":")
          return (
            <div key={hour} className="relative h-20">
              <div className="absolute -right-[1px] inset-y-0 w-[1px] bg-border" />
              <div className="absolute right-3 -top-2.5">
                <span className="text-lg font-bold tracking-tight text-primary/80">{h}</span>
                <span className="text-[10px] font-semibold text-primary/40 ml-0.5">h</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
