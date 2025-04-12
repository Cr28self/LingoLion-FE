import { useEffect, useState } from 'react';

const useMediaQuery = (query: string): boolean => {
  const getInitialState = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }

    // 서버 환경이거나 window 객체가 아직 준비되지 않은 경우
    return false;
  };
  const [matches, setMatches] = useState<boolean>(getInitialState);

  // useEffect 훅을 사용하여 부수 효과(이벤트 리스너 추가/제거)를 처리합니다.
  useEffect(() => {
    // 2. 클라이언트 측에서만 실행되도록 확인 (window 객체 존재 여부)
    if (typeof window === 'undefined') {
      // 서버 환경에서는 아무 작업도 하지 않음
      return;
    }

    // 3. MediaQueryList 객체 생성
    const mediaQueryList = window.matchMedia(query);

    // 4. 상태 변경 핸들러 함수 정의
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 5. 초기 상태 동기화 (Effect 실행 시점의 최신 상태 반영)
    //    useState의 초기값 설정 이후 뷰포트가 변경되었을 수 있으므로
    //    effect 실행 시점의 최신 상태로 한번 더 동기화합니다.
    setMatches(mediaQueryList.matches);

    // 6. 'change' 이벤트 리스너 추가 (최신 브라우저 방식)
    //    이전 방식: mediaQueryList.addListener(handleChange);
    mediaQueryList.addEventListener('change', handleChange);

    // 7. 클린업 함수: 컴포넌트 언마운트 시 또는 query 변경 시 리스너 제거
    return () => {
      // 이전 방식: mediaQueryList.removeListener(handleChange);
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
