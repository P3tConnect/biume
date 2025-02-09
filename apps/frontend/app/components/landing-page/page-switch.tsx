import { useSearchParams, useNavigate, useLocation } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { PawPrint, Stethoscope } from "lucide-react";

export function PageSwitch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const version = searchParams.get("version") || "user";

  const handleSwitch = (newVersion: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("version", newVersion);
    navigate(`${location.pathname}?${params.toString()}`);
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