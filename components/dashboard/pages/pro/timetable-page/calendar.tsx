"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Event, DayEvents } from "@/src/lib/schemas";
import { cn } from "@/src/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { getDaysInMonth, getFirstDayOfMonth } from "@/src/lib/dateUtils";

const eventColors = {
  work: "bg-blue-500 text-white",
  personal: "bg-green-500 text-white",
  other: "bg-gray-500 text-white",
  education: "bg-yellow-500 text-black",
  hobbies: "bg-purple-500 text-white",
  health: "bg-red-500 text-white",
  finance: "bg-yellow-400 text-black",
};

interface CalendarProps {
  selectedDate: Date;
  onDayClick: (date: Date) => void;
  onEventDrop: (result: DropResult) => void;
  events: DayEvents;
}

const Calendar = ({
  selectedDate,
  onDayClick,
  onEventDrop,
  events,
}: CalendarProps) => {
  const { isMobile, state: sidebarState } = useSidebar();
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1),
    );
  };

  const isToday = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    return date.toDateString() === new Date().toDateString();
  };

  const isSelected = (day: number) => {
    if (!selectedDate || day === 0) return false;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    return date.toDateString() === selectedDate.toDateString();
  };

  const isWeekend = (dayIndex: number) => {
    return dayIndex === 0 || dayIndex === 6;
  };

  const renderEvents = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    const dateString = date.toDateString();
    const dayEvents = events[dateString] || [];

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
              snapshot.isDragging &&
                "ring-2 ring-secondary opacity-70 rotate-2 scale-105",
            )}
          >
            {event.title}
          </div>
        )}
      </Draggable>
    ));
  };

  const getWeeksInMonth = () => {
    const weeks: number[][] = [];
    let currentWeek: number[] = [];

    // Fill empty days at the start
    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(0);
    }

    // Fill days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Fill empty days at the end
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(0);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  return (
    <div className="h-full flex flex-col">
      <div
        className={cn(
          "flex justify-between items-center px-2 py-3",
          isMobile ? "flex-col gap-3" : "flex-row",
        )}
      >
        <h2
          className={cn(
            "font-bold text-gray-800 dark:text-white",
            isMobile ? "text-lg" : "text-xl md:text-2xl",
          )}
        >
          {currentDate
            .toLocaleString("fr-FR", {
              month: "long",
              year: "numeric",
            })
            .toLocaleUpperCase()}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrevMonth}
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl border border-border/40 hover:border-secondary hover:bg-secondary/5 hover:text-secondary transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleNextMonth}
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl border border-border/40 hover:border-secondary hover:bg-secondary/5 hover:text-secondary transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={onEventDrop}>
        <div className="flex-1 overflow-auto p-4">
          <div
            className={cn(
              "grid grid-cols-7 gap-2 mb-2",
              sidebarState === "expanded" ? "text-xs" : "text-sm",
            )}
          >
            {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
              <div
                key={day}
                className={cn(
                  "text-center font-medium p-1",
                  day === "Dim" || day === "Sam"
                    ? "text-red-500"
                    : "text-gray-600 dark:text-gray-300",
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
                        : new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            day,
                          ).toDateString()
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
                                isToday(day) &&
                                  "bg-primary/5 ring-2 ring-primary border-primary/50",
                                isSelected(day) &&
                                  "bg-secondary/5 ring-2 ring-secondary border-secondary/50",
                                isWeekend(dayIndex) &&
                                  "bg-muted/80 border-muted/80 dark:bg-muted/60 dark:border-muted/60",
                                snapshot.isDraggingOver &&
                                  "bg-secondary/20 ring-2 ring-secondary border-secondary/50",
                                "backdrop-blur-[2px]",
                                "group cursor-pointer shadow-sm",
                              ),
                        )}
                        onClick={() => {
                          if (day !== 0) {
                            onDayClick(
                              new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth(),
                                day,
                              ),
                            );
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
                                isWeekend(dayIndex) && "text-foreground/70",
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
      </DragDropContext>
    </div>
  );
};

export default Calendar;
