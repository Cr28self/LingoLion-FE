import { useLiveMessagesStore } from "../\bstore/useLiveMessagesStore";
import useAutoscrollBottom from "../hooks/use-autoscroll-bottom";
import { ReceiveMsgBox, SendMsgBox } from "./MsgBox";
import { useGetAllInfiniteMessage } from "../api/get-all-message";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { useEffect, useRef } from "react";

function NoMessagePlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
      <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </div>
      <p className="font-medium">대화를 시작해보세요!</p>
      <p className="text-sm max-w-md">
        LingoLion과 영어로 대화하며 회화 실력을 향상시킬 수 있습니다.
      </p>
    </div>
  );
}

const ConvMessageList = ({ convId }: { convId: string }) => {
  const liveMessages = useLiveMessagesStore((state) => state.liveMessages);

  const lastMessageRef = useAutoscrollBottom(liveMessages);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetAllInfiniteMessage(convId);

  const flatMessages = data?.pages.flatMap((page) => page.data) || [];
  const reversedMessages = [...flatMessages].reverse();

  //   ! 처음에 채팅창 진입하면 scroll 맨 밑으로 가게 설정!!
  //   ! threshold 조정 ( 3~ 4번째 요소가 보이면.. )
  const { rootRef, targetRef } = useInfiniteScroll({
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // ! 최초 강제 밑으로 스크롤 되는 동작이 일어났는지 판단하는 flag
  const initialScrollPerformedRef = useRef(false);

  // ! 새로운 데이터가 오기 전에 이전 scrollHeight를 저장하는 변수
  const prevScrollHeight = useRef<number | null>(null);

  useEffect(() => {
    // ! 여기서 최초로 한번만 일어나게 하는 동작 구현 ( 다음 페이지 불러왔으면 더이상 불러지지 않게 맨 밑으로 강제로 스크롤)
  }, []);

  return (
    <div
      id="Msg Area"
      className="relative flex-1 overflow-y-auto space-y-6 p-6 bg-[url('/chat-bg-pattern.png')] bg-opacity-5"
      ref={rootRef}
    >
      <div className="space-y-6 inset-0">
        {/* ChatDATA */}
        {reversedMessages.length === 0 ? (
          <NoMessagePlaceholder />
        ) : (
          reversedMessages.map(({ sender, content, createdAt }, index) => {
            // Only the first element (oldest message) gets the target ref for infinite scroll
            const isSecondMessage = index === 1;
            const elemKey = `${createdAt}-${sender}`; // 고유한 키 생성
            if (sender === "assistant") {
              return (
                <ReceiveMsgBox
                  ref={isSecondMessage ? targetRef : null}
                  key={elemKey}
                  text={content}
                />
              );
            } else {
              return (
                <SendMsgBox
                  ref={isSecondMessage ? targetRef : null}
                  key={elemKey}
                  text={content}
                />
              );
            }
          })
        )}
        <button className="fixed top-0 right-0" onClick={() => fetchNextPage()}>
          {" "}
          fetchNextPAge!!
        </button>

        {/* ChatDATA */}
        {liveMessages.map(({ role, content, order }, index) => {
          const elemKey = `${order}-${role}`; // 고유한 키 생성

          const isLastMessage = index === liveMessages.length - 1;
          if (role === "assistant") {
            return (
              <ReceiveMsgBox
                ref={isLastMessage ? lastMessageRef : null}
                key={elemKey}
                text={content}
              />
            );
          } else {
            return (
              <SendMsgBox
                ref={isLastMessage ? lastMessageRef : null}
                key={elemKey}
                text={content}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ConvMessageList;
