import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Loader2, WandSparkles } from "lucide-react";
import React from "react";

interface SubmitButtonProps {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}
interface AllRecommendDrawerButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}
interface DrawerTriggerButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const SubmitButton = ({
  isLoading,
  children,
  className,
  ...props
}: SubmitButtonProps) => {
  const buttonClass = clsx(
    "w-2/3 h-12 px-6 text-xl font-semibold text-white bg-orange-500 rounded-xl shadow-md transition-all hover:bg-orange-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2",
    {
      "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50":
        props.disabled,
    },
    className
  );
  return (
    <Button className={buttonClass} {...props}>
      {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : children}
    </Button>
  );
};

export const AllRecommendDrawerButton = ({
  onClick,
  disabled,
  isLoading,
}: AllRecommendDrawerButtonProps) => {
  const buttonClass = clsx(
    "absolute bottom-4 left-4 md:w-12 md:h-12 w-16 h-16 rounded-full bg-orange-500 text-white shadow-lg flex items-center justify-center transition-all hover:bg-orange-600 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-400",
    {
      "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50":
        disabled,
    }
  );
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={buttonClass}
    >
      {isLoading ? (
        <Loader2 className="h-8 w-8 animate-spin" />
      ) : (
        <WandSparkles className="h-8 w-8" />
      )}
    </Button>
  );
};

// forwardRef를 사용하여 ref 전달
export const DrawerTriggerButton = React.forwardRef<
  HTMLButtonElement,
  DrawerTriggerButtonProps
>(({ title, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={`
          absolute bottom-4 left-4 
          md:w-16 md:h-16 w-12 h-12 rounded-full 
          bg-orange-500 text-white shadow-lg
          flex items-center justify-center 
          transition-all hover:bg-orange-600 hover:scale-110 
          focus:outline-none focus:ring-4 focus:ring-orange-400 
          disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50
          ${className || ""}
        `}
      {...props} // 추가적인 props 전달
    >
      {title}
    </Button>
  );
});

// forwardRef 사용 시 displayName 설정 (디버깅 용이)
DrawerTriggerButton.displayName = "DrawerTriggerButton";
