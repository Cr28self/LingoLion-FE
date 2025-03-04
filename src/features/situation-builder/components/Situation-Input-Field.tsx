import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";

const SituationInputField = ({
  value,
  onChange,
  placeholder,
  className = "",
  title,
  name,
  aiRecommend,
  children,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  title: string;
  name: string;
  aiRecommend: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative w-2/3">
      <label className="block text-orange-700 font-semibold mb-2">
        {title}
      </label>
      <div className="flex gap-1 items-stretch">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          className={`
            block w-full 
            border border-orange-200 
            rounded-md p-2
            text-center text-xl 
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-orange-400
            ${className}
          `}
        />

        <Button className="h-auto" onClick={aiRecommend}>
          <WandSparkles className="h-12 w-12" />
        </Button>
      </div>

      {/* 추천 태그 */}
      <div className="flex gap-3 justify-start mt-3 h-[50px] overflow-x-auto overflow-hidden whitespace-nowrap min-w-[500px] py-1 pl-3">
        {children}
      </div>
    </div>
  );
};

export default SituationInputField;
