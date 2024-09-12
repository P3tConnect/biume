import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

const CalendarDropdown = ({ viewMode, setViewMode }: { viewMode: string, setViewMode: Dispatch<SetStateAction<string>> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="rounded-full h-7 w-7 p-0">
          <MoreVertical size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="font-bold">Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {viewMode == "week" ? (
              <p>Semaine</p>
            ) : viewMode == "month" ? (
              <p>Mois</p>
            ) : viewMode == "year" ? (
              <p>Année</p>
            ) : null}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuCheckboxItem
              checked={viewMode === "week"}
              onCheckedChange={() => setViewMode("week")}
            >
              <p>Semaine</p>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={viewMode === "month"}
              onCheckedChange={() => setViewMode("month")}
            >
              <p>Mois</p>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={viewMode === "year"}
              onCheckedChange={() => setViewMode("year")}
            >
              <p>Année</p>
            </DropdownMenuCheckboxItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between items-center" asChild>
          <Link href={`/dashboard/timetable`}>
            <p className="font-semibold">Voir plus</p>
            <MoreHorizontal size={14} />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CalendarDropdown;
