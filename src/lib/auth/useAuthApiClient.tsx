import { useMemo } from "react";
import { useAuth } from "./authContext";
import axios, { AxiosError, AxiosInstance } from "axios";
import { apiClient } from "../api-client";
import { UnAuthorizedResponse } from "./types";
import { refreshTokenFn } from "./api";

// accessToken을 AuthContext에서 불러와, 요청 header에 담아주는 hook / 토큰이 만료될 경우, refreshToken을 호출하여 새롭게 갱신
export function useAuthApiClient(): AxiosInstance {
  const {
    getAccessToken,
    isAuthenticated,
    updateAccessToken,
    setIsAuthenticated,
  } = useAuth();

  const authApiClient = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: apiClient.defaults.baseURL,
      withCredentials: true,
    });

    // ✅ 요청 인터셉터: accessToken 자동 추가
    axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = getAccessToken();

        if (accessToken)
          config.headers["Authorization"] = `Bearer ${accessToken}`;

        return config; // 반드시 config를 반환해야 요청이 정상적으로 진행됨
      },
      (error) => {
        // try..catch 사용가능케
        return Promise.reject(error);
      }
    );

    // ✅ 응답 인터셉터: accessToken 만료 시 자동으로 refreshToken 사용
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError<UnAuthorizedResponse>) => {
        // ! 401 에러가 발생하고, 로그인 상태일 때만 refreshToken을 이용해 새로운 accessToken을 발급
        if (error.response?.status === 401 && isAuthenticated) {
          try {
            // 🔥 accessToken 만료 → refreshToken으로 갱신 시도
            const response = await refreshTokenFn();

            // 🔥 새로운 accessToken으로 교체
            const newAccessToken = response.accessToken;
            updateAccessToken(newAccessToken);

            // 🔥 이전 요청 재시도
            //  error.config에는 기존 요청의 메서드(GET, POST 등), URL, 헤더 등 모든 정보가 포함되어 있음.
            if (error.config) {
              error.config.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;

              // 이전과 동일한 요청을 보냄
              // axiosInstance(error.config)를 반환하면, 해당 요청이 다시 보내짐 ( axiosInstance.request.use 다시 실행됨 )
              // 	Axios는 모든 요청이 실행될 때 instance.request.use에서 설정된 인터셉터를 거친 후 요청을 보냄.
              return axiosInstance(error.config);
            }
          } catch (error) {
            // refreshToken 갱신 실패 → 로그아웃 처리
            setIsAuthenticated(false);

            return Promise.reject(error);
          }
        }
      }
    );

    return axiosInstance;
  }, [getAccessToken, isAuthenticated, updateAccessToken, setIsAuthenticated]);

  return authApiClient;
}
