import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";

import "./global.css";
import { SidebarProvider } from "./components/ui/sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getSidebarState } from "./server/cookies.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const sidebarState = getSidebarState(request);
  return json({ sidebarState });
}

export default function App() {
  const { sidebarState } = useLoaderData<typeof loader>();

  return (
    <html lang="fr" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <TooltipProvider>
          <SidebarProvider defaultOpen={sidebarState!}>
            <Outlet />
          </SidebarProvider>
        </TooltipProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
