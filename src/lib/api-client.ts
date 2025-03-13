// API client configuration for making HTTP requests
import { env } from "@/config/env";
import axios from "axios";

// Create an axios instance with default configuration
export const apiClient = axios.create({
  // Base URL for all requests, loaded from environment variables
  baseURL: env.API_URL,

  // Enable sending cookies with cross-origin requests
  withCredentials: true,
});
