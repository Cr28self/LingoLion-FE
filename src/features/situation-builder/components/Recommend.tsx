import { useReducer, useState } from "react";
import { useRecommendSituations } from "../api/recommend-situations";
import SituationInputField from "./Situation-Input-Field";
import {
  initialState,
  recommendFormReducer,
} from "../reducer/recommendFormReducer";
import { TAllList } from "../reducer/types";
import { Button } from "@/components/ui/button";
import AllRecommendDrawer from "./AllRecommendModal";
import { toast } from "sonner";
import { Loader2, WandSparkles } from "lucide-react";
import { useMakeSituation } from "../api/make-situation";

type TFormFieldName = keyof TAllList;

const RecommendTag = ({
  msg,
  onClick,
}: {
  msg: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className="
    bg-orange-50
    text-orange-700
    border border-orange-300
    px-3 py-1
    rounded-full
    transition-transform duration-200
    hover:bg-orange-100
    hover:scale-105
    shadow-sm
  "
      onClick={onClick}
      type="button"
    >
      {msg}
    </button>
  );
};
const RecommendLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-3 justify-start mt-3 h-[50px] overflow-x-auto overflow-hidden whitespace-nowrap  py-1 pl-3">
      {children}
    </div>
  );
};

export const RecommendForm = ({
  metaData,
  onCompleteNavigate,
}: {
  metaData?: string;
  onCompleteNavigate: () => void;
}) => {
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { place, aiRole, goal, userRole } = formState;

    // ! START
    dispatch({ type: "SET_LOADING", name: "isSubmitting", value: true });

    mutateMake(
      { place, aiRole, goal, userRole },
      {
        onSuccess: (result) => {
          // !END
          dispatch({ type: "SET_LOADING", name: "isSubmitting", value: false });

          toast.success("상황 생성 완료!!");

          // naviga
          onCompleteNavigate();
        },
      }
    );
  }
  return (
    <div className="relative">
      <form className="relative" onSubmit={handleSubmit}>
        {/* 전체 추천 버튼 - 문서 흐름을 차지하지 않도록 absolute 배치 */}
        {!isInitialAllRec && (
          <Button
            onClick={() => {
              dispatch({
                type: "SET_LOADING",
                name: "isAllRecLoading",
                value: true,
              });
              mutateRecommend(
                { type: "all", metaData },
                {
                  onSuccess: (result) => {
                    dispatch({
                      type: "SET_REC_ALL_LIST",
                      payload: result.data,
                    });
                    toast.success("전체 추천이 완료되었습니다.");
                    dispatch({
                      type: "SET_LOADING",
                      name: "isAllRecLoading",
                      value: false,
                    });
                  },
                }
              );
            }}
            disabled={isAllRecLoading}
            className="
          absolute bottom-4 left-4 
          md:w-12 md:h-12
          w-16 h-16 rounded-full 
          bg-orange-500 text-white shadow-lg
          flex items-center justify-center 
          transition-all hover:bg-orange-600 hover:scale-110 
          focus:outline-none focus:ring-4 focus:ring-orange-400 
          disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50
        "
          >
            {isAllRecLoading ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              <WandSparkles className="h-8 w-8" />
            )}
          </Button>
        )}

        {/* AllRecommendDrawer (전체 추천이 완료된 후 모달 버튼 표시) */}
        {isInitialAllRec && (
          <AllRecommendDrawer
            initialData={recAllList}
            isLoading={isAllRecLoading}
            onRecommendAll={() => {
              dispatch({
                type: "SET_LOADING",
                name: "isAllRecLoading",
                value: true,
              });
              mutateRecommend(
                { type: "all", metaData },
                {
                  onSuccess: (result) => {
                    dispatch({
                      type: "SET_REC_ALL_LIST",
                      payload: result.data,
                    });
                    dispatch({
                      type: "SET_LOADING",
                      name: "isAllRecLoading",
                      value: false,
                    });
                  },
                }
              );
            }}
            isAllRec={isInitialAllRec}
            onFormStateChange={handleRecommendationClick}
          />
        )}

        {/* 장소 상황 */}
        <div className="flex flex-col items-center mt-5 w-full">
          {/* 추천 태그 */}
          <SituationInputField
            value={formState.place}
            onChange={(e) => handleChange(e)}
            placeholder={"장소를 입력해주세요"}
            title={"장소 (Place)"}
            name={"place"}
            aiRecommend={() => {
              return new Promise<void>((resolve, reject) => {
                mutateRecommend(
                  { type: "place", metaData, ...formState },
                  {
                    onSuccess: (result) => {
                      console.log("✅ 추천 장소 업데이트:", result);

                      dispatch({
                        type: "SET_REC_PLACE_LIST",
                        payload: result.data,
                      });

                      resolve();
                    },
                    onError: (err) => {
                      reject(err);
                    },
                  }
                );
              });
            }}
          >
            <RecommendLayout>
              {recPlaceList &&
                recPlaceList.map((data, index) => (
                  <RecommendTag
                    key={index}
                    onClick={() =>
                      handleRecommendationClick("place", data.place)
                    }
                    msg={data.place}
                  />
                ))}
            </RecommendLayout>
          </SituationInputField>
        </div>

        {/* aiRole */}
        <div className="flex flex-col items-center mt-5 w-full">
          <SituationInputField
            value={formState.aiRole}
            onChange={(e) => handleChange(e)}
            placeholder={"AI 역할을 입력해주세요"}
            title={"AI 역할 (assistant)"}
            name={"aiRole"}
            aiRecommend={() =>
              new Promise<void>((resolve, reject) => {
                mutateRecommend(
                  { type: "aiRole", metaData, ...formState },
                  {
                    onSuccess: (result) => {
                      dispatch({
                        type: "SET_REC_AIROLE_LIST",
                        payload: result.data,
                      });

                      resolve();
                    },
                    onError: (err) => {
                      reject(err);
                    },
                  }
                );
              })
            }
          >
            <RecommendLayout>
              {recAiRoleList &&
                recAiRoleList.map((data, index) => (
                  <RecommendTag
                    key={index}
                    onClick={() =>
                      handleRecommendationClick("aiRole", data.aiRole)
                    }
                    msg={data.aiRole}
                  />
                ))}
            </RecommendLayout>
          </SituationInputField>
        </div>

        {/* userRole  */}
        <div className="flex flex-col items-center mt-5 w-full">
          <SituationInputField
            value={formState.userRole}
            onChange={(e) => handleChange(e)}
            placeholder={"사용자 역할을 입력해주세요"}
            title={"사용자 역할 (user)"}
            name={"userRole"}
            aiRecommend={() =>
              new Promise<void>((resolve, reject) => {
                mutateRecommend(
                  { type: "userRole", metaData, ...formState },
                  {
                    onSuccess: (result) => {
                      console.log("✅ 사용자 역할 업데이트:", result);
                      dispatch({
                        type: "SET_REC_USERROLE_LIST",
                        payload: result.data,
                      });

                      resolve();
                    },
                    onError: (err) => {
                      reject(err);
                    },
                  }
                );
              })
            }
          >
            <RecommendLayout>
              {recUserRoleList &&
                recUserRoleList.map((data, index) => (
                  <RecommendTag
                    key={index}
                    onClick={() =>
                      handleRecommendationClick("userRole", data.userRole)
                    }
                    msg={data.userRole}
                  />
                ))}
            </RecommendLayout>
          </SituationInputField>
        </div>

        {/* 목표 goal */}
        <div className="flex flex-col items-center mt-5 w-full">
          <SituationInputField
            value={formState.goal}
            onChange={(e) => handleChange(e)}
            placeholder={"대화 목표를 입력해주세요"}
            title={"목표 (Goal)"}
            name={"goal"}
            aiRecommend={() =>
              new Promise((resolve, reject) => {
                mutateRecommend(
                  { type: "goal", metaData, ...formState },
                  {
                    onSuccess: (result) => {
                      console.log("✅ 목표 업데이트:", result.data);
                      dispatch({
                        type: "SET_REC_GOAL_LIST",
                        payload: result.data,
                      });
                      resolve();
                    },
                    onError: (err) => {
                      reject(err);
                    },
                  }
                );
              })
            }
          >
            <RecommendLayout>
              {recGoalList &&
                recGoalList.map((data, index) => (
                  <RecommendTag
                    key={index}
                    onClick={() => handleRecommendationClick("goal", data.goal)}
                    msg={data.goal}
                  />
                ))}
            </RecommendLayout>
          </SituationInputField>
        </div>
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="
      w-2/3 h-12 px-6 text-xl font-semibold
      text-white bg-orange-500 rounded-xl 
      shadow-md transition-all 
      hover:bg-orange-600 hover:scale-105 
      focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 
      disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50
    "
            disabled={
              isSubmitting ||
              !formState.place ||
              !formState.aiRole ||
              !formState.userRole ||
              !formState.goal
            }
          >
            {isSubmitting ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              "상황 생성"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
