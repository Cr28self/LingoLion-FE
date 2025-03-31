import { create } from "zustand";
import { devtools } from "zustand/middleware";

type RecommendFormState = {
  isModalOpen: boolean;
  hasRequestedAllRecommendations: boolean;
  setIsModalOpen: (flag: boolean) => void;
};

const initialState = {
  isModalOpen: false,
  hasRequestedAllRecommendations: false,
};

const useRecommendFormStore = create<RecommendFormState>()(
  devtools(
    (set) => ({
      ...initialState,

      setIsModalOpen: (flag) => {
        set({
          isModalOpen: flag,
        });
      },
    }),
    { name: "Recommend-Form" }
  )
);

export default useRecommendFormStore;
