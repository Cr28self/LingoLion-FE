import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ConversationUIState = {
  isMenuOpen: boolean;
  isSettingDialogOpen: boolean;
  isFeedbackPanelOpen: boolean;
  isInfoPanelOpen: boolean;

  selectedFeedbackId: string | null;

  setIsMenuOpen: (isOpen: boolean) => void;
  setIsSettingDialogOpen: (isOpen: boolean) => void;
  setIsFeedbackPanelOpen: (isOpen: boolean) => void;
  setIsInfoPanelOpen: (isOpen: boolean) => void;
  setSelectedFeedbackId: (feedbackId: string | null) => void;

  toggleInfoPanel: () => void;
  toggleFeedbackPanel: () => void;
};

const initialState = {
  isMenuOpen: false,
  isSettingDialogOpen: false,
  isFeedbackPanelOpen: false,
  isInfoPanelOpen: false,
  selectedFeedbackId: null,
};

export const useConversationUIStore = create<ConversationUIState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setIsMenuOpen: (isOpen) => {
        set({
          isMenuOpen: isOpen,
        });
      },
      setIsSettingDialogOpen: (isOpen) => {
        set({
          isSettingDialogOpen: isOpen,
        });
      },
      setIsFeedbackPanelOpen: (isOpen) => {
        set({
          isFeedbackPanelOpen: isOpen,
        });
      },
      setIsInfoPanelOpen: (isOpen) => {
        set({
          isInfoPanelOpen: isOpen,
        });
      },
      setSelectedFeedbackId: (feedbackId) => {
        set({
          selectedFeedbackId: feedbackId,
        });
      },

      toggleInfoPanel: () => {
        // 지금 시점의 상태를 가져옴
        const { isInfoPanelOpen } = get();

        // 만약 지금 false라면 (열려 있지 않다면), 열면서 feedbackPanel 등 처리
        if (!isInfoPanelOpen) {
          set({
            isInfoPanelOpen: true,
            isFeedbackPanelOpen: false,
            selectedFeedbackId: null,
          });
        } else {
          // 열려있다면 닫기만
          set({
            isInfoPanelOpen: false,
          });
        }
      },

      toggleFeedbackPanel: () => {
        const { isFeedbackPanelOpen } = get();

        if (!isFeedbackPanelOpen) {
          set({
            isFeedbackPanelOpen: true,
            isInfoPanelOpen: false,
          });
        } else {
          // 닫을 때 선택된 feedbackId 초기화
          set({
            isFeedbackPanelOpen: false,
            selectedFeedbackId: null,
          });
        }
      },
    }),
    { name: 'Conversation-UI-State' }
  )
);
