import { useRef, useState } from 'react';
import { useSendSSEMessage } from '../api/send-sse-message';
import { useConversationSettingStore } from '@/features/conversation/store/use-conversation-setting-store.ts';

export default function useRecordVoice(convId: string) {
  const { handleSend } = useSendSSEMessage(convId);
  const recognitionRef = useRef<SpeechRecognition | null>();
  const [text, setText] = useState('');

  const [isActive, setIsActive] = useState<boolean>(false);

  // 누적된 최종 텍스트를 저장할 Ref
  const transcriptRef = useRef<string>('');

  //   ! 처음부터 바로 말하지 말고, 녹음 버튼 누르고 delay로 한 1초 정도 있다가 말해야함 ( 그래야 제대로 알아들음 )
  const handleOnRecord = () => {
    if (isActive) {
      recognitionRef.current?.stop();
      setIsActive(false);

      return;
    }

    // triggerSpeak(" ");

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('Speech Recognition not supported.');
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
      return;
    }
    const { language } = useConversationSettingStore.getState();

    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.continuous = true; // 계속 인식하도록 설정

    recognitionRef.current.lang = language; // 한국어 설정 예시 (필요에 따라 변경)

    recognitionRef.current.onstart = function () {
      console.log('record 시작!');
      setIsActive(true);
    };

    // !onresult에서는 텍스트 누적만 처리 ( 말하면서 쉴때마다 이 이벤트 실행되서 말한 텍스트들을 누적시킴)
    recognitionRef.current.onresult = function (event) {
      let latestFinalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        // isFinal이 true인 경우 (해당 발화 단위의 최종 결과)
        if (event.results[i].isFinal) {
          latestFinalTranscript += event.results[i][0].transcript;
        }
      }

      if (latestFinalTranscript) {
        console.log('Final MSG', latestFinalTranscript);

        // 여러 번의 onresult에서 final transcript가 나올 수 있으므로 공백 추가
        transcriptRef.current += latestFinalTranscript + ' ';
      }
    };

    // !onend는  무조건 recognitionRef.current?.stop();을 호출한 이후에 실행됨 ( 녹음 완전히 끝나야 실행!! )
    recognitionRef.current.onend = function () {
      setIsActive(false);

      // --- 여기가 최종 결과를 처리하는 시점 ---
      const finalResult = transcriptRef.current.trim(); // 앞뒤 공백 제거

      if (finalResult) {
        handleSend(finalResult);

        // --- triggerSpeak 호출 전에 짧은 지연 추가 ---
      } else {
        console.log('No final transcript was accumulated.');
        // 아무 말도 인식되지 않았거나 결과가 없는 경우 처리
        setText(''); // 텍스트 초기화 등
      }

      // recognitionRef 정리 (선택적)

      transcriptRef.current = '';
      recognitionRef.current = null;
    };

    // !onerror는 음성 인식 시 에러 발생
    recognitionRef.current.onerror = function (event) {
      console.error('Speech Recognition Error:', event.error, event.message);
      setIsActive(false); // 오류 시 비활성화
      // 에러 처리 (예: 사용자에게 알림)
      alert(`음성 인식 오류: ${event.error} - ${event.message}`);
      // Ref 정리 (선택적)
      recognitionRef.current = null;
    };

    recognitionRef.current.start();
  };

  return { handleOnRecord, isActive, text };
}
