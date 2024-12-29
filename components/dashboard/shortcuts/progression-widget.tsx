import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { EllipsisVertical } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/src/lib/utils";

interface ProgressionCategory {
  name: string;
  progress: number;
  color: string;
}

const categories: ProgressionCategory[] = [
  {
    name: "Consultations",
    progress: 85,
    color: "bg-blue-500",
  },
  {
    name: "Traitements",
    progress: 65,
    color: "bg-green-500",
  },
  {
    name: "Suivis",
    progress: 45,
    color: "bg-purple-500",
  },
  {
    name: "Paiements",
    progress: 92,
    color: "bg-orange-500",
  },
];

const ProgressionWidget = () => {
  return (
    <Card className="w-full h-full rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">
          Progression
        </CardTitle>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 p-0 rounded-full bg-card"
        >
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{category.name}</span>
              <span className="font-medium">{category.progress}%</span>
            </div>
            <Progress
              value={category.progress}
              className="h-2 w-full"
              indicatorClassName={cn(category.color, "transition-all")}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProgressionWidget;
