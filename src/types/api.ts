// ! API에서 사용하는 타입들은 전부 여기다가 박아두기

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

export type TRecommend = {
  type: "all" | "place" | "userRole" | "aiRole" | "goal";
  metaData?: string;
  place?: string;
  userRole?: string;
  aiRole?: string;
  goal?: string;
};

export type TSituationMode = "all" | "my";

export type TMakeSituation = {
  place: string;
  aiRole: string;
  userRole: string;
  goal: string;
};

export type TMakeConversation = {
  title: string;
  icon?: string;
  situationId: number;
  metaData?: {
    difficulty: "상" | "중" | "하";
    request: string;
  };
};

export type TSendMessage = {
  convId: string;
  content: string;
};

export type TGetAllMessage = {
  convId: string;
  cursor?: string;
};
