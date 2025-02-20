import { Entity } from "@/types/api";

export type TConvMsg = Entity<{
  role: "AI" | "USER";
  msg: string;
}>;
