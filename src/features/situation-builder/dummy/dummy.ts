// dummy.ts

// (A) 단계 정보

// (B) 일반 단계에서의 추천 항목
// 실제로는 이전 단계 입력값(formData 등)에 따라 서버로부터
// 동적으로 불러오거나, 조건 분기할 수 있습니다.
export function getRecommendations(stepKey: string, formData: any): string[] {
  switch (stepKey) {
    case "place":
      return [
        "공항 안내 데스크",
        "호텔 로비",
        "카페",
        "레스토랑",
        "관광 안내소",
      ];

    case "goal":
      return ["문제 해결", "정보 획득", "관계 형성", "예약 변경"];
    default:
      return [];
  }
}

// (C) 역할 설정 단계(assistant/user)의 추천 항목
export function getAssistantRoleRecommendations(formData: any): string[] {
  // 실제로는 formData를 참고하여 분기할 수 있음
  return ["호텔 직원", "항공사 직원", "현지 가이드", "대사관 직원"];
}

export function getUserRoleRecommendations(formData: any): string[] {
  // 실제로는 formData를 참고하여 분기할 수 있음
  return ["관광객", "출장객", "학생", "비즈니스맨"];
}
