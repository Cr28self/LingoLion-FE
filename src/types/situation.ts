export type TSituationPlaceField = {
  place: string;
};
export type TSituationAiRoleField = {
  aiRole: string;
};
export type TSituationUserRoleField = {
  userRole: string;
};
export type TSituationGoalField = {
  goal: string;
};

export type TSituation = TSituationPlaceField &
  TSituationAiRoleField &
  TSituationUserRoleField &
  TSituationGoalField;

// 전체 추천 카테고리들의 매핑 타입의 키들을 가져옵니다. ('place' | 'userRole' | 'aiRole' | 'goal')
export type TRecommendationCategoriesKey = keyof TSituation;

export type RecommendationTypeMap = {
  place: TSituationPlaceField[];
  userRole: TSituationUserRoleField[];
  aiRole: TSituationAiRoleField[];
  goal: TSituationGoalField[];
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
