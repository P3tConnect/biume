"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Calendar,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
} from "@/components/ui";
import { cn } from "@/src/lib";
import { useState } from "react";

const TimetableWidget = () => {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="h-full rounded-2xl border border-border">
      <CardContent className="pt-4">
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={setCurrentDate}
          today={new Date()}
          defaultMonth={new Date()}
          className="flex h-full w-full"
          classNames={{
            months:
              "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
            month: "space-y-4 w-full flex flex-col",
            table: "w-full h-full border-collapse space-y-1",
            head_row: "h-12",
            row: "w-full mt-2",
            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          }}
        />
      </CardContent>
      <div className="divide-y border-t">
        <div>
          <Card className="border-none">
            <CardContent className="flex items-center p-4 rounded-2xl">
              <Avatar className="size-10">
                <AvatarImage src="https://randomuser.me/api/portraits/men/38.jpg" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="ms-4 space-y-2">
                <p className="font-medium leading-none">
                  General Health Check up
                </p>
                <p className="text-sm text-muted-foreground">
                  Dr. Dianne Philips at 10:00-11:00 AM
                </p>
              </div>
              <div className="ml-auto rounded-lg bg-green-100 px-3 py-1 text-end text-xs font-medium text-green-800">
                Active
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="border-none">
            <CardContent className="flex items-center p-4 rounded-2xl">
              <Avatar className="size-10">
                <AvatarImage src="https://randomuser.me/api/portraits/men/39.jpg" />
                <AvatarFallback>DE</AvatarFallback>
              </Avatar>
              <div className="ms-4 space-y-2">
                <p className="font-medium leading-none">Temporary Headache</p>
                <p className="text-sm text-muted-foreground">
                  Dr. Jenny Smith at 05:00-06:00 PM
                </p>
              </div>
              <div className="ml-auto rounded-lg bg-orange-100 px-3 py-1 text-end text-xs font-medium text-orange-800">
                Pending
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default TimetableWidget;
