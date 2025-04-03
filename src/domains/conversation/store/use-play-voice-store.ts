import {create} from "zustand/index";
import {devtools} from "zustand/middleware";
import {useConversationSettingStore} from "@/domains/conversation/store/use-conversation-setting-store.ts";

type PlayVoiceState={
    allVoices:SpeechSynthesisVoice[];
    isInitialized:boolean;
    activeVoice: SpeechSynthesisVoice | null;
    initializeVoices: () => void;
    _updateActiveVoice: () => void; // 내부 업데이트 함수
    unsubscribeSettings: (() => void) | null; // 구독 해제 함수 저장 상태 추가
    triggerSpeak: (text: string) => void; // 스토어 액션으로 추가
    cleanup: () => void; // Cleanup 액션 추가

}


export const usePlayVoiceStore = create<PlayVoiceState>()(
    devtools(
        (set,get) => ({

            allVoices:[],
            isInitialized: false,
            activeVoice: null,
            unsubscribeSettings: null, // 초기 상태 설정


            // 1. 음성 초기화 함수 (앱 로드 시 한 번 실행)
            initializeVoices:()=>{
                if(get().isInitialized||typeof window==="undefined" || !window.speechSynthesis){
                    return; // 이미 초기화되었거나 서버 환경이거나 speechSynthesis 미지원
                }

                const updateVoices=()=>{
                    const fetchedVoices = window.speechSynthesis.getVoices();
                    if (Array.isArray(fetchedVoices)) {
                        console.log("All voices fetched:", fetchedVoices.length);
                        set({ allVoices: fetchedVoices });
                        get()._updateActiveVoice(); // 목소리 목록 업데이트 후 활성 목소리 재계산
                    }
                }

                // 초기 로드 시도
                updateVoices();

                // 변경 감지 리스너 설정
                if ("onvoiceschanged" in window.speechSynthesis) {
                    window.speechSynthesis.onvoiceschanged = updateVoices;
                }

                set({ isInitialized: true });

                // 언어 변경 감지 및 activeVoice 업데이트
                // useConversationSettingStore.subscribe(...) 사용


                // 언어 변경 감지 및 activeVoice 업데이트
                // useConversationSettingStore.subscribe(...) 사용
                const unsubscribe = useConversationSettingStore.subscribe(
                    (state, prevState) => {
                        if (state.language !== prevState.language) {
                            console.log("Language changed, updating active voice...");
                            get()._updateActiveVoice(); // 언어 변경 시 활성 목소리 재계산
                        }
                    }
                );

                // isInitialized와 unsubscribeSettings 상태를 함께 업데이트
                set({ isInitialized: true, unsubscribeSettings: unsubscribe });
            }


            ,
            // 2. 활성 음성 계산 및 업데이트 (내부용)
            _updateActiveVoice: () => {
                const { allVoices } = get();
                const language = useConversationSettingStore.getState().language; // 다른 스토어 상태 직접 접근

                const availableVoices = allVoices.filter(({ lang }) => lang === language);
                const newActiveVoice =
                    availableVoices.find(({ name }) => name.includes("Google")) ||
                    availableVoices.find(({ name }) => name.includes("Samantha")) ||
                    availableVoices[0] || // 첫 번째 사용 가능한 목소리
                    null; // 사용 가능한 목소리가 없으면 null

                console.log(`Active voice updated for language ${language}:`, newActiveVoice?.name || 'None');
                set({ activeVoice: newActiveVoice });
            },

            // 3. 음성 출력 트리거 함수
            triggerSpeak: (text: string) => {
                const { activeVoice } = get();
                console.log('Triggering speak with active voice:', activeVoice?.name);

                if (!activeVoice) {
                    const language = useConversationSettingStore.getState().language;
                    console.warn(`No active voice for language ${language}.`);
                    alert(`선택하신 언어(${language})에 사용 가능한 음성이 없거나 음성 출력을 지원하지 않습니다.`);
                    return;
                }
                if (!window.speechSynthesis) {
                    console.warn("SpeechSynthesis not supported.");
                    alert("현재 브라우저에서는 음성 출력을 지원하지 않습니다.");
                    return;
                }

                window.speechSynthesis.cancel();

                setTimeout(() => {
                    try {
                        const utterance = new SpeechSynthesisUtterance(text);
                        utterance.voice = activeVoice;
                        utterance.onerror = (event) => console.error("SpeechSynthesis Error:", event);
                        window.speechSynthesis.speak(utterance);
                    } catch (error) {
                        console.error("Error creating/speaking utterance:", error);
                        alert("음성 출력 중 오류가 발생했습니다.");
                    }
                }, 50);
            },

            // --- Cleanup 액션 정의 ---
            cleanup: () => {
                console.log("Running voice store cleanup...");
                const unsubscribe = get().unsubscribeSettings;
                if (unsubscribe) {
                    console.log("Unsubscribing from settings store.");
                    unsubscribe(); // 저장된 구독 해제 함수 호출
                }
                // onvoiceschanged 리스너도 여기서 제거하는 것이 안전함
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                    window.speechSynthesis.onvoiceschanged = null;
                    console.log("onvoiceschanged listener removed.");
                }
                // 상태 초기화 (선택 사항: 필요에 따라 isInitialized 등 다른 상태도 초기화 가능)
                set({ unsubscribeSettings: null, isInitialized: false, allVoices: [], activeVoice: null });
                console.log("Voice store state reset.");
            },

        }),
        { name: "voice-Setting" }
    )
);
