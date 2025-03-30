import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ConvInputState {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  resetInputMessage: () => void;
  getInputMessage: () => string;
}

export const useConvInputStore = create<ConvInputState>()(
  devtools(
    (set, get) => ({
      inputMessage: "",
      setInputMessage: (message: string) => {
        set({ inputMessage: message });
      },
      resetInputMessage: () => {
        set({ inputMessage: "" });
      },
      getInputMessage: () => get().inputMessage,
    }),
    { name: "Conversation-Input" }
  )
);
