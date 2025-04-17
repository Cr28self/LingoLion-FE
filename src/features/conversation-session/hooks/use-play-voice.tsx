import { useCallback } from 'react';
import { usePlayVoiceStore } from '@/features/conversation/store/use-play-voice-store.ts';

export default function usePlayVoice() {
  // 스토어에서 직접 triggerSpeak 함수를 가져옴
  const triggerSpeakFromStore = usePlayVoiceStore(
    (state) => state.triggerSpeak
  );
  // (선택적) 현재 활성 voice나 언어 정보가 필요하다면 여기서 가져올 수 있음
  // const activeVoice = useVoiceStore((state) => state.activeVoice);
  // const language = useConversationSettingStore((state) => state.language);

  // 스토어의 triggerSpeak 함수를 그대로 반환하거나, 필요시 useCallback으로 감쌀 수 있음
  // (스토어 액션은 보통 참조가 안정적이므로 useCallback이 필수는 아닐 수 있음)
  const triggerSpeak = useCallback(
    (text: string) => {
      triggerSpeakFromStore(text);
    },
    [triggerSpeakFromStore]
  );

  // 이제 이 훅은 상태나 복잡한 로직 없이 스토어의 기능을 연결해주는 역할만 함
  return { triggerSpeak };
}
