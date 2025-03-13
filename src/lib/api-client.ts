// API client configuration for making HTTP requests
import { env } from "@/config/env";
import axios from "axios";

// 현재 환경이 "production"이면 배포 API URL, 아니면 개발 API URL 사용
const API_BASE_URL =
  import.meta.env.MODE === "production" ? env.API_DOMAIN_URL : env.API_URL;

// Create an axios instance with default configuration
export const apiClient = axios.create({
  // Base URL for all requests, loaded from environment variables
  baseURL: API_BASE_URL,

  // Enable sending cookies with cross-origin requests
  withCredentials: true,
});
