"use client";

import { Button } from "@/components/ui/button";
import { PawPrint, Stethoscope } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function PageSwitch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const version = searchParams.get("version") || "user";

  const handleSwitch = (newVersion: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("version", newVersion);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="fixed top-6 right-6 z-50 bg-background/80 backdrop-blur-lg rounded-full p-1 border shadow-lg">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant={version === "user" ? "default" : "ghost"}
          className="rounded-full"
          onClick={() => handleSwitch("user")}
        >
          <PawPrint className="w-4 h-4 mr-2" />
          Propriétaires
        </Button>
        <Button
          size="sm"
          variant={version === "pro" ? "default" : "ghost"}
          className="rounded-full"
          onClick={() => handleSwitch("pro")}
        >
          <Stethoscope className="w-4 h-4 mr-2" />
          Professionnels
        </Button>
      </div>
    </div>
  );
} 