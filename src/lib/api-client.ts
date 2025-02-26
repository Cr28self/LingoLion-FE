import { env } from "@/config/env";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});
