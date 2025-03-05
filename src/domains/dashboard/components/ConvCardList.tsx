import { useGetAllConversations } from "@/domains/conversation/api/get-all-conversations";
import React from "react";
import { useGetSituations } from "../api/get-situations";

const ConvCardList = () => {
  const { data, isLoading } = useGetSituations();
  console.log(data);
  return <div>ConvCardList!!!!!!!!!!!!!!!!</div>;
};

export default ConvCardList;
