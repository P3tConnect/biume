"use client";

import {
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DialogTitle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { CommandLoading } from "cmdk";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchButton = () => {
  const router = useRouter();
  const [openCommand, setOpenCommand] = useState(false);

  return (
    <>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className="rounded-full w-8 h-8 bg-card"
            variant="outline"
            size="icon"
            onClick={() => setOpenCommand(!openCommand)}
          >
            <Search className="w-[1rem] h-[1rem]" />
            <span className="sr-only">Search</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Search</TooltipContent>
      </Tooltip>
      <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
        <CommandInput />
        <CommandList className="p-1">
          <CommandEmpty>No results found</CommandEmpty>
          {/* <CommandLoading>Fetching results...</CommandLoading> */}
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => {
                setOpenCommand(false);
                router.push("/dashboard/timetable");
              }}
            >
              Sessions
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpenCommand(false);
                router.push("/dashboard/clients");
              }}
            >
              Clients
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpenCommand(false);
                router.push("/dashboard/patients");
              }}
            >
              Patients
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpenCommand(false);
                router.push("/dashboard/reports");
              }}
            >
              Reports
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchButton;
