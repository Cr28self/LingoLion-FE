// RecommendTagList.tsx

const RecommendTag = ({
  msg,
  onClick,
}: {
  msg: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className="
        bg-orange-50
        text-orange-700
        border border-orange-300
        px-3 py-1
        rounded-full
        transition-transform duration-200
        hover:bg-orange-100
        hover:scale-105
        shadow-sm
      "
      onClick={onClick}
      type="button"
    >
      {msg}
    </button>
  );
};

export const RecommendTagLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex gap-3 justify-start mt-3 h-[50px] overflow-x-auto overflow-hidden whitespace-nowrap py-1 pl-3">
      {children}
    </div>
  );
};

interface RecommendTagListProps {
  tags: string[]; // 태그 리스트
  onTagClick?: (tag: string) => void; // 클릭 시 태그 값을 전달하는 함수
}

const RecommendTagList: React.FC<RecommendTagListProps> = ({
  tags,
  onTagClick,
}) => {
  return (
    <>
      {tags.map((tag, index) => (
        <RecommendTag key={index} msg={tag} onClick={() => onTagClick?.(tag)} />
      ))}
    </>
  );
};

export default RecommendTagList;
