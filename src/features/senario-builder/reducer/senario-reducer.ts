// ---------- 액션 타입 정의 ----------

import { steps } from "../constants";

import { ScenarioAction, ScenarioState } from "../types/scenario-types";

// ---------- 초기값 설정 ----------
export const initialState: ScenarioState = {
  currentStep: 1,
  formData: {
    place: "",
    situation: "",
    background: "",
    role: { assistant: "", user: "" },
    goal: "",
  },
};

// ---------- 리듀서 정의 ----------
export function scenarioReducer(
  state: ScenarioState,
  action: ScenarioAction
): ScenarioState {
  switch (action.type) {
    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload };

    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, steps.length),
      };

    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      };

    case "UPDATE_FORM_DATA": {
      const { stepKey, value } = action;
      const stepIndex = steps.findIndex((s) => s.key === stepKey);

      // 기존 값
      const oldValue = state.formData[stepKey as keyof typeof state.formData];
      // role은 객체이므로 stringify
      const oldValueString = JSON.stringify(oldValue);
      const newValueString = JSON.stringify(value);

      // 값이 바뀌지 않았다면 그대로 유지
      if (oldValueString === newValueString) {
        return state;
      }

      // 새 formData 생성
      const newFormData = { ...state.formData };

      // 현재 스텝 값 변경
      (newFormData as any)[stepKey] = value;

      // 뒤 스텝 초기화
      for (let i = stepIndex + 1; i < steps.length; i++) {
        const nextKey = steps[i].key;
        if (nextKey === "role") {
          newFormData.role = { assistant: "", user: "" };
        } else {
          (newFormData as any)[nextKey] = "";
        }
      }

      return { ...state, formData: newFormData };
    }

    default:
      return state;
  }
}
