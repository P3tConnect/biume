"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd"
import React, { useState } from "react"
import { addDays, differenceInMinutes, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns"
import { getDaysInMonth, getFirstDayOfMonth } from "@/src/lib/dateUtils"

import { Button } from "@/components/ui/button"
import { DayEvents } from "@/src/lib/schemas"
import { cn } from "@/src/lib/utils"
import { useSidebar } from "@/components/ui/sidebar"
import { ViewMode } from "@/src/types/view-mode"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

const eventColors = {
  work: "bg-blue-500 text-white",
  personal: "bg-green-500 text-white",
  other: "bg-gray-500 text-white",
  education: "bg-yellow-500 text-black",
  hobbies: "bg-purple-500 text-white",
  health: "bg-red-500 text-white",
  finance: "bg-yellow-400 text-black",
}

interface CalendarClientProps {
  selectedDate: Date
  onDayClick: (date: Date) => void
  onEventDrop: (result: DropResult) => void
  events: DayEvents
  className?: string
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

const CalendarClient = ({
  selectedDate,
  onDayClick,
  onEventDrop,
  events,
  className,
  viewMode,
  onViewModeChange,
}: CalendarClientProps) => {
  const { isMobile, state: sidebarState } = useSidebar()
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)

  const handlePrevMonth = () => {
    if (viewMode === "week") {
      setCurrentDate(prevDate => addDays(prevDate, -7))
    } else {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))
    }
  }

  const handleNextMonth = () => {
    if (viewMode === "week") {
      setCurrentDate(prevDate => addDays(prevDate, 7))
    } else {
      setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))
    }
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const isToday = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date.toDateString() === new Date().toDateString()
  }

  const isSelectedDay = (date: Date) => {
    if (!selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const isSelected = (day: number) => {
    if (!selectedDate || day === 0) return false
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date.toDateString() === selectedDate.toDateString()
  }

  const isWeekend = (dayIndex: number) => {
    return dayIndex === 0 || dayIndex === 6
  }

  const renderEvents = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dateString = date.toDateString()
    const dayEvents = events[dateString] || []

    return dayEvents.map((event, index) => (
      <Draggable key={event.id} draggableId={event.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={cn(
              "text-xs truncate rounded-lg px-2 py-1 mb-1",
              eventColors[event.category],
              "transition-all duration-200",
              "hover:ring-2 hover:ring-secondary/20",
              snapshot.isDragging && "ring-2 ring-secondary opacity-70 rotate-2 scale-105"
            )}
          >
            {event.title}
          </div>
        )}
      </Draggable>
    ))
  }

  const renderWeekEvents = (date: Date) => {
    const dateString = date.toDateString()
    const dayEvents = events[dateString] || []

    return dayEvents.map((event, index) => (
      <Draggable key={event.id} draggableId={event.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={cn(
              "text-xs truncate rounded-lg px-2 py-1 mb-1",
              eventColors[event.category],
              "transition-all duration-200",
              "hover:ring-2 hover:ring-secondary/20",
              snapshot.isDragging && "ring-2 ring-secondary opacity-70 rotate-2 scale-105"
            )}
          >
            {event.title}
          </div>
        )}
      </Draggable>
    ))
  }

  const getWeeksInMonth = () => {
    const weeks: number[][] = []
    let currentWeek: number[] = []

    // Fill empty days at the start
    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(0)
    }

    // Fill days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day)

      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }

    // Fill empty days at the end
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(0)
      }
      weeks.push(currentWeek)
    }

    return weeks
  }

  // Obtenez les jours de la semaine courante
  const getWeekDays = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }) // Commence le lundi
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 }) // Termine le dimanche
    return eachDayOfInterval({ start: weekStart, end: weekEnd })
  }

  // Rendu de la vue mensuelle
  const renderMonthView = () => {
    return (
      <div className="flex-1 overflow-auto p-4">
        <div className={cn("grid grid-cols-7 gap-2 mb-2", sidebarState === "expanded" ? "text-xs" : "text-sm")}>
          {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map(day => (
            <div
              key={day}
              className={cn(
                "text-center font-medium p-1",
                day === "Dim" || day === "Sam" ? "text-red-500" : "text-gray-600 dark:text-gray-300"
              )}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {getWeeksInMonth().map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-2">
              {week.map((day, dayIndex) => (
                <Droppable
                  key={`${weekIndex}-${dayIndex}`}
                  droppableId={
                    day === 0
                      ? `empty-${weekIndex}-${dayIndex}`
                      : new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()
                  }
                  isDropDisabled={day === 0}
                  isCombineEnabled
                  ignoreContainerClipping
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "relative overflow-y-auto p-1.5 md:p-2 transition-all duration-200 ease-in-out",
                        "min-h-[160px] md:min-h-[180px]",
                        day === 0
                          ? "invisible"
                          : cn(
                              "rounded-xl border-[1.5px] border-border/60 hover:border-border",
                              "dark:border-gray-700 dark:hover:border-gray-600",
                              "[&:has(>div)]:hover:ring-2 [&:has(>div)]:hover:ring-secondary/20",
                              isToday(day) && "bg-primary/5 ring-2 ring-primary border-primary/50",
                              isSelected(day) && "bg-secondary/5 ring-2 ring-secondary border-secondary/50",
                              isWeekend(dayIndex) &&
                                "bg-muted/80 border-muted/80 dark:bg-muted/60 dark:border-muted/60",
                              snapshot.isDraggingOver && "bg-secondary/20 ring-2 ring-secondary border-secondary/50",
                              "backdrop-blur-[2px]",
                              "group cursor-pointer shadow-sm"
                            )
                      )}
                      onClick={() => {
                        if (day !== 0) {
                          onDayClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
                        }
                      }}
                    >
                      {day !== 0 && (
                        <>
                          <div
                            className={cn(
                              "text-base font-semibold",
                              "group-hover:text-secondary",
                              isToday(day) && "text-primary",
                              isSelected(day) && "text-secondary",
                              isWeekend(dayIndex) && "text-foreground/70"
                            )}
                          >
                            {day}
                          </div>
                          {renderEvents(day)}
                        </>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Rendu de la vue semaine
  const renderWeekView = () => {
    const weekDays = getWeekDays()
    const HOURS = Array.from({ length: 14 }, (_, i) => i + 8) // 8h à 21h

    return (
      <div className="flex-1 overflow-hidden">
        <div className="min-w-[800px]">
          {/* En-tête des jours */}
          <div className="grid grid-cols-[50px_repeat(7,1fr)] border-b border-border/60 sticky top-0 bg-background z-10">
            <div className="p-2 border-r border-border/60"></div>
            {weekDays.map((day, i) => (
              <div
                key={i}
                className={cn(
                  "p-2 text-center border-r border-border/60 sticky top-0",
                  (i === 0 || i === 6) && "bg-muted/50",
                  isSelectedDay(day) && "bg-secondary/10"
                )}
                onClick={() => onDayClick(day)}
              >
                <div className="font-medium text-sm">{day.toLocaleDateString("fr-FR", { weekday: "short" })}</div>
                <div
                  className={cn(
                    "text-base font-bold",
                    day.toDateString() === new Date().toDateString() &&
                      "text-primary rounded-full w-8 h-8 flex items-center justify-center bg-primary/10 mx-auto"
                  )}
                >
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Grille des heures */}
          <div className="grid grid-cols-[50px_repeat(7,1fr)]">
            {/* Colonne des heures */}
            <div className="sticky left-0 z-10">
              {HOURS.map(hour => (
                <div
                  key={hour}
                  className="h-16 border-b border-r border-border/40 flex items-center justify-center bg-card p-2"
                >
                  <div className="text-xs text-muted-foreground">{hour}:00</div>
                </div>
              ))}
            </div>

            {/* Colonnes des jours */}
            {weekDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={cn(
                  "relative",
                  (dayIndex === 0 || dayIndex === 6) && "bg-muted/30",
                  isSelectedDay(day) && "bg-secondary/5"
                )}
              >
                {HOURS.map(hour => (
                  <div
                    key={hour}
                    className="h-16 border-b border-r border-border/40 relative"
                    onClick={() => onDayClick(day)}
                  ></div>
                ))}

                <Droppable droppableId={day.toDateString()} isCombineEnabled ignoreContainerClipping>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="absolute inset-0 p-1">
                      {renderWeekEvents(day)}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("h-full w-full", className)}>
      <div className={cn("flex justify-between items-center px-2 py-3", isMobile ? "flex-col gap-3" : "flex-row")}>
        <h2 className={cn("font-bold text-gray-800 dark:text-white", isMobile ? "text-lg" : "text-xl md:text-2xl")}>
          {viewMode === "week"
            ? `Semaine du ${getWeekDays()[0].toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}`
            : currentDate
                .toLocaleString("fr-FR", {
                  month: "long",
                  year: "numeric",
                })
                .toLocaleUpperCase()}
        </h2>
      </div>

      <DragDropContext onDragEnd={onEventDrop}>
        {viewMode === "month" ? renderMonthView() : renderWeekView()}
      </DragDropContext>
    </div>
  )
}

export default CalendarClient
