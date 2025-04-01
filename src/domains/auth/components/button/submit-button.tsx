import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

type SubmitButtonProps = {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export const SubmitButton = ({
  isLoading,
  children,
  className,
  ...props
}: SubmitButtonProps) => {
  const buttonClass = clsx(
    "w-2/3 h-12 px-6 text-xl font-semibold text-white bg-orange-500 rounded-xl shadow-md transition-all hover:bg-orange-600  focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2",
    {
      "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50":
        props.disabled,
    },
    className
  );
  return (
    <Button className={buttonClass} {...props}>
      {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : children}
    </Button>
  );
};

export default SubmitButton;
