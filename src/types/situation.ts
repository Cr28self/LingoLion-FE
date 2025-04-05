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
export type TSituationFieldKey = keyof TSituation;

export type TSituationFieldCollections = {
  place: TSituationPlaceField[];
  userRole: TSituationUserRoleField[];
  aiRole: TSituationAiRoleField[];
  goal: TSituationGoalField[];
};
export type TSituationMode = 'all' | 'my';
