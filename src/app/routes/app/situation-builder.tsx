import React, { useReducer } from "react";
import { Button } from "@/components/ui/button";
import {
  StepLayout,
  StepBlock,
} from "@/features/senario-builder/components/Step";
import {
  getRecommendations,
  getUserRoleRecommendations,
  getAssistantRoleRecommendations,
} from "@/features/senario-builder/dummy/dummy";
import SituationInput from "@/features/senario-builder/components/Situation-Input";
import {
  initialState,
  scenarioReducer,
} from "@/features/senario-builder/reducer/senario-reducer";
import { steps } from "@/features/senario-builder/constants";

// ---------- 메인 컴포넌트 ----------
export default function SituationRoute() {
  // ! This is CodeRabit Test Code  so this code line will be removed in the future
  // useReducer로 상태 관리
  const [state, dispatch] = useReducer(scenarioReducer, initialState);
  const { currentStep, formData } = state;

  const currentStepInfo = steps.find((step) => step.id === currentStep)!;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length;

  // (A) 이전 단계 이동
  function handlePrev() {
    dispatch({ type: "PREV_STEP" });
  }

  // (B) 다음 단계 이동
  function handleNext() {
    // role 스텝은 assistant/user가 모두 입력되어야 넘어갈 수 있게
    if (currentStepInfo.key === "role") {
      if (!formData.role.assistant || !formData.role.user) return;
    } else {
      // 그 외 단계는 현재 stepKey에 값이 있어야 함
      if (!(formData as any)[currentStepInfo.key]) return;
    }
    dispatch({ type: "NEXT_STEP" });

    // 마지막 단계면 "시나리오 생성" 로직
    if (isLastStep) {
      console.log("시나리오 생성 완료: ", formData);
      alert("시나리오가 생성되었습니다!");
      // 실제로는 서버 전송, 페이지 이동 등 후속작업
    }
  }

  // (C) input 값이 변경될 때
  function handleChange(stepKey: string, value: any) {
    dispatch({ type: "UPDATE_FORM_DATA", stepKey, value });
  }

  // (D) 추천 태그 클릭 시 (일반 스텝)
  function handleRecommendationClick(stepKey: string, value: string) {
    // 값 갱신 & 바로 다음 단계로 넘어가기
    handleChange(stepKey, value);
    dispatch({ type: "NEXT_STEP" });
  }

  // (E) role(assistant/user) 추천 태그 클릭 시
  function handleRoleRecommendationClick(
    assistantOrUser: "assistant" | "user",
    value: string
  ) {
    const newRole = { ...formData.role, [assistantOrUser]: value };
    dispatch({ type: "UPDATE_FORM_DATA", stepKey: "role", value: newRole });
  }

  // ---------- UI ----------
  return (
    <div
      className="
        flex h-screen flex-col 
        bg-gradient-to-br from-orange-50 to-orange-100 
        border border-orange-300 
        rounded-lg shadow-lg
      "
    >
      {/* 헤더 */}
      <header
        className="
          w-full p-4 mb-4 text-orange-800 font-bold text-2xl 
          text-center bg-white/80 border-b border-orange-300 shadow-sm
        "
      >
        상황 생성
      </header>

      <div className="px-2.5 h-full flex flex-col">
        {/* 스텝 진행도 */}
        <StepLayout>
          {steps.map((step) => (
            <StepBlock
              key={step.id}
              currentStep={currentStep}
              targetStep={step.id}
              text={step.name}
            />
          ))}
        </StepLayout>

        {/* 메인 컨텐츠 박스 */}
        <div
          className="
            p-4 bg-white/90 mt-4 mb-4 h-3/4 
            flex flex-col justify-between 
            border border-orange-200 
            rounded-xl shadow-lg
          "
        >
          <h2 className="text-3xl font-extrabold text-center mt-4 text-orange-700">
            {currentStepInfo.name}
          </h2>

          {/* 1) 일반 스텝 (장소, 상황, 배경, 목표) */}
          {currentStepInfo.key !== "role" && (
            <div className="flex flex-col items-center mt-6">
              {/* 입력 */}
              <SituationInput
                value={
                  formData[
                    currentStepInfo.key as keyof typeof formData
                  ] as string
                }
                onChange={(e) =>
                  handleChange(currentStepInfo.key, e.target.value)
                }
                placeholder={currentStepInfo.placeholder}
              />

              {/* 추천 태그 */}
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                {getRecommendations(currentStepInfo.key, formData).map(
                  (msg, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleRecommendationClick(currentStepInfo.key, msg)
                      }
                      className="
                      bg-orange-50
                      text-orange-700
                      border border-orange-300
                      px-4 py-2
                      rounded-full
                      transition-transform duration-200
                      hover:bg-orange-100
                      hover:scale-105
                      shadow-sm
                    "
                    >
                      {msg}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* 2) 역할 설정 스텝(role) */}
          {currentStepInfo.key === "role" && (
            <div className="flex flex-col items-center mt-6 gap-8">
              {/* assistant */}
              <div className="w-2/3">
                <label className="block text-orange-700 font-semibold mb-2">
                  상대방 (assistant)
                </label>
                <select
                  className="
                    w-full border border-orange-200 rounded-md p-3 
                    text-orange-700 focus:outline-none focus:ring-2
                    focus:ring-orange-400
                  "
                  value={formData.role.assistant}
                  onChange={(e) =>
                    handleRoleRecommendationClick("assistant", e.target.value)
                  }
                >
                  <option value="">역할을 선택해주세요</option>
                  {getAssistantRoleRecommendations(formData).map(
                    (item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>

                {/* 추천 태그들 */}
                <div className="flex flex-wrap gap-3 justify-start mt-4">
                  {getAssistantRoleRecommendations(formData).map(
                    (msg, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleRoleRecommendationClick("assistant", msg)
                        }
                        className="
                        bg-orange-50
                        text-orange-700
                        border border-orange-300
                        px-4 py-2
                        rounded-full
                        transition-transform duration-200
                        hover:bg-orange-100
                        hover:scale-105
                        shadow-sm
                      "
                      >
                        {msg}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* user */}
              <div className="w-2/3">
                <label className="block text-orange-700 font-semibold mb-2">
                  나 (user)
                </label>
                <select
                  className="
                    w-full border border-orange-200 rounded-md p-3
                    text-orange-700 focus:outline-none focus:ring-2
                    focus:ring-orange-400
                  "
                  value={formData.role.user}
                  onChange={(e) =>
                    handleRoleRecommendationClick("user", e.target.value)
                  }
                >
                  <option value="">역할을 선택해주세요</option>
                  {getUserRoleRecommendations(formData).map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                {/* 추천 태그들 */}
                <div className="flex flex-wrap gap-3 justify-start mt-4">
                  {getUserRoleRecommendations(formData).map((msg, index) => (
                    <button
                      key={index}
                      onClick={() => handleRoleRecommendationClick("user", msg)}
                      className="
                        bg-orange-50
                        text-orange-700
                        border border-orange-300
                        px-4 py-2
                        rounded-full
                        transition-transform duration-200
                        hover:bg-orange-100
                        hover:scale-105
                        shadow-sm
                      "
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 이전 / 다음 버튼 */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrev}
              disabled={isFirstStep}
              className="
                bg-orange-200 hover:bg-orange-300 text-orange-900
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
            >
              이전
            </Button>

            <Button
              onClick={handleNext}
              className="
                bg-orange-500 hover:bg-orange-600 text-white 
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
            >
              {isLastStep ? "시나리오 생성" : "다음"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
