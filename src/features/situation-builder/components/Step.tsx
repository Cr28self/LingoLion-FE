import { cn } from "@/lib/utils";
import React from "react";

type StepBlockProps = {
  currentStep: number;
  targetStep: number;
  text: string;
};

export const StepBlock = ({
  currentStep,
  targetStep,
  text,
}: StepBlockProps) => {
  return (
    <li
      className={cn(
        "relative p-3 md:p-4 flex-1 border-r-2 font-bold md:text-center border-l-8 md:border-l-0",
        {
          "text-orange-600": currentStep >= targetStep,
          "border-l-orange-600": currentStep >= targetStep,
        }
      )}
    >
      {text}
    </li>
  );
};

export const StepLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ol className="md:flex w-full bg-white rounded-lg shadow-md">{children}</ol>
  );
};
