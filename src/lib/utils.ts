import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 날짜 포맷팅 함수 (lib/utils.ts에 추가하거나 여기서 직접 사용)
export const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// n일전 형태로 변환하는 함수
export const getDaysAgo = (dateString: string | Date) => {
  const createdAt = new Date(dateString);
  const now = new Date();

  // 시간 차이 (밀리초)
  const diffTime = now.getTime() - createdAt.getTime();

  // 일(day) 단위로 변환
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return `${diffDays}일 전`;
};
