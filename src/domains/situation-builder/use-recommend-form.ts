import { useReducer } from "react";
import { useMakeSituation } from "./api/make-situation";
import { useRecommendSituations } from "./api/recommend-situations";
import {
  initialState,
  recommendFormReducer,
} from "./reducer/recommendFormReducer";
import { TAllList } from "./reducer/types";
import { toast } from "sonner";

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
    },
    dispatch,
  ] = useReducer(recommendFormReducer, initialState);

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
        },
      }
    );
  }

  // ! 개별 추천 (place / aiRole / userRole / goal 등)

  function handleSingleRecommend(type: TFormFieldName) {
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

            resolve();
          },
          onError: (err) => {
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
        }
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

    handleChange,
    handleRecommendationClick,
    handleAllRecommend,
    handleSingleRecommend,
    handleSubmit,
  };
}
