import { useState } from "react";
import { useRecommendSituations } from "../api/recommend-situations";
import SituationInputField from "./Situation-Input-Field";
import AllRecommendModal from "./AllRecommendModal";

type TPlaceList = {
  place: string;
};
type TAiRoleList = {
  aiRole: string;
};
type TUserRoleList = {
  userRole: string;
};
type TGoalList = {
  goal: string;
};

export const RecommandTag = ({
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

export const RecommendForm = ({ metaData }: { metaData?: string }) => {
  const { mutate } = useRecommendSituations();

  // !중앙 처리
  const [formState, setFormState] = useState({
    place: "",
    userRole: "",
    aiRole: "",
    goal: "",
  });
  // 각 추천 현황들 state
  const [recPlaceList, setRecPlaceList] = useState<TPlaceList[] | null>(null);
  const [recUserRoleList, setRecUserRoleList] = useState<
    TUserRoleList[] | null
  >(null);
  const [recAiRoleList, setRecAiRoleList] = useState<TAiRoleList[] | null>(
    null
  );
  const [recGoalList, setRecGoalList] = useState<TGoalList[] | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleRecommendationClick(
    name: keyof typeof formState,
    value: string
  ) {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <>
      <AllRecommendModal />
      {/* 장소 상황 */}
      <div className="flex flex-col items-center mt-6 w-full">
        {/* 추천 태그 */}
        <SituationInputField
          value={formState.place}
          onChange={(e) => handleChange(e)}
          placeholder={"장소를 입력해주세요"}
          title={"장소 (Place)"}
          name={"place"}
          aiRecommend={() =>
            mutate(
              { type: "place", metaData, ...formState },
              {
                onSuccess: (result) => {
                  console.log("✅ 추천 장소 업데이트:", result);
                  setRecPlaceList(result.data);
                },
              }
            )
          }
        >
          {recPlaceList &&
            recPlaceList.map((data, index) => (
              <RecommandTag
                key={index}
                onClick={() => handleRecommendationClick("place", data.place)}
                msg={data.place}
              />
            ))}
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
            mutate(
              { type: "aiRole", metaData, ...formState },
              {
                onSuccess: (result) => {
                  console.log("✅ ai 역할 업데이트:", result);
                  setRecAiRoleList(result.data);
                },
              }
            )
          }
        >
          {recAiRoleList &&
            recAiRoleList.map((data, index) => (
              <RecommandTag
                key={index}
                onClick={() => handleRecommendationClick("aiRole", data.aiRole)}
                msg={data.aiRole}
              />
            ))}
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
            mutate(
              { type: "userRole", metaData, ...formState },
              {
                onSuccess: (result) => {
                  console.log("✅ 사용자 역할 업데이트:", result);
                  setRecUserRoleList(result.data);
                },
              }
            )
          }
        >
          {recUserRoleList &&
            recUserRoleList.map((data, index) => (
              <RecommandTag
                key={index}
                onClick={() =>
                  handleRecommendationClick("userRole", data.userRole)
                }
                msg={data.userRole}
              />
            ))}
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
            mutate(
              { type: "goal", metaData, ...formState },
              {
                onSuccess: (result) => {
                  console.log("✅ 목표 업데이트:", result.data);
                  setRecGoalList(result.data);
                },
              }
            )
          }
        >
          {recGoalList &&
            recGoalList.map((data, index) => (
              <RecommandTag
                key={index}
                onClick={() => handleRecommendationClick("goal", data.goal)}
                msg={data.goal}
              />
            ))}
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
