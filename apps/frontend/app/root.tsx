import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import "./global.css";
import { SidebarProvider } from "./components/ui/sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getSidebarState } from "./server/cookies.server";
import { themeSessionResolver } from "./server/theme.server";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
  Theme,
} from "remix-themes";
import { cn } from "./lib/utils";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const sidebarState = getSidebarState(request);
  const { getTheme } = await themeSessionResolver(request);
  const theme = getTheme();
  return json({ sidebarState, theme });
}

function AppContent() {
  const { sidebarState } = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  // Update the document class when theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(Theme.DARK, Theme.LIGHT);
    if (theme) {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <div className={cn("h-full")}>
      <TooltipProvider>
        <SidebarProvider defaultOpen={sidebarState!}>
          <Outlet />
        </SidebarProvider>
      </TooltipProvider>
      <Toaster />
    </div>
  );
}

export default function App() {
  const { theme } = useLoaderData<typeof loader>();

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={cn("h-full")}>
        <ThemeProvider specifiedTheme={theme} themeAction="/action/set-theme">
          <PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />
          <AppContent />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
