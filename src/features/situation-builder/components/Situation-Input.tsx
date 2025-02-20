const SituationInput = ({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <div className="relative w-2/3">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
            block w-full 
            border border-orange-200 
            rounded-md p-4 
            text-center text-2xl 
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-orange-400
            ${className}
          `}
      />
    </div>
  );
};

export default SituationInput;
