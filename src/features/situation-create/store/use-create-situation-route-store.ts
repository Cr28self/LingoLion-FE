import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type CreateSituationRouteState = {
  metaData: string | undefined;
  completeRedirectLink: string | null;
  isRedirectToCreateSituation: boolean;

  setCreateSituationRouteData: ({
    metaData,
    completeRedirectLink,
  }: {
    metaData: string | undefined;
    completeRedirectLink: string | null;
  }) => void;

  setIsRedirectToCreateSituation: (value: boolean) => void;
};

const initialState = {
  metaData: undefined,
  completeRedirectLink: null,
  isRedirectToCreateSituation: false,
};

const useCreateSituationRouteStore = create<CreateSituationRouteState>()(
  devtools(
    (set) => ({
      ...initialState,

      setCreateSituationRouteData: ({ metaData, completeRedirectLink }) => {
        set({ metaData, completeRedirectLink });
      },

      setIsRedirectToCreateSituation: (value) => {
        set({ isRedirectToCreateSituation: value });
      },
    }),
    { name: 'Create-Situation-Route' }
  )
);

export default useCreateSituationRouteStore;
