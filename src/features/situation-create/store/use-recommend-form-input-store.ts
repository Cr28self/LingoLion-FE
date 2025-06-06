import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TSituation } from '@/entities/situation/types.ts';

type RecommendFormInputState = {
  formInputState: {
    place: string;
    userRole: string;
    aiRole: string;
    goal: string;
  };

  setFormInputState: (name: keyof TSituation, value: string) => void;

  resetFormInputState: () => void;
};

const initialFormInputState = {
  aiRole: '',
  goal: '',
  place: '',
  userRole: '',
};

const useRecommendFormInputStore = create<RecommendFormInputState>()(
  devtools(
    (set) => ({
      formInputState: initialFormInputState,

      setFormInputState: (name, value) => {
        set((state) => ({
          formInputState: {
            ...state.formInputState,
            [name]: value,
          },
        }));
      },

      resetFormInputState: () => {
        set({ formInputState: initialFormInputState });
      },
    }),
    { name: 'Recommend-Form-Input' }
  )
);

export default useRecommendFormInputStore;
