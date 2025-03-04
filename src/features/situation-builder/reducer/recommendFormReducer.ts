import {
  TAiRoleList,
  TAllList,
  TGoalList,
  TPlaceList,
  TUserRoleList,
} from "./types";

export type RecommendFormState = {
  formData: {
    place: string;
    userRole: string;
    aiRole: string;
    goal: string;
  };

  recAllList: TAllList[] | null;
  recPlaceList: TPlaceList[] | null;
  recUserRoleList: TUserRoleList[] | null;
  recAiRoleList: TAiRoleList[] | null;
  recGoalList: TGoalList[] | null;
};

export type recommendFormAction =
  | { type: "SET_FORM_VALUE"; name: keyof TAllList; value: string }
  | { type: "SET_REC_PLACE_LIST"; payload: TPlaceList[] | null }
  | { type: "SET_REC_AIROLE_LIST"; payload: TAiRoleList[] | null }
  | { type: "SET_REC_USERROLE_LIST"; payload: TUserRoleList[] | null }
  | { type: "SET_REC_GOAL_LIST"; payload: TGoalList[] | null }
  | { type: "SET_REC_ALL_LIST"; payload: TAllList[] | null };

export const initialState: RecommendFormState = {
  formData: {
    place: "",
    userRole: "",
    aiRole: "",
    goal: "",
  },
  recAllList: null,
  recPlaceList: null,
  recUserRoleList: null,
  recAiRoleList: null,
  recGoalList: null,
};

export function recommendFormReducer(
  state: RecommendFormState,
  action: recommendFormAction
): RecommendFormState {
  switch (action.type) {
    case "SET_FORM_VALUE":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.name]: action.value,
        },
      };

    case "SET_REC_PLACE_LIST":
      return { ...state, recPlaceList: action.payload };

    case "SET_REC_AIROLE_LIST":
      return { ...state, recAiRoleList: action.payload };

    case "SET_REC_USERROLE_LIST":
      return { ...state, recUserRoleList: action.payload };

    case "SET_REC_GOAL_LIST":
      return { ...state, recGoalList: action.payload };

    case "SET_REC_ALL_LIST":
      return { ...state, recAllList: action.payload };
    default:
      return state;
  }
}
