export type TPlaceList = {
  place: string;
};
export type TAiRoleList = {
  aiRole: string;
};
export type TUserRoleList = {
  userRole: string;
};
export type TGoalList = {
  goal: string;
};

export type TAllList = TPlaceList & TAiRoleList & TUserRoleList & TGoalList;
