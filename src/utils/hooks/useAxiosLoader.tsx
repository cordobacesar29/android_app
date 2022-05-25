import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../httpConfig/authAxiosInstance";
import apiAxiosInstance from "../httpConfig/apiAxiosInstance";

const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);
  const interceptors = useMemo(() => {
    const inc = () => setCounter((counter: number) => counter + 1);
    const dec = () => setCounter((counter: number) => counter - 1);

    return {
      request: (config: any) => (inc(), config),
      response: (response: any) => (dec(), response),
      error: (error: any) => (dec(), Promise.reject(error)),
    };
  }, []);

  useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use(
      interceptors.request,
      interceptors.error
    );
    const resInterceptor = axiosInstance.interceptors.response.use(
      interceptors.response,
      interceptors.error
    );

    const reqInterceptorApi = apiAxiosInstance.interceptors.request.use(
      interceptors.request,
      interceptors.error
    );
    const resInterceptorApi = apiAxiosInstance.interceptors.response.use(
      interceptors.response,
      interceptors.error
    );
    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
      axiosInstance.interceptors.request.eject(reqInterceptorApi);
      axiosInstance.interceptors.response.eject(resInterceptorApi);
    };
  }, [interceptors]);

  return [false];
};

export default useAxiosLoader;
