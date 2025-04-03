// API client configuration for making HTTP requests
import { env } from "@/config/env";
import axios from "axios";

// 프로덕션 빌드 시에는 전체 도메인을 사용하고, 개발 시에는 상대 경로 사용
const baseURL = import.meta.env.PROD
  ? `${env.API_DOMAIN_URL}` // 예: backend_domain/~~~
  : env.API_URL; // 예: /api (개발 시 프록시 사용)

// Create an axios instance with default configuration
export const apiClient = axios.create({
  // Base URL for all requests, loaded from environment variables
  baseURL: baseURL,

  // Enable sending cookies with cross-origin requests
  withCredentials: true,
});
