import { Entity } from "@/types/api";

export type TChatMsg = Entity<{
  role: "AI" | "USER";
  msg: string;
}>;
