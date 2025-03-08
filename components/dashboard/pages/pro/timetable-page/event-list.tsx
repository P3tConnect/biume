import { Clock, Edit2, Trash2 } from "lucide-react"
import React from "react"

import { Button, ScrollArea, Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui"
import { Event } from "@/src/lib"

interface EventListProps {
  isOpen: boolean
  onClose: () => void
  events: Event[]
  onEditEvent: (event: Event) => void
  onDeleteEvent: (eventId: string) => void
  selectedDate: Date | null
}

const EventList: React.FC<EventListProps> = ({ isOpen, onClose, events, onEditEvent, onDeleteEvent, selectedDate }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>
            Events for{" "}
            {selectedDate?.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          {events.length === 0 ? (
            <p className="text-center text-muted-foreground">No events for this day.</p>
          ) : (
            <div className="space-y-6">
              {events.map(event => (
                <div key={event.id} className="bg-card rounded-lg shadow-md p-4">
                  <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(event.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(event.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {event.description && <p className="text-sm mb-4">{event.description}</p>}
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" variant="outline" onClick={() => onEditEvent(event)}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onDeleteEvent(event.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default EventList
