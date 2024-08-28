import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-wrap gap-6 w-full", className)}>
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  points,
  href,
  cta,
}: {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
  points: string[];
}) => (
  <div
    key={name}
    className={cn(
      "bg-white dark:bg-black rounded-3xl p-8 flex flex-col min-h-[299px]",
      className
    )}
  >
    <div className="flex flex-col items-start mb-4">
      <Image
        src={Icon}
        className="text-seconday"
        width={90}
        height={90}
        alt={"Pawthera" + Icon}
      />
    </div>
    <div className="flex-grow">
      <h1 className="text-black dark:text-white text-[24px] font-bold mb-2">
        {name}
      </h1>
      <p className="text-black font-semibold text-[16px] leading-[1.5rem] mb-4">
        {description}
      </p>
    </div>
    <Dialog>
      <DialogTrigger asChild className="flex items-center justify-start">
        <p className="cursor-pointer text-secondary font-semibold text-[16px]">
          {cta} <ArrowRightIcon className="ml-2 h-4 w-4" />
        </p>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-black text-black dark:text-white p-6 rounded-lg shadow-lg max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex gap-3 items-center">
            <Image
              src={Icon}
              className="text-secondary"
              width={90}
              height={90}
              alt={"Pawthera" + Icon}
            />
            <h2 className="text-2xl font-bold">{name}</h2>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p className="mb-4">{description}</p>
          {points.map((point, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <CheckIcon className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white" />
              <p>{point}</p>
            </div>
          ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  </div>
);

export { BentoCard, BentoGrid };
