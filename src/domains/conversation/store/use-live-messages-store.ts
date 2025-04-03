import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LiveMessage } from "../types/message";

type LiveMessagesState = {
  liveMessages: LiveMessage[];

  addUserLiveMessage: (message: string, order: number) => void;

  realtimeAddLiveMessage: (message: string, order: number) => void;

  resetLiveMessages: () => void;
};

export const useLiveMessagesStore = create<LiveMessagesState>()(
  devtools(
    (set) => ({
      liveMessages: [],

      addUserLiveMessage: (message, order) => {
        set((state) => ({
          liveMessages: [
            ...state.liveMessages,
            {
              role: "user",
              content: message,
              order,
            },
          ],
        }));
      },

      realtimeAddLiveMessage: (message, order) => {
        set((state) => {
          const lastMessage = state.liveMessages[state.liveMessages.length - 1];

          if (lastMessage?.role === "assistant") {
            const updateMessage = [...state.liveMessages];

            updateMessage[updateMessage.length - 1] = {
              ...lastMessage,
              content: lastMessage.content + message,
            };

            return {
              liveMessages: updateMessage,
            };
          }

          return {
            liveMessages: [
              ...state.liveMessages,
              {
                role: "assistant",
                content: message,
                order,
              },
            ],
          };
        });
      },

      resetLiveMessages: () => {
        set({ liveMessages: [] });
      },
    }),
    { name: "Conversation-Live-Messages" }
  )
);
