export type TPlaceRecommendation = {
  place: string;
};
export type TAiRoleRecommendation = {
  aiRole: string;
};
export type TUserRoleRecommendation = {
  userRole: string;
};
export type TGoalRecommendation = {
  goal: string;
};

export type TRecommendationCategories = TPlaceRecommendation &
  TAiRoleRecommendation &
  TUserRoleRecommendation &
  TGoalRecommendation;

// 전체 추천 카테고리들의 매핑 타입의 키들을 가져옵니다. ('place' | 'userRole' | 'aiRole' | 'goal')
export type TRecommendationCategoriesKey = keyof TRecommendationCategories;


export type RecommendationTypeMap = {
  place: TPlaceRecommendation[];
  userRole: TUserRoleRecommendation[];
  aiRole: TAiRoleRecommendation[];
  goal: TGoalRecommendation[];
};

// 4. Mapped Type을 사용하여 각 키(K)를 해당 액션 객체 타입으로 변환하는 객체 생성
//    - Key K 가 주어지면, { type: K; payload: RecommendationTypeMap[K][] } 형태의 객체를 만듭니다.
type ActionObjectMap = {
  [K in TRecommendationCategoriesKey]: {
    // RecommendationKey의 각 키 K에 대해 반복
    type: K; // 'type' 속성은 키 K 자신
    payload: RecommendationTypeMap[K]; // 'payload' 속성은 RecommendationTypeMap에서 K에 해당하는 타입의 배열
  };
};

export type TSetRecListParams = ActionObjectMap[TRecommendationCategoriesKey];
