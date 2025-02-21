export type BaseEntity = {
  id: number;
  createdAt: Date;
};

//[K in keyof T]: T[K]는 T의 모든 프로퍼티를 그대로 복사하고, BaseEntity와 교차(intersection, &)하여 새로운 타입을 생성합니다
export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type ChatList = Entity<{
  id: number;
  name: string;
  role: "ADMIN" | "USER";
  msg: string;
  time: string;
}>;
