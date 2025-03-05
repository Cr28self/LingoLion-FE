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

export const RecommendForm = ({ metaData }: { metaData?: string }) => {
  const { mutate } = useRecommendSituations();

  const [
    {
      formState,
      recAiRoleList,
      recAllList,
      recGoalList,
      recPlaceList,
      recUserRoleList,
    },
    dispatch,
  ] = useReducer(recommendFormReducer, initialState);

  // 최초로 전체 추천 한번 했는지..
  const [isAllRec, setIsAllRec] = useState<boolean>(false);

  const [isAllRecLoading, setIsAllRecLoading] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    dispatch({ type: "SET_FORM_VALUE", name: name as TFormFieldName, value });
  }

  // 추천 태그 클릭 시 -> reducer 디스패치
  function handleRecommendationClick(name: TFormFieldName, value: string) {
    dispatch({ type: "SET_FORM_VALUE", name, value });
  }

  return (
    <>
      {/* 전체 추천 로직 : 추천 정보 입력 모달 클릭 -> 클릭하자마자 바로 추천됨 */}
      {isAllRec === false ? (
        <Button
          onClick={() => {
            setIsAllRecLoading(true);
            mutate(
              { type: "all", metaData },
              {
                onSuccess: (result) => {
                  setIsAllRec(true);
                  dispatch({ type: "SET_REC_ALL_LIST", payload: result.data });
                  toast.success("전체 추천이 완료되었습니다.");
                  setIsAllRecLoading(false);
                },
              }
            );
          }}
          disabled={isAllRecLoading}
        >
          {isAllRecLoading ? (
            // lucide-react spinner
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <WandSparkles className="h-12 w-12" />
          )}
        </Button>
      ) : (
        <AllRecommendDrawer
          initialData={recAllList}
          isLoading={isAllRecLoading}
          onRecommendAll={() => {
            setIsAllRecLoading(true);
            mutate(
              { type: "all", metaData },
              {
                onSuccess: (result) => {
                  dispatch({ type: "SET_REC_ALL_LIST", payload: result.data });
                  setIsAllRecLoading(false);
                },
              }
            );
          }}
          isAllRec={isAllRec}
        />
      )}

      {/* 장소 상황 */}
      <div className="flex flex-col items-center mt-6 w-full">
        {/* 추천 태그 */}
        <SituationInputField
          value={formState.place}
          onChange={(e) => handleChange(e)}
          placeholder={"장소를 입력해주세요"}
          title={"장소 (Place)"}
          name={"place"}
          aiRecommend={() => {
            return new Promise<void>((resolve, reject) => {
              mutate(
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
                  onClick={() => handleRecommendationClick("place", data.place)}
                  msg={data.place}
                />
              ))}
          </RecommendLayout>
        </SituationInputField>
      </div>

      {/* aiRole */}
      <div className="flex flex-col items-center mt-6 w-full">
        <SituationInputField
          value={formState.aiRole}
          onChange={(e) => handleChange(e)}
          placeholder={"AI 역할을 입력해주세요"}
          title={"AI 역할 (assistant)"}
          name={"aiRole"}
          aiRecommend={() =>
            new Promise<void>((resolve, reject) => {
              mutate(
                { type: "aiRole", metaData, ...formState },
                {
                  onSuccess: (result) => {
                    console.log("✅ ai 역할 업데이트:", result);
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
      <div className="flex flex-col items-center mt-6 w-full">
        <SituationInputField
          value={formState.userRole}
          onChange={(e) => handleChange(e)}
          placeholder={"사용자 역할을 입력해주세요"}
          title={"사용자 역할 (user)"}
          name={"userRole"}
          aiRecommend={() =>
            new Promise<void>((resolve, reject) => {
              mutate(
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
      <div className="flex flex-col items-center mt-6 w-full">
        <SituationInputField
          value={formState.goal}
          onChange={(e) => handleChange(e)}
          placeholder={"대화 목표를 입력해주세요"}
          title={"목표 (Goal)"}
          name={"goal"}
          aiRecommend={() =>
            new Promise((resolve, reject) => {
              mutate(
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

      {/* 전체 추천 / 다음 버튼 */}
      {/* <div className="flex justify-between mt-8">
        <Button
          className="
                bg-orange-200 hover:bg-orange-300 text-orange-900
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
        >
          전체 추천
        </Button>

        <Button
          className="
                bg-orange-500 hover:bg-orange-600 text-white 
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
        >
          완료
        </Button>
      </div> */}
    </>
  );
};
