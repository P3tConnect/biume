interface TimeColumnProps {
  hours: number[]
  formatHour: (hour: number) => string
}

export function TimeColumn({ hours, formatHour }: TimeColumnProps) {
  return (
    <div className="w-20 flex-shrink-0 border-r border-border">
      <div className="h-12 border-b border-border bg-background" />
      {hours.map(hour => (
        <div key={hour} className="h-20 border-b border-border px-2 py-1 text-sm font-medium">
          <span className="text-muted-foreground">{formatHour(hour)}</span>
        </div>
      ))}
    </div>
  )
}
