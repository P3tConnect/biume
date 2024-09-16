import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
} from "../ui";
import { Star } from "lucide-react";

const RatesSection = () => {
  return (
    <Card className="rounded-3xl h-full w-full">
      <CardHeader>
        <CardTitle>Avis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="#" alt="avatar" />
              <AvatarFallback className="bg-secondary border border-border">
                JD
              </AvatarFallback>
            </Avatar>
            <p>John Doe</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold text-xl">4,9</p>
            <div className="flex gap-2 items-center">
              <Star className="h-4 w-4" fill="yellow" />
              <Star className="h-4 w-4" fill="yellow" />
              <Star className="h-4 w-4" fill="yellow" />
              <Star className="h-4 w-4" fill="yellow" />
              <Star className="h-4 w-4" fill="yellow" />
            </div>
          </div>
        </div>

        <div className="p-2">
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            molestie, neque non scelerisque ultricies, nisl dolor aliquet
            lectus, quis aliquam erat nisl in nisi. Sed velit dui, mollis vitae,
            eleifend sed, commodo quis, sem. Sed eget est.
          </p>
        </div>

        <div className="flex flex-col gap-5 pt-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">Charles Xavier</p>
              <p className="text-sm text-muted-foreground">4.5</p>
            </div>
            <Progress className="h-1 w-full bg-primary/30" value={45} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">Valérie Damido</p>
              <p className="text-sm text-muted-foreground">4.9</p>
            </div>
            <Progress className="h-1 w-full bg-primary/30" value={90} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">Christian Clavier</p>
              <p className="text-sm text-muted-foreground">4.8</p>
            </div>
            <Progress className="h-1 w-full bg-primary/30" value={80} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="rounded-3xl w-full bg-primary/30 group">
          <p className="text-primary font-bold group-hover:text-white transition-colors duration-300">Voir plus</p>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RatesSection;
