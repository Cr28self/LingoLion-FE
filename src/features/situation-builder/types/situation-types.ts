import { RoleType } from "./role-types";

export interface SituationState {
  currentStep: number;
  formData: {
    place: string;

    role: RoleType;
    goal: string;
  };
}
export type SituationAction =
  | { type: "SET_CURRENT_STEP"; payload: number }
  | { type: "UPDATE_FORM_DATA"; stepKey: string; value: any } // any: string or RoleType
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" };
