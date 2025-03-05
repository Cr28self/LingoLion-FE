import SituationInputField from "./Situation-Input-Field";
import AllRecommendDrawer from "./AllRecommendModal";
import RecommendTagList, { RecommendTagLayout } from "./RecommendTagList";
import { useRecommendForm } from "../use-recommend-form";
import { AllRecommendDrawerButton, SubmitButton } from "./CustomButton";

export const RecommendForm = ({
  metaData,
  onCompleteNavigate,
}: {
  metaData?: string;
  onCompleteNavigate: () => void;
}) => {
  const {
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
  } = useRecommendForm({
    metaData,
    onCompleteNavigate,
  });

  return (
    <div className="relative">
      <form className="relative" onSubmit={handleSubmit}>
        {/* 전체 추천 버튼 - 문서 흐름을 차지하지 않도록 absolute 배치 */}
        {!isInitialAllRec && (
          <AllRecommendDrawerButton
            onClick={handleAllRecommend}
            isLoading={isAllRecLoading}
            disabled={isAllRecLoading}
          />
        )}

        {/* AllRecommendDrawer (전체 추천이 완료된 후 모달 버튼 표시) */}
        {isInitialAllRec && (
          <AllRecommendDrawer
            initialData={recAllList}
            isLoading={isAllRecLoading}
            onRecommendAll={handleAllRecommend}
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
            aiRecommend={() => handleSingleRecommend("place")}
          >
            <RecommendTagLayout>
              {recPlaceList && (
                <RecommendTagList
                  tags={recPlaceList.map((item) => item.place)}
                  onTagClick={(value) =>
                    handleRecommendationClick("place", value)
                  }
                />
              )}
            </RecommendTagLayout>
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
            aiRecommend={() => handleSingleRecommend("aiRole")}
          >
            <RecommendTagLayout>
              {recAiRoleList && (
                <RecommendTagList
                  tags={recAiRoleList.map((item) => item.aiRole)}
                  onTagClick={(value) =>
                    handleRecommendationClick("aiRole", value)
                  }
                />
              )}
            </RecommendTagLayout>
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
            aiRecommend={() => handleSingleRecommend("userRole")}
          >
            <RecommendTagLayout>
              {recUserRoleList && (
                <RecommendTagList
                  tags={recUserRoleList.map((item) => item.userRole)}
                  onTagClick={(value) =>
                    handleRecommendationClick("userRole", value)
                  }
                />
              )}
            </RecommendTagLayout>
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
            aiRecommend={() => handleSingleRecommend("goal")}
          >
            <RecommendTagLayout>
              {recGoalList && (
                <RecommendTagList
                  tags={recGoalList.map((item) => item.goal)}
                  onTagClick={(value) =>
                    handleRecommendationClick("goal", value)
                  }
                />
              )}
            </RecommendTagLayout>
          </SituationInputField>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <SubmitButton
            type="submit"
            isLoading={isSubmitting}
            disabled={
              isSubmitting ||
              !formState.place ||
              !formState.aiRole ||
              !formState.userRole ||
              !formState.goal
            }
          >
            상황 생성
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};
