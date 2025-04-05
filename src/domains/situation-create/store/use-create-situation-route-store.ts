import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type CreateSituationRouteState = {
  metaData: string | undefined;
  completeRedirectLink: string | null;

  setCreateSituationRouteData: ({
    metaData,
    completeRedirectLink,
  }: {
    metaData: string | undefined;
    completeRedirectLink: string | null;
  }) => void;
};

const initialState = {
  metaData: undefined,
  completeRedirectLink: null,
};

const useCreateSituationRouteStore = create<CreateSituationRouteState>()(
  devtools(
    (set) => ({
      ...initialState,

      setCreateSituationRouteData: ({ metaData, completeRedirectLink }) => {
        set({ metaData, completeRedirectLink });
      },
    }),
    { name: 'Create-Situation-Route' }
  )
);

export default useCreateSituationRouteStore;
