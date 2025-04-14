// ! API에서 사용하는 타입들은 전부 여기다가 박아두기

export type BaseEntity = {
  id: number;
  createdAt: Date;
};

//[K in keyof T]: T[K]는 T의 모든 프로퍼티를 그대로 복사하고, BaseEntity와 교차(intersection, &)하여 새로운 타입을 생성합니다
export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type TGetAllMessageResponse = {
  data: {
    createdAt: string;
    id: number;
    sender: 'assistant' | 'user';
    content: string;
  }[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
};
