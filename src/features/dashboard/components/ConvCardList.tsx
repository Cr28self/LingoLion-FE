import { useGetAllConversations } from "@/features/conversation/api/get-all-conversations";
import React from "react";

const ConvCardList = () => {
  const { data, isLoading } = useGetAllConversations();
  console.log(data);
  return <div>ConvCardList!!!!!!!!!!!!!!!!</div>;
};

export default ConvCardList;
