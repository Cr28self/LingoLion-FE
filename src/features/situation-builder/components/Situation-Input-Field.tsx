import { Button } from "@/components/ui/button";
import { Loader2, WandSparkles } from "lucide-react";
import { useState } from "react";

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
  aiRecommend: () => Promise<void>;
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleClick() {
    try {
      setLoading(true);
      await aiRecommend();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

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

        <Button className="h-auto" onClick={handleClick} disabled={loading}>
          {loading ? (
            // lucide-react spinner
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <WandSparkles className="h-12 w-12" />
          )}
        </Button>
      </div>

      {/* 추천 태그 */}
      {children}
    </div>
  );
};

export default SituationInputField;
