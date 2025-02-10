import { useTheme, Theme } from "remix-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ModeToggle() {
  const [theme, setTheme] = useTheme();

  // Don't render anything until theme is initialized
  if (!theme) return null;

  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <Button
          className="rounded-full w-8 h-8 bg-card"
          variant="outline"
          size="icon"
          onClick={() =>
            setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
          }
        >
          <SunIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
          <MoonIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
          <span className="sr-only">Switch Theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Switch Theme</TooltipContent>
    </Tooltip>
  );
}
