import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
// import FilterEvents from "./FilterEvents";
import SideDrawer from "./side-drawer";
import { Event, DayEvents } from "@/src/lib";
// import {
//   getEventsForMonth,
//   saveEvent,
//   deleteEvent,
//   updateEvent,
//   hasDuplicateEventName,
// } from "../utils/eventStorage";
import { getDaysInMonth, getFirstDayOfMonth } from "@/src/lib/dateUtils";
// import { exportEvents, downloadFile } from "../utils/exportEvents";
import { cn } from "@/src/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

const eventColors = {
  work: "bg-blue-500 text-white",
  personal: "bg-green-500 text-white",
  other: "bg-gray-500 text-white",
  education: "bg-yellow-500 text-black",
  hobbies: "bg-purple-500 text-white",
  health: "bg-red-500 text-white",
  finance: "bg-yellow-400 text-black",
};

const checkTimeOverlap = (
  start1: number,
  end1: number,
  start2: number,
  end2: number,
): boolean => {
  return start1 < end2 && end1 > start2;
};

const Calendar: React.FC = () => {
  const { isMobile, state: sidebarState } = useSidebar();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<DayEvents>({});
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [filter, setFilter] = useState("");

  // useEffect(() => {
  //   const monthEvents = getEventsForMonth(currentDate);
  //   const groupedEvents: DayEvents = {};
  //   monthEvents.forEach((event) => {
  //     const date = new Date(event.startTime).toDateString();
  //     if (!groupedEvents[date]) {
  //       groupedEvents[date] = [];
  //     }
  //     groupedEvents[date].push(event);
  //   });
  //   setEvents(groupedEvents);
  //   setFilteredEvents(monthEvents);
  // }, [currentDate]);

  useEffect(() => {
    const lowercasedFilter = filter.toLowerCase();
    const filtered = Object.values(events)
      .flat()
      .filter(
        (event) =>
          event.title.toLowerCase().includes(lowercasedFilter) ||
          event.description?.toLowerCase().includes(lowercasedFilter),
      );
    setFilteredEvents(filtered);
  }, [filter, events]);

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

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    setSelectedDate(clickedDate);
    setIsSideDrawerOpen(true);
  };

  const checkEventOverlap = (event1: Event, event2: Event): boolean => {
    const start1 = new Date(event1.startTime);
    const end1 = new Date(event1.endTime);
    const start2 = new Date(event2.startTime);
    const end2 = new Date(event2.endTime);

    // Convert all times to minutes since midnight
    const start1Minutes = start1.getHours() * 60 + start1.getMinutes();
    const end1Minutes = end1.getHours() * 60 + end1.getMinutes();
    const start2Minutes = start2.getHours() * 60 + start2.getMinutes();
    const end2Minutes = end2.getHours() * 60 + end2.getMinutes();

    // Use the checkTimeOverlap utility function
    return checkTimeOverlap(
      start1Minutes,
      end1Minutes,
      start2Minutes,
      end2Minutes,
    );
  };

  const handleSaveEvent = (event: Event) => {
    const updatedEvents = { ...events };
    const eventDate = new Date(event.startTime).toDateString();
    if (!updatedEvents[eventDate]) {
      updatedEvents[eventDate] = [];
    }

    const existingEventIndex = updatedEvents[eventDate].findIndex(
      (e) => e.id === event.id,
    );

    // Check for duplicate event names
    const isDuplicateName = updatedEvents[eventDate].some(
      (e) =>
        e.title.toLowerCase() === event.title.toLowerCase() &&
        (!event.id || e.id !== event.id),
    );

    if (isDuplicateName) {
      alert(
        "An event with this name already exists on this day. Please choose a different name.",
      );
      return;
    }

    // Check for overlapping events, excluding the event being edited
    const hasOverlap = updatedEvents[eventDate].some((e) => {
      if (existingEventIndex !== -1 && e.id === event.id) return false;
      return checkEventOverlap(event, e);
    });

    if (hasOverlap) {
      alert(
        "This event overlaps with an existing event. Please choose a different time.",
      );
      return;
    }

    // if (existingEventIndex !== -1) {
    //   updatedEvents[eventDate][existingEventIndex] = event;
    //   updateEvent(event.id, event);
    // } else {
    //   updatedEvents[eventDate].push(event);
    //   saveEvent(event);
    // }

    setEvents(updatedEvents);
  };

  const handleDeleteEvent = (eventId: string) => {
    const updatedEvents = { ...events };
    let deletedEvent: Event | null = null as Event | null;

    Object.keys(updatedEvents).forEach((date) => {
      const eventIndex = updatedEvents[date].findIndex(
        (event) => event.id === eventId,
      );
      if (eventIndex !== -1) {
        deletedEvent = updatedEvents[date][eventIndex];
        updatedEvents[date].splice(eventIndex, 1);
        if (updatedEvents[date].length === 0) {
          delete updatedEvents[date];
        }
      }
    });

    if (deletedEvent) {
      const startDate = new Date(deletedEvent.startTime).toDateString();
      const endDate = new Date(deletedEvent.endTime).toDateString();

      // If the event spans midnight, ensure it's removed from both days
      if (startDate !== endDate) {
        [startDate, endDate].forEach((date) => {
          if (updatedEvents[date]) {
            updatedEvents[date] = updatedEvents[date].filter(
              (e) => e.id !== eventId,
            );
            if (updatedEvents[date].length === 0) {
              delete updatedEvents[date];
            }
          }
        });
      }
    }

    setEvents(updatedEvents);
    // deleteEvent(eventId);
  };

  const handleFilteredEventClick = (event: Event) => {
    setSelectedDate(new Date(event.startTime));
    setIsSideDrawerOpen(true);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceDate = result.source.droppableId;
    const destinationDate = result.destination.droppableId;
    const eventIndex = result.source.index;

    const updatedEvents = { ...events };
    const [movedEvent] = updatedEvents[sourceDate].splice(
      eventIndex,
      1,
    ) as Event[];

    // Check for duplicate event names in the destination date
    // const isDuplicateName = hasDuplicateEventName(
    //   updatedEvents[destinationDate] || [],
    //   movedEvent.title,
    // );
    // if (isDuplicateName) {
    //   alert(
    //     "An event with this name already exists on the destination date. The event will not be moved.",
    //   );
    //   updatedEvents[sourceDate].splice(eventIndex, 0, movedEvent);
    //   setEvents(updatedEvents);
    //   return;
    // }

    // Create new dates while preserving the time
    const oldStartDate = new Date(movedEvent.startTime);
    const oldEndDate = new Date(movedEvent.endTime);
    const newStartDate = new Date(destinationDate);
    const newEndDate = new Date(destinationDate);

    // Set hours and minutes from the original event
    newStartDate.setHours(oldStartDate.getHours(), oldStartDate.getMinutes());
    newEndDate.setHours(oldEndDate.getHours(), oldEndDate.getMinutes());

    // If end time is before start time, it means it ends the next day
    if (oldEndDate.getTime() < oldStartDate.getTime()) {
      newEndDate.setDate(newEndDate.getDate() + 1);
    }

    const updatedEvent = {
      ...movedEvent,
      startTime: newStartDate.toISOString(),
      endTime: newEndDate.toISOString(),
    };

    // Check for overlapping events in the destination date
    const hasOverlap = updatedEvents[destinationDate]?.some((existingEvent) =>
      checkEventOverlap(updatedEvent, existingEvent),
    );

    if (hasOverlap) {
      alert(
        "This event overlaps with an existing event in the destination date. The event will not be moved.",
      );
      updatedEvents[sourceDate].splice(eventIndex, 0, movedEvent);
    } else {
      if (!updatedEvents[destinationDate]) {
        updatedEvents[destinationDate] = [];
      }
      updatedEvents[destinationDate].push(updatedEvent);
      // updateEvent(updatedEvent.id, updatedEvent);
    }

    setEvents(updatedEvents);
  };

  // const handleExport = (format: "json" | "csv") => {
  //   const allEvents = Object.values(events).flat();
  //   const exportedContent = exportEvents(allEvents, format);
  //   const fileName = `events_${currentDate.getFullYear()}_${currentDate.getMonth() + 1}.${format}`;
  //   const contentType = format === "json" ? "application/json" : "text/csv";
  //   downloadFile(exportedContent, fileName, contentType);
  // };

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

    // Remplir les jours vides du début
    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(0);
    }

    // Remplir les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Remplir les jours vides de fin
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
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
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

      <DragDropContext onDragEnd={onDragEnd}>
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
                        onClick={() => day !== 0 && handleDayClick(day)}
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
      <SideDrawer
        isOpen={isSideDrawerOpen}
        onClose={() => setIsSideDrawerOpen(false)}
        selectedDate={selectedDate}
        events={selectedDate ? events[selectedDate.toDateString()] || [] : []}
        onAddEvent={() => {}}
        onEditEvent={() => {}}
        onDeleteEvent={(event) => handleDeleteEvent(event.id)}
        onSaveEvent={handleSaveEvent}
        existingEvents={
          selectedDate ? events[selectedDate.toDateString()] || [] : []
        }
      />
    </div>
  );
};

export default Calendar;
