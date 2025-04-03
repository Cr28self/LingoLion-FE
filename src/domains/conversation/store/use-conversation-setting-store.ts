import {create} from "zustand/index";
import {devtools} from "zustand/middleware";


type ConversationSettingState = {
    language:string;
};

const initlaState={
    language:"en-US",
}

export const useConversationSettingStore = create<ConversationSettingState>()(
    devtools(
        () => ({
            ...initlaState
        }),
        { name: "Conversation-Setting" }
    )
);
