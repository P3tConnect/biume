"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      closeButton
      richColors
      expand
      toastOptions={{
        duration: 4000,
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md",
          error:
            "group-[.toast]:bg-destructive/10 group-[.toast]:text-destructive group-[.toast]:border-2 group-[.toast]:border-destructive/30 group-[.toast]:dark:bg-destructive/10 group-[.toast]:dark:border-destructive/30",
          warning:
            "group-[.toast]:bg-[#ff9500]/10 group-[.toast]:text-[#ff9500] group-[.toast]:border-2 group-[.toast]:border-[#ff9500]/30 group-[.toast]:dark:bg-[#ff9500]/10 group-[.toast]:dark:border-[#ff9500]/30",
          info: "group-[.toast]:bg-primary/10 group-[.toast]:text-primary group-[.toast]:border-2 group-[.toast]:border-primary/30 group-[.toast]:dark:bg-primary/20 group-[.toast]:dark:border-primary/30",
          loading:
            "group-[.toast]:bg-primary/10 group-[.toast]:text-primary group-[.toast]:border-2 group-[.toast]:border-primary/30 group-[.toast]:dark:bg-primary/20 group-[.toast]:dark:border-primary/30",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
