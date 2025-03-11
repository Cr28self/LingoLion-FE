import { useReducer } from "react";
import { useMakeSituation } from "./api/make-situation";
import { useRecommendSituations } from "./api/recommend-situations";
import {
  initialState,
  recommendFormReducer,
} from "./reducer/recommendFormReducer";
import { TAllList } from "./reducer/types";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type TFormFieldName = keyof TAllList;

type UseRecommendFormProps = {
  metaData?: string;
  onCompleteNavigate: () => void;
};

export function useRecommendForm({
  metaData,
  onCompleteNavigate,
}: UseRecommendFormProps) {
  const { mutate: mutateRecommend } = useRecommendSituations();
  const { mutate: mutateMake } = useMakeSituation();
  const queryClient = useQueryClient();
  const [
    {
      formState,
      recAiRoleList,
      recAllList,
      recGoalList,
      recPlaceList,
      recUserRoleList,
      isAllRecLoading,
      isInitialAllRec,
      isSubmitting,
      currentRecommendLoading, // 추가: 현재 추천 로딩 중인 필드
    },
    dispatch,
  ] = useReducer(recommendFormReducer, {
    ...initialState,
    currentRecommendLoading: null, // 초기값 추가
  });

  // ! Input 박스로 입력시 formState에 반영
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    dispatch({ type: "SET_FORM_VALUE", name: name as TFormFieldName, value });
  }

  // ! 추천 항목 선택 시 formState에 반영
  function handleRecommendationClick(name: TFormFieldName, value: string) {
    dispatch({ type: "SET_FORM_VALUE", name, value });
  }

  //   ! 전체 추천
  function handleAllRecommend() {
    dispatch({ type: "SET_LOADING", name: "isAllRecLoading", value: true });
    // 현재 추천 로딩 중인 필드 설정
    dispatch({ type: "SET_CURRENT_RECOMMEND_LOADING", field: "all" });

    mutateRecommend(
      { type: "all", metaData },
      {
        onSuccess: (result) => {
          dispatch({ type: "SET_REC_ALL_LIST", payload: result.data });
          toast.success("전체 추천이 완료되었습니다.");
          dispatch({
            type: "SET_LOADING",
            name: "isAllRecLoading",
            value: false,
          });
          // 로딩 상태 초기화
          dispatch({ type: "SET_CURRENT_RECOMMEND_LOADING", field: null });
        },
        onError: () => {
          // 오류 발생 시에도 로딩 상태 초기화
          dispatch({ type: "SET_CURRENT_RECOMMEND_LOADING", field: null });
          dispatch({
            type: "SET_LOADING",
            name: "isAllRecLoading",
            value: false,
          });
        },
      }
    );
  }

  // ! 개별 추천 (place / aiRole / userRole / goal 등)
  function handleSingleRecommend(type: TFormFieldName) {
    // 현재 추천 로딩 중인 필드 설정
    dispatch({ type: "SET_CURRENT_RECOMMEND_LOADING", field: type });

    return new Promise<void>((resolve, reject) => {
      mutateRecommend(
        {
          type,
          metaData,
          ...formState,
        },
        {
          onSuccess: (result) => {
            switch (type) {
              case "place":
                {
                  dispatch({
                    type: "SET_REC_PLACE_LIST",
                    payload: result.data,
                  });
                }
                break;
              case "aiRole":
                {
                  dispatch({
                    type: "SET_REC_AIROLE_LIST",
                    payload: result.data,
                  });
                }
                break;
              case "userRole":
                {
                  dispatch({
                    type: "SET_REC_USERROLE_LIST",
                    payload: result.data,
                  });
                }
                break;
              case "goal":
                {
                  dispatch({
                    type: "SET_REC_GOAL_LIST",
                    payload: result.data,
                  });
                }
                break;
              default:
                console.error("Unknown recommend type:", type);
            }

            // 로딩 상태 초기화
            dispatch({ type: "SET_CURRENT_RECOMMEND_LOADING", field: null });
            resolve();
          },
          onError: (err) => {
            // 오류 발생 시에도 로딩 상태 초기화
            dispatch({ type: "SET_CURRENT_RECOMMEND_LOADING", field: null });
            reject(err);
          },
        }
      );
    });
  }

  // ! Form submission
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { place, aiRole, goal, userRole } = formState;
    // 로딩 시작
    dispatch({ type: "SET_LOADING", name: "isSubmitting", value: true });

    mutateMake(
      { place, aiRole, goal, userRole },
      {
        onSuccess: (result) => {
          dispatch({
            type: "SET_LOADING",
            name: "isSubmitting",
            value: false,
          });
          queryClient.invalidateQueries({
            queryKey: ["getSituationsInfinite"],
          });
          toast.success("상황 생성 완료!!");
          onCompleteNavigate(); // 이동 혹은 다른 후속 작업
        },
        onError: (error) => {
          console.error("Failed to create situation:", error);
          dispatch({
            type: "SET_LOADING",
            name: "isSubmitting",
            value: false,
          });
          toast.error("상황 생성에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  }

  return {
    formState,
    recAiRoleList,
    recAllList,
    recGoalList,
    recPlaceList,
    recUserRoleList,
    isAllRecLoading,
    isInitialAllRec,
    isSubmitting,
    currentRecommendLoading, // 추가: 현재 추천 로딩 중인 필드 반환

    handleChange,
    handleRecommendationClick,
    handleAllRecommend,
    handleSingleRecommend,
    handleSubmit,
  };
}
